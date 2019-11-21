import { Collapse, FormControlLabel, Grid, Paper, Switch, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { AxiosError, AxiosResponse } from 'axios';
import { Context } from 'context';
import { IContext } from 'context/types';
import { withDialog } from 'decorators';
import { Loading } from 'generic';
import api from 'lib/api';
import { SERVER_NOT_AVAILABLE, SERVER_RESPONSES } from 'lib/constants';
import { TASKS_APP } from 'lib/session';
import React, { ChangeEvent, FC, memo, useContext, useEffect, useState } from 'react';
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
const TaskDetail: FC<IProps> = ({ match, openDialog }) => {
  const classes = useStyles();

  const { getters, setters } = useContext<IContext>(Context);

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
  });

  const [loaded, setLoaded] = useState<boolean>(false);

  /**
   * Функция загрузки задания с сервера
   */
  const loadTask = () => {
    const { id } = match.params;
    api.getContent<ITaskDetail>(`task-detail/${id}`)
      .then((response: AxiosResponse<ITaskDetail>) => (
        setTask((): ITaskDetail => response.data)
      ))
      .catch((error: AxiosError) => {
        let message: string = SERVER_NOT_AVAILABLE;
        if (error.response) {
          if (error.response.data.message) {
            message = error.response.data.message;
          } else {
            message = SERVER_RESPONSES[error.response.status];
          }
        }
        openDialog(message, 'error');
      })
      .finally(() => setLoaded((): boolean => true));
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
        `task/${id}`,
        sendData,
        TASKS_APP,
        'patch',
      );
      setTask((oldTask: ITaskDetail): ITaskDetail => ({
        ...oldTask,
        ...data,
        assigned_by: oldTask.assigned_by,
      }));
      openDialog(SERVER_RESPONSES[status], 'success');
    } catch (error) {
      let message: string = SERVER_NOT_AVAILABLE;
      if (error.response) {
        message = SERVER_RESPONSES[error.response.status];
      }
      openDialog(message, 'error');
    }
  };

  /**
   * Функция для установки заголовка панели
   */
  const setDashBoardTitle = () => setters.updateDashBoardTitle!('Посмотреть задание');

  useEffect(loadTask, []);

  useEffect(setDashBoardTitle, []);

  useEffect(
    () => {
      document.title = `${getters.documentTitle} | Задание №${match.params.id}`;
    },
    [getters.documentTitle, match.params.id],
  );

  return (
    <Collapse in={loaded} timeout={750}>
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
          <Grid item lg={9} xs={12} />
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
          <Grid item lg={9} xs={12} />
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
          <Grid item lg={10} xs={12} />
          <Grid item lg={2} xs={12}>
            <TextField
              value={new Date(task.date_of_issue!).toLocaleDateString('ru')}
              label="Дата назначения"
              fullWidth
              InputProps={{ readOnly: true }}
              variant="outlined"
            />
          </Grid>
          <Grid item lg={10} xs={12} />
          <Grid item lg={2} xs={12}>
            <TextField
              value={new Date(task.dead_line!).toLocaleDateString('ru')}
              label="Срок исполнения"
              fullWidth
              InputProps={{ readOnly: true }}
              variant="outlined"
            />
          </Grid>
          <Grid item lg={10} xs={12} />
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
          <Grid item lg={9} xs={12} />
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
        </Grid>
      </Paper>
      {!loaded && <Loading />}
    </Collapse>
  );
};

export default withDialog<IProps>(memo<IProps>(TaskDetail));
