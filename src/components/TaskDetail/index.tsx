import { FormControlLabel, Grid, Paper, Switch, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { AxiosError, AxiosResponse } from 'axios';
import { Context } from 'context';
import { IContext } from 'context/types';
import api from 'lib/api';
import DateField from 'lib/generic/DateField';
import Snackbar from 'lib/generic/Snackbar';
import { TASKS_APP } from 'lib/session';
import { ISnackbarProps } from 'lib/types';
import { SERVER_NOT_AVAILABLE, SERVER_RESPONSES } from 'lib/utils';
import React, { ChangeEvent, FunctionComponent, useContext, useEffect, useState } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { styles } from './styles';
import './styles.css';
import { IProps, ITaskDetail } from './types';

const useStyles = makeStyles(styles);

/**
 * Компонент формы для отображения деталей задания
 * @param match передаваемые параметры в адресную строку
 * @constructor
 */
const TaskDetail: FunctionComponent<IProps> = ({ match }): JSX.Element => {
  const classes = useStyles();

  const context = useContext<IContext>(Context);

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

  // Переменные состояния диалогового окна
  const [snackbar, setSnackbar] = useState<ISnackbarProps>({
    open: false,
    variant: 'info',
    message: '',
  });

  const { id } = match.params;

  /**
   * Функция загрузки задания с сервера
   */
  const loadTask = (): void => {
    api.getContent<ITaskDetail>(`task-detail/${id}`)
      .then((response: AxiosResponse<ITaskDetail>) => {
        setTask(response.data);
        setLoaded(true);
      })
      .catch((error: AxiosError) => {
        let message: string = SERVER_NOT_AVAILABLE;
        if (error.response) {
          message = SERVER_RESPONSES[error.response.status];
        }
        setSnackbar({ ...snackbar, message, open: true, variant: 'error' });
      });
  };

  /**
   * Функция, закрывающая снэкбар
   */
  const closeSnackbar = (): void => setSnackbar({ ...snackbar, open: false });

  /**
   * Функция выставления выполнености задания через сервер
   * @param event
   */
  const handleSwitchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, checked } = event.target;
    const data = { [name]: checked } as ITaskDetail;
    const { id } = task;
    api.sendContent(`task/${id}`, data, TASKS_APP, 'patch')
      .then((response: AxiosResponse<ITaskDetail>) => {
        setTask({ ...task, ...response.data, assigned_by });
        setSnackbar({
          ...snackbar,
          message: SERVER_RESPONSES[response.status],
          open: true,
          variant: 'success',
        });
      })
      .catch((error: AxiosError) => {
        let message: string = SERVER_NOT_AVAILABLE;
        if (error.response) {
          message = SERVER_RESPONSES[error.response.status];
        }
        setSnackbar({ ...snackbar, message, open: true, variant: 'error' });
      });
  };

  const { summary, description, comment, dead_line, date_of_issue, done, assigned_by } = task;

  const { first_name, last_name } = assigned_by;

  const { documentTitle, updateDashBoardTitle } = context;

  /**
   * Функция для установки заголовка панели
   */
  const setDashBoardTitle = (): void => updateDashBoardTitle!('Посмотреть задание');

  useEffect(loadTask, []);

  useEffect(setDashBoardTitle, []);

  useEffect(
    () => {
      document.title = `${documentTitle} | Задание №${id}`;
    },
    [documentTitle, id],
  );

  return (
    <>
      <Snackbar {...snackbar} onClose={closeSnackbar} />
      <ReactCSSTransitionGroup
        transitionName="task-detail"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        {loaded &&
        <Paper className={classes.paper}>
          <Grid container alignItems="center">
            <Grid item lg={3} xs={12} className={classes.item}>
              <TextField
                value={summary}
                variant="outlined"
                fullWidth
                label="Краткое описание"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item lg={9} xs={12} className={classes.item} />
            <Grid item lg={3} xs={12} className={classes.item}>
              <TextField
                value={description}
                variant="outlined"
                fullWidth
                label="Полное описание"
                InputProps={{ readOnly: true }}
                multiline
                rows={2}
              />
            </Grid>
            <Grid item lg={9} xs={12} className={classes.item} />
            <Grid item lg={2} xs={12} className={classes.item}>
              <TextField
                value={`${last_name} ${first_name}`}
                variant="outlined"
                fullWidth
                label="Назначил"
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item lg={10} xs={12} className={classes.item} />
            <Grid item lg={2} xs={12} className={classes.item}>
              <DateField
                value={date_of_issue}
                readOnly
                label="Дата назначения"
                onChange={() => undefined}
              />
            </Grid>
            <Grid item lg={10} xs={12} className={classes.item} />
            <Grid item lg={2} xs={12} className={classes.item}>
              <DateField
                value={dead_line}
                readOnly
                label="Срок исполнения"
                onChange={() => undefined}
              />
            </Grid>
            <Grid item lg={10} xs={12} className={classes.item} />
            <Grid item lg={3} xs={12} className={classes.item}>
              <TextField
                value={comment}
                variant="outlined"
                fullWidth
                label="Комментарий"
                InputProps={{ readOnly: true }}
                multiline
                rows={3}
              />
            </Grid>
            <Grid item lg={9} xs={12} className={classes.item} />
            <Grid item lg={2} xs={12} className={classes.item}>
              <FormControlLabel
                control={
                  <Switch
                    checked={done}
                    onChange={handleSwitchChange}
                    name="done"
                    color="primary"
                    disabled={done}
                  />
                }
                label="Выполнено"
              />
            </Grid>
          </Grid>
        </Paper>}
      </ReactCSSTransitionGroup>
    </>
  );
};

export default TaskDetail;
