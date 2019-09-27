import { Grid, Paper, TextField } from '@material-ui/core';
import {
  CalendarToday as DateIcon,
  Edit as DescriptionIcon,
  InsertCommentRounded as CommentIcon,
  Person as AssignToIcon,
} from '@material-ui/icons';
import { MaterialUiPickersDate } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/styles';
import { AxiosError, AxiosResponse } from 'axios';
import { Context } from 'context';
import { IContext } from 'context/types';
import api from 'lib/api';
import Button from 'lib/generic/Button';
import DateField from 'lib/generic/DateField';
import Dialog from 'lib/generic/Dialog';
import { ISelectItem } from 'lib/generic/Select/types';
import SelectWithSearch from 'lib/generic/SelectWithSearch';
import { USERS_APP } from 'lib/session';
import { IApiResponse, IDialogProps } from 'lib/types';
import { SERVER_RESPONSES } from 'lib/utils';
import React, { ChangeEvent, FunctionComponent, useContext, useEffect, useState } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { ValueType } from 'react-select/src/types';
import { styles } from './styles';
import './styles.css';
import { IProps, ITask } from './types';

const useStyles = makeStyles(styles);

/**
 * Компонент формы для назначения задания
 * @constructor
 */
const TaskAssignment: FunctionComponent<IProps> = (): JSX.Element => {
  const classes = useStyles();

  const context = useContext<IContext>(Context);

  const { updateDashBoardTitle } = context;

  // Набор переменных состояния для объекта назначаемой задачи
  const [task, setTask] = useState<ITask>({
    summary: '',
    description: '',
    comment: '',
    dead_line: null,
    assigned_to: '',
  });

  // Список доступных к назначению пользователей
  const [users, setUsers] = useState<ISelectItem[]>([]);

  // Флаги загрузки данных
  const [loaded, setLoaded] = useState<boolean>(false);

  // Набор переменных состояния для диалога
  const [dialog, setDialog] = useState<IDialogProps>({
    open: false,
    message: '',
    status: 'loading',
  });

  const { documentTitle } = context;

  const { summary, description, comment, dead_line, assigned_to } = task;

  /**
   * Функция, закрывающая снэкбар
   */
  const closeDialog = (): void => setDialog({ ...dialog, open: false });

  /**
   * Функция выгрузки всех юзеров, которым можно назначить задание
   */
  const loadUsers = (): void => {
    api.getContent<IApiResponse<ISelectItem>>('user-assigner', {}, USERS_APP)
      .then((response: AxiosResponse<IApiResponse<ISelectItem>>) => {
        setUsers(response.data.results);
        setLoaded(true);
      })
      .catch();
  };

  /**
   * Функция обработки изменени  в селекте
   * @param option
   */
  const handleSelectChange = (option: ValueType<ISelectItem>): void => {
    const { value } = option as ISelectItem;
    setTask({ ...task, assigned_to: value });
  };

  /**
   * Функция обработки изменений в текстовых полях
   * @param event событие изменения
   */
  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };

  /**
   * Функция для обработки изменений в поле даты (Срок исполнения)
   * @param date
   */
  const handleDeadLineChange = (date: MaterialUiPickersDate) => (
    setTask({ ...task, dead_line: date })
  );

  /**
   * Функция отправка задачи на сервер
   */
  const submitTask = (): void => {
    setDialog({ ...dialog, open: true, status: 'loading' });
    api.sendContent('assign-task', task)
      .then((response: AxiosResponse) => {
        setDialog({
          ...dialog,
          open: true,
          status: 'success',
          message: SERVER_RESPONSES[response.status],
        });
        setTask({
          summary: '',
          description: '',
          comment: '',
          dead_line: null,
          assigned_to: '',
        });
      })
      .catch((error: AxiosError) => {
        let message: string = 'Сервер недоступен, попробуйте позже';
        if (error.response) {
          message = SERVER_RESPONSES[error.response.status];
        }
        setDialog({ ...dialog, message, open: true, status: 'error' });
      });
  };

  /**
   * Функция для установки заголовка панели
   */
  const setDashBoardTitle = (): void => updateDashBoardTitle!('Назначить задание');

  useEffect(
    () => {
      document.title = `${documentTitle} | Назначить задание`;
    },
    [documentTitle],
  );

  useEffect(loadUsers, []);

  useEffect(setDashBoardTitle, []);

  return (
    <>
      <Dialog {...dialog} onClose={closeDialog} />
      <ReactCSSTransitionGroup
        transitionName="task-assignment"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        {loaded &&
        <Paper className={classes.paper}>
          <Grid container spacing={2} alignItems="center" className={classes.container}>
            <Grid item xs={12} lg={2}>
              <TextField
                value={summary}
                name="summary"
                onChange={handleTextChange}
                label="Краткое описание"
                fullWidth
                variant="outlined"
                InputProps={{
                  endAdornment: <CommentIcon />,
                }}
              />
            </Grid>
            <Grid item xs={12} lg={9} />
            <Grid item xs={12} lg={4}>

              <TextField
                value={description}
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
                value={dead_line}
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
                value={comment}
                name="comment"
                onChange={handleTextChange}
                label="Комментарий"
                fullWidth
                variant="outlined"
                InputProps={{
                  endAdornment: <DescriptionIcon />,
                }}
              />
            </Grid>
            <Grid item xs={12} lg={8} />
            <Grid item xs={12} lg={3}>
              <AssignToIcon />
              <SelectWithSearch
                value={assigned_to}
                label="Кому назначить"
                options={users}
                onChange={handleSelectChange}
              />
            </Grid>
            <Grid item xs={12} lg={9} />
            <Grid item xs="auto">
              <Button
                text="Назначить"
                icon="add"
                color="primary"
                onClick={submitTask}
                disabled={dialog.open}
              />
            </Grid>
          </Grid>
        </Paper>}
      </ReactCSSTransitionGroup>
    </>
  );
};

export default TaskAssignment;
