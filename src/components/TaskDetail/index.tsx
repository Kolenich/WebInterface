import { FormControlLabel, Grid, Paper, Switch, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { AxiosError, AxiosResponse } from 'axios';
import { Context } from 'context';
import { IContext } from 'context/types';
import { withNotification } from 'decorators';
import { DateField, Loading } from 'generic';
import api from 'lib/api';
import { TASKS_APP } from 'lib/session';
import { SERVER_NOT_AVAILABLE, SERVER_RESPONSES } from 'lib/utils';
import React, { ChangeEvent, FC, useContext, useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styles from './styles';
import './styles.css';
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
const TaskDetail: FC<IProps> = ({ match, openDialog }): JSX.Element => {
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

  const { id } = match.params;

  const { updateDashBoardTitle } = context.setters;
  const { documentTitle } = context.getters;

  const { summary, description, comment, dead_line, date_of_issue, done, assigned_by } = task;

  const { first_name, last_name } = assigned_by;

  /**
   * Функция загрузки задания с сервера
   */
  const loadTask = (): void => {
    api.getContent<ITaskDetail>(`task-detail/${id}`)
      .then((response: AxiosResponse<ITaskDetail>): void => setTask(response.data))
      .catch((error: AxiosError): void => {
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
      .finally((): void => setLoaded(true));
  };

  /**
   * Функция выставления выполнености задания через сервер
   * @param {React.ChangeEvent<HTMLInputElement>} event событие изменения
   */
  const handleSwitchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    openDialog('', 'loading');
    const { name, checked } = event.target;
    const data = { [name]: checked } as ITaskDetail;
    const { id } = task;
    api.sendContent(`task/${id}`, data, TASKS_APP, 'patch')
      .then((response: AxiosResponse<ITaskDetail>): void => {
        setTask({ ...task, ...response.data, assigned_by });
        openDialog(SERVER_RESPONSES[response.status], 'success');
      })
      .catch((error: AxiosError): void => {
        let message: string = SERVER_NOT_AVAILABLE;
        if (error.response) {
          message = SERVER_RESPONSES[error.response.status];
        }
        openDialog(message, 'error');
      });
  };

  /**
   * Функция для установки заголовка панели
   */
  const setDashBoardTitle = (): void => updateDashBoardTitle!('Посмотреть задание');

  useEffect(loadTask, []);

  useEffect(setDashBoardTitle, []);

  useEffect(
    (): void => {
      document.title = `${documentTitle} | Задание №${id}`;
    },
    [documentTitle, id],
  );

  return (
    <>
      <TransitionGroup>
        {loaded &&
        <CSSTransition timeout={500} classNames="task-detail">
          <Paper className={classes.paper}>
            <Grid container spacing={2} className={classes.container}>
              <Grid item lg={3} xs={12}>
                <TextField
                  value={summary}
                  variant="outlined"
                  fullWidth
                  label="Краткое описание"
                  InputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item lg={9} xs={12} />
              <Grid item lg={3} xs={12}>
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
              <Grid item lg={9} xs={12} />
              <Grid item lg={2} xs={12}>
                <TextField
                  value={
                    task.id
                      ? `${last_name} ${first_name}`
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
                <DateField
                  value={date_of_issue}
                  withTime
                  readOnly
                  label="Дата назначения"
                  onChange={(): void => undefined}
                />
              </Grid>
              <Grid item lg={10} xs={12} />
              <Grid item lg={2} xs={12}>
                <DateField
                  value={dead_line}
                  withTime
                  readOnly
                  label="Срок исполнения"
                  onChange={(): void => undefined}
                />
              </Grid>
              <Grid item lg={10} xs={12} />
              <Grid item lg={3} xs={12}>
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
              <Grid item lg={9} xs={12} />
              <Grid item lg={2} xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={done}
                      onChange={handleSwitchChange}
                      name="done"
                      color="primary"
                      disabled={done || !task.id}
                    />
                  }
                  label="Выполнено"
                />
              </Grid>
            </Grid>
          </Paper>
        </CSSTransition>}
      </TransitionGroup>
      {!loaded && <Loading />}
    </>
  );
};

export default withNotification<IProps>({ withDialog: true })(TaskDetail);
