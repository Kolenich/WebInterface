import { Collapse, Grid, Paper, TextField } from '@material-ui/core';
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
import { Context } from 'context';
import { IContext } from 'context/types';
import { withDialog } from 'decorators';
import { Button, DateField, FileUploader, SelectWithSearch } from 'generic';
import { IFile, IUploaderImperativeProps } from 'generic/FileUploader/types';
import { ISelectItem } from 'generic/Select/types';
import api from 'lib/api';
import { SERVER_RESPONSES } from 'lib/constants';
import { USERS_APP } from 'lib/session';
import { IApiResponse } from 'lib/types';
import { useMountEffect } from 'lib/utils';
import React, { ChangeEvent, FC, memo, useCallback, useContext, useRef, useState } from 'react';
import { ValueType } from 'react-select/src/types';
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

  const uploader = useRef<IUploaderImperativeProps>()

  // Набор переменных состояния для объекта назначаемой задачи
  const [task, setTask] = useState<ITask>({
    summary: '',
    description: '',
    comment: '',
    dead_line: null,
    assigned_to: '',
    attachment: null,
  });

  // Список доступных к назначению пользователей
  const [users, setUsers] = useState<ISelectItem[]>([]);

  // Флаги загрузки данных
  const [mounted, setMounted] = useState<boolean>(false);

  /**
   * Функция выгрузки всех юзеров, которым можно назначить задание
   */
  const loadUsers = () => {
    api.getContent<IApiResponse<ISelectItem>>('user-assigner', {}, USERS_APP)
      .then((response: AxiosResponse<IApiResponse<ISelectItem>>) => {
        setUsers((): ISelectItem[] => response.data.results);
        setMounted((): boolean => true);
      });
  };

  /**
   * Функция обработки изменени в селекте
   * @param {ValueType<ISelectItem>} option выбранная опция
   */
  const handleSelectChange = (option: ValueType<ISelectItem>) => {
    const { value } = option as ISelectItem;
    setTask((oldTask: ITask): ITask => ({ ...oldTask, assigned_to: value }));
  };

  /**
   * Функция обработки изменений в текстовых полях
   * @param {React.ChangeEvent<HTMLInputElement>} event событие изменения
   */
  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTask((oldTask: ITask): ITask => ({ ...oldTask, [name]: value }));
  };

  /**
   * Функция для обработки изменений в поле даты (Срок исполнения)
   * @param {MaterialUiPickersDate} date новая дата
   */
  const handleDeadLineChange = (date: MaterialUiPickersDate) => (
    setTask((oldTask: ITask): ITask => ({ ...oldTask, dead_line: date }))
  );

  /**
   * Функция отправка задачи на сервер
   */
  const submitTask = async () => {
    openDialog('', 'loading');
    try {
      const response: AxiosResponse = await api.sendContent('assign-task', task);
      openDialog(SERVER_RESPONSES[response.status], 'success');
      setTask((): ITask => ({
        summary: '',
        description: '',
        comment: '',
        dead_line: null,
        assigned_to: '',
        attachment: null,
      }));
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
    <Collapse in={mounted} timeout={750}>
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
                endAdornment: <DescriptionIcon />,
              }}
            />
          </Grid>
          <Grid item xs={12} lg={9} />
          <Grid item xs={12} lg={4}>
            <TextField
              value={task.description}
              name="description"
              onChange={handleTextChange}
              label="Полное описание"
              fullWidth
              variant="outlined"
              InputProps={{
                endAdornment: <DescriptionIcon />,
              }}
            />
          </Grid>
          <Grid item xs={12} lg={8} />
          <Grid item xs={12} lg={2}>
            <DateField
              value={task.dead_line}
              name="dead_line"
              disablePast
              onChange={handleDeadLineChange}
              label="Срок исполнения"
              withTime
              InputProps={{
                endAdornment: <DateIcon />,
              }}
            />
          </Grid>
          <Grid item xs={12} lg={10} />
          <Grid item xs={12} lg={4}>
            <TextField
              value={task.comment}
              name="comment"
              onChange={handleTextChange}
              label="Комментарий"
              fullWidth
              variant="outlined"
              InputProps={{
                endAdornment: <CommentIcon />,
              }}
            />
          </Grid>
          <Grid item xs={12} lg={8} />
          <Grid item xs={12} lg={3}>
            <AssignToIcon />
            <SelectWithSearch
              value={task.assigned_to}
              label="Кому назначить"
              options={users}
              onChange={handleSelectChange}
            />
          </Grid>
          <Grid item xs={12} lg={9} />
          <Grid item xs={12} lg={3}>
            <FileUploader
              ref={uploader}
              uploaderText="Прикрепите вложение"
              onFilesUpdate={setAttachment}
              base64
            />
          </Grid>
          <Grid item xs={12} lg={9} />
          <Grid item xs="auto">
            <Button
              variant="contained"
              icon={Add}
              color="primary"
              onClick={submitTask}
            >
              Назначить
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Collapse>
  );
};

export default memo(withDialog(TaskAssignment));
