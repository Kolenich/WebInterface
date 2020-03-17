import { Button, Grid, Paper, TextField } from '@material-ui/core';
import {
  Add,
  CalendarToday as DateIcon,
  Edit as DescriptionIcon,
  InsertCommentRounded as CommentIcon,
  Person as AssignToIcon,
} from '@material-ui/icons';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { makeStyles } from '@material-ui/styles';
import { AxiosResponse } from 'axios';
import { AutoComplete, DateField, FileUploader, withDialog } from 'components';
import { IFile, IUploaderImperativeProps } from 'components/FileUploader/types';
import { Context } from 'components/GlobalContext';
import { IContext } from 'components/GlobalContext/types';
import { ISelectItem } from 'components/Select/types';
import api from 'lib/api';
import { SERVER_RESPONSES } from 'lib/constants';
import { TASKS_APP, USERS_APP } from 'lib/session';
import { useMountEffect } from 'lib/utils';
import React, { ChangeEvent, FC, useCallback, useContext, useRef, useState } from 'react';
import styles from './styles';
import { IProps, ITask } from './types';

const useStyles = makeStyles(styles);

/**
 * Компонент формы для назначения задания
 * @param {(message: string, status: IDialogStatus, warningAcceptCallback?: () => void) => void}
 * openDialog функция вызова диалогового окна
 * @returns {JSX.Element}
 * @constructor
 */
const TaskAssignment: FC<IProps> = ({ openDialog, showError }: IProps) => {
  const classes = useStyles();

  const {
    getters: { documentTitle }, setters: { updateDashBoardTitle },
  } = useContext<IContext>(Context);

  const uploader = useRef<IUploaderImperativeProps>(null);

  // Набор переменных состояния для объекта назначаемой задачи
  const [task, setTask] = useState<ITask>({
    summary: '',
    description: '',
    comment: '',
    dead_line: null,
    assigned_to: null,
    attachment: null,
  });

  // Список доступных к назначению пользователей
  const [users, setUsers] = useState<ISelectItem[]>([]);

  /**
   * Функция выгрузки всех юзеров, которым можно назначить задание
   */
  const loadUsers = () => {
    api.getContent<ISelectItem[]>('profile/assigner', {}, USERS_APP)
      .then((response: AxiosResponse<ISelectItem[]>) => (
        setUsers(response.data)
      ));
  };

  /**
   * Функция обработки изменени в селекте
   * @param {ChangeEvent<{}>} event объект события изменения
   * @param {ValueType<ISelectItem>} option выбранная опция
   */
  const handleSelectChange = (event: ChangeEvent<{}>, option: ISelectItem | null) => (
    setTask((oldTask: ITask) => ({ ...oldTask, assigned_to: option ? option.value : null }))
  );

  /**
   * Функция обработки изменений в текстовых полях
   * @param {React.ChangeEvent<HTMLInputElement>} event событие изменения
   */
  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTask((oldTask: ITask) => ({ ...oldTask, [name]: value }));
  };

  /**
   * Функция для обработки изменений в поле даты (Срок исполнения)
   * @param {keyof ITask} name  поле даты
   */
  const handleDateChange = (name: keyof ITask) => (date: MaterialUiPickersDate) => (
    setTask((oldTask: ITask) => ({ ...oldTask, [name]: date }))
  );

  /**
   * Функция отправка задачи на сервер
   */
  const submitTask = async () => {
    openDialog('', 'loading');
    try {
      // Копируем объект задания
      const { attachment } = task;
      const copiedTask: ITask = JSON.parse(JSON.stringify(task));
      delete copiedTask.attachment;
      // Создаем задание без вложения
      const { data, status }: AxiosResponse<ITask> =
        await api.sendContent('task/assign', copiedTask);

      // После создания задания если было приложено вложение, прикрепляем вложение
      if (attachment) {
        const formData = new FormData();
        for (const key of Object.keys(attachment)) {
          if (key === 'file') {
            formData.append(key, attachment[key] as Blob, attachment.file_name);
          } else {
            formData.append(key, attachment[key] as string);
          }
        }
        await api.sendContent(
          `task/${data.id!}/attach-file`,
          formData,
          TASKS_APP,
          'post',
          { 'Content-Type': 'multipart/form-data' },
        );
      }

      openDialog(SERVER_RESPONSES[status], 'success');
      setTask((): ITask => ({
        summary: '',
        description: '',
        comment: '',
        dead_line: null,
        assigned_to: '',
        attachment: null,
      }));
      // Очищаем область загрузчика
      if (uploader.current) {
        uploader.current.removeFiles();
      }
    } catch (error) {
      showError(error, 'dialog');
    }
  };

  /**
   * Функция-колбэк для получения файлов от загрузчика
   * @param {IFile[]} files
   * @param {boolean} base64 флаг перекодировки в base64
   */
  const setAttachment = useCallback(
    (files: IFile[]) => {
      if (files.length) {
        const file: IFile = files[0];
        setTask((oldTask: ITask) => ({ ...oldTask, attachment: { ...file } }));
      } else {
        setTask((oldTask: ITask) => ({ ...oldTask, attachment: null }));
      }
    },
    [],
  );

  /**
   * Функция для установки заголовка панели
   */
  const setDashBoardTitle = () => updateDashBoardTitle('Назначить задание');

  useMountEffect(
    () => {
      document.title = `${documentTitle} | Назначить задание`;
    },
  );

  useMountEffect(loadUsers);

  useMountEffect(setDashBoardTitle);

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={2} alignItems="center" className={classes.container}>
        <Grid item xs={12} lg={2}>
          <TextField
            value={task.summary}
            name="summary"
            onChange={handleTextChange}
            label="Краткое описание"
            fullWidth
            variant="outlined"
            InputProps={{
              endAdornment: <DescriptionIcon/>,
            }}
          />
        </Grid>
        <Grid item xs={12} lg={9}/>
        <Grid item xs={12} lg={4}>
          <TextField
            value={task.description}
            name="description"
            onChange={handleTextChange}
            label="Полное описание"
            fullWidth
            variant="outlined"
            InputProps={{
              endAdornment: <DescriptionIcon/>,
            }}
          />
        </Grid>
        <Grid item xs={12} lg={8}/>
        <Grid item xs={12} lg={2}>
          <DateField
            value={task.dead_line}
            name="dead_line"
            disablePast
            onChange={handleDateChange('dead_line')}
            label="Срок исполнения"
            withTime
            InputProps={{
              endAdornment: <DateIcon/>,
            }}
          />
        </Grid>
        <Grid item xs={12} lg={10}/>
        <Grid item xs={12} lg={4}>
          <TextField
            value={task.comment}
            name="comment"
            onChange={handleTextChange}
            label="Комментарий"
            fullWidth
            variant="outlined"
            InputProps={{
              endAdornment: <CommentIcon/>,
            }}
          />
        </Grid>
        <Grid item xs={12} lg={8}/>
        <Grid item xs={12} lg={3}>
          <AssignToIcon/>
          <AutoComplete
            value={task.assigned_to}
            label="Кому назначить"
            options={users}
            onChange={handleSelectChange}
          />
        </Grid>
        <Grid item xs={12} lg={9}/>
        <Grid item xs={12} lg={3}>
          <FileUploader
            ref={uploader}
            uploaderText="Прикрепите вложение"
            onFilesUpdate={setAttachment}
          />
        </Grid>
        <Grid item xs={12} lg={9}>
        </Grid>
        <Grid item xs="auto">
          <Button
            variant="contained"
            endIcon={<Add/>}
            color="primary"
            onClick={submitTask}
          >
            Назначить
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default withDialog(TaskAssignment);
