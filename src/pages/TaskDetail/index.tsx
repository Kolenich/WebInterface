import { FormControlLabel, Grid, Paper, Switch, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { AxiosError, AxiosResponse } from 'axios';
import { AttachmentPreview, Loading, withDialog } from 'components';
import { Context } from 'components/GlobalContext';
import { IGlobalState } from 'components/GlobalContext/types';
import api from 'lib/api';
import { SERVER_RESPONSES } from 'lib/constants';
import { TASKS_APP } from 'lib/session';
import { useMountEffect } from 'lib/utils';
import React, { ChangeEvent, FC, useContext, useState } from 'react';
import styles from './styles';
import { IProps, ITaskDetail } from './types';

const useStyles = makeStyles(styles);

/**
 * Компонент формы для отображения деталей задания
 * @param {match<IDetailParams>} match передаваемые параметры в адресную строку
 * @param {(message: string, status: IDialogStatus, warningAcceptCallback?: () => void) => void}
 * openDialog Функция вызова диалогового окна
 * @returns {JSX.Element}
 * @constructor
 */
const TaskDetail: FC<IProps> = ({ match, openDialog, showError }) => {
  const classes = useStyles();

  const {
    getters: { documentTitle }, setters: { updateDashBoardTitle },
  } = useContext<IGlobalState>(Context);

  // Переменные состояния для задания
  const [task, setTask] = useState<ITaskDetail>({
    summary: '',
    description: '',
    comment: '',
    date_of_issue: null,
    dead_line: null,
    done: false,
    assigned_by: {
      first_name: '',
      last_name: '',
    },
    attachment: null,
  });

  const [loaded, setLoaded] = useState<boolean>(false);

  /**
   * Функция загрузки задания с сервера
   */
  const loadTask = () => {
    const { id } = match.params;
    api.getContent<ITaskDetail>(`tasks/${id}/detail`)
      .then((response: AxiosResponse<ITaskDetail>) => setTask(response.data))
      .catch((error: AxiosError) => showError(error, 'dialog'))
      .finally(() => setLoaded(true));
  };

  /**
   * Функция выставления выполнености задания через сервер
   * @param {React.ChangeEvent<HTMLInputElement>} event событие изменения
   */
  const handleSwitchChange = async (event: ChangeEvent<HTMLInputElement>) => {
    openDialog('', 'loading');
    const { name, checked } = event.target;
    const sendData = { [name]: checked } as ITaskDetail;
    const { id } = task;
    try {
      const { data, status }: AxiosResponse<ITaskDetail> = await api.sendContent(
        `tasks/${id}`,
        sendData,
        TASKS_APP,
        'patch',
      );
      setTask((oldTask) => ({
        ...oldTask,
        ...data,
        assigned_by: oldTask.assigned_by,
      }));
      openDialog(SERVER_RESPONSES[status], 'success');
    } catch (error) {
      showError(error, 'dialog');
    }
  };

  /**
   * Функция для установки заголовка панели
   */
  const setDashBoardTitle = () => updateDashBoardTitle('Посмотреть задание');

  useMountEffect(loadTask);

  useMountEffect(setDashBoardTitle);

  useMountEffect(
    () => {
      document.title = `${documentTitle} | Задание №${match.params.id}`;
    },
  );

  return (
    <>
      <Paper className={classes.paper}>
        <Grid container spacing={2} className={classes.container}>
          <Grid item lg={3} xs={12}>
            <TextField
              value={task.summary}
              variant="outlined"
              fullWidth
              label="Краткое описание"
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item lg={9} xs={12}/>
          <Grid item lg={3} xs={12}>
            <TextField
              value={task.description}
              variant="outlined"
              fullWidth
              label="Полное описание"
              InputProps={{ readOnly: true }}
              multiline
              rows={2}
            />
          </Grid>
          <Grid item lg={9} xs={12}/>
          <Grid item lg={2} xs={12}>
            <TextField
              value={
                task.id
                  ? `${task.assigned_by.last_name} ${task.assigned_by.first_name}`
                  : ''
              }
              variant="outlined"
              fullWidth
              label="Назначил"
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item lg={10} xs={12}/>
          <Grid item lg={2} xs={12}>
            <TextField
              value={new Date(task.date_of_issue!).toLocaleDateString('ru')}
              label="Дата назначения"
              fullWidth
              InputProps={{ readOnly: true }}
              variant="outlined"
            />
          </Grid>
          <Grid item lg={10} xs={12}/>
          <Grid item lg={2} xs={12}>
            <TextField
              value={new Date(task.dead_line!).toLocaleDateString('ru')}
              label="Срок исполнения"
              fullWidth
              InputProps={{ readOnly: true }}
              variant="outlined"
            />
          </Grid>
          <Grid item lg={10} xs={12}/>
          <Grid item lg={3} xs={12}>
            <TextField
              value={task.comment}
              variant="outlined"
              fullWidth
              label="Комментарий"
              InputProps={{ readOnly: true }}
              multiline
              rows={3}
            />
          </Grid>
          <Grid item lg={9} xs={12}/>
          <Grid item lg={2} xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={task.done}
                  onChange={handleSwitchChange}
                  name="done"
                  color="primary"
                  disabled={task.done || !task.id}
                />
              }
              label="Выполнено"
            />
          </Grid>
          <Grid item lg={10} xs={12}/>
          {task.attachment &&
          <Grid item lg={2} xs={12}>
            <AttachmentPreview attachment={task.attachment}/>
          </Grid>}
        </Grid>
      </Paper>
      {!loaded && <Loading/>}
    </>
  );
};

export default withDialog(TaskDetail);
