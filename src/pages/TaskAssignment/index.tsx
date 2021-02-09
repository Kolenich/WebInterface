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
import { AutoComplete, DateTimeField, FileUploader } from 'components';
import { useDialog } from 'components/DialogProvider';
import { IFile, IUploaderImperativeProps } from 'components/FileUploader/types';
import { Context } from 'components/GlobalContext';
import { IGlobalState } from 'components/GlobalContext/types';
import { ISelectItem } from 'components/Select/types';
import api from 'lib/api';
import { IErrors } from 'lib/types';
import { getErrorMessage } from 'lib/utils';
import React, {
  ChangeEvent,
  FC,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from './styles';
import { IProps, ITask, IUserAssigner } from './types';

const useStyles = makeStyles(styles);

/**
 * Компонент формы для назначения задания
 * @returns {JSX.Element}
 * @constructor
 */
const TaskAssignment: FC<IProps> = () => {
  const classes = useStyles();

  const {
    getters: { documentTitle }, setters: { updateDashBoardTitle },
  } = useContext<IGlobalState>(Context);
  const { openDialog } = useDialog();

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

  const [errors, setErrors] = useState<IErrors>({});

  // Список доступных к назначению пользователей
  const [users, setUsers] = useState<ISelectItem[]>([]);

  /**
   * Функция обработки изменений в текстовых полях
   * @param {React.ChangeEvent<HTMLInputElement>} event событие изменения
   */
  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (Object.keys(errors).length) {
      setErrors({});
    }
    setTask((oldTask) => ({ ...oldTask, [name]: value }));
  };

  /**
   * Функция отправка задачи на сервер
   */
  const submitTask = async () => {
    openDialog('', 'loading');
    try {
      // Копируем объект задания
      const { attachment, ...copiedTask } = task;
      // Создаем задание без вложения
      const { data } = await api.sendContent('tasks/', copiedTask);

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
          `tasks/${data.id}/attach-file/`,
          formData,
          'post',
          { 'Content-Type': 'multipart/form-data' },
        );
      }

      openDialog('Задание успешно создано!', 'success');
      setTask({
        summary: '',
        description: '',
        comment: '',
        dead_line: null,
        assigned_to: '',
        attachment: null,
      });
      // Очищаем область загрузчика
      if (uploader.current) {
        uploader.current.removeFiles();
      }
    } catch (error) {
      setErrors(error.response.data);
      openDialog(getErrorMessage(error), 'error');
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

  useEffect(
    () => {
      api.getContent<IUserAssigner[]>('users/assigner/', {})
        .then((response: AxiosResponse<IUserAssigner[]>) => setUsers(response.data.map((user) => ({
          key: user.pk,
          value: user.pk,
          label: `${user.last_name} ${user.first_name}`,
        }))));
      document.title = `${documentTitle} | Назначить задание`;
      updateDashBoardTitle('Назначить задание');
    },
    [documentTitle, updateDashBoardTitle],
  );

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={2} alignItems="center" className={classes.container}>
        <Grid item xs={12} lg={2}>
          <TextField
            value={task.summary}
            error={!!errors.summary}
            helperText={errors.summary}
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
            error={!!errors.description}
            helperText={errors.description}
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
          <DateTimeField
            value={task.dead_line}
            error={!!errors.dead_line}
            helperText={errors.dead_line}
            name="dead_line"
            disablePast
            onChange={(date: MaterialUiPickersDate) => (
              setTask((oldTask) => ({ ...oldTask, dead_line: date }))
            )}
            label="Срок исполнения"
            InputProps={{
              endAdornment: <DateIcon/>,
            }}
          />
        </Grid>
        <Grid item xs={12} lg={10}/>
        <Grid item xs={12} lg={4}>
          <TextField
            value={task.comment}
            error={!!errors.comment}
            helperText={errors.comment}
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
            textFieldProps={{
              error: !!errors.assigned_to,
              helperText: errors.assigned_to,
            }}
            label="Кому назначить"
            options={users}
            onChange={(event: ChangeEvent<{}>, option: ISelectItem | null) => (
              setTask((oldTask) => ({ ...oldTask, assigned_to: option ? option.value : null }))
            )}
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

export default TaskAssignment;
