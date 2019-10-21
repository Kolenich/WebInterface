import { Collapse, Grid, Paper, TextField } from '@material-ui/core';
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
import { withNotification } from 'decorators';
import { Button, DateField, SelectWithSearch } from 'generic';
import { ISelectItem } from 'generic/Select/types';
import api from 'lib/api';
import { USERS_APP } from 'lib/session';
import { IApiResponse } from 'lib/types';
import { SERVER_RESPONSES } from 'lib/utils';
import React, { ChangeEvent, FC, useContext, useEffect, useState } from 'react';
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
const TaskAssignment: FC<IProps> = ({ openDialog }): JSX.Element => {
  const classes = useStyles();

  const context = useContext<IContext>(Context);

  const { updateDashBoardTitle } = context.setters;
  const { documentTitle } = context.getters;

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

  const { summary, description, comment, dead_line, assigned_to } = task;

  /**
   * Функция выгрузки всех юзеров, которым можно назначить задание
   */
  const loadUsers = (): void => {
    api.getContent<IApiResponse<ISelectItem>>('user-assigner', {}, USERS_APP)
      .then((response: AxiosResponse<IApiResponse<ISelectItem>>): void => {
        setUsers(response.data.results);
        setLoaded(true);
      })
      .catch();
  };

  /**
   * Функция обработки изменени в селекте
   * @param {ValueType<ISelectItem>} option выбранная опция
   */
  const handleSelectChange = (option: ValueType<ISelectItem>): void => {
    const { value } = option as ISelectItem;
    setTask({ ...task, assigned_to: value });
  };

  /**
   * Функция обработки изменений в текстовых полях
   * @param {React.ChangeEvent<HTMLInputElement>} event событие изменения
   */
  const handleTextChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };

  /**
   * Функция для обработки изменений в поле даты (Срок исполнения)
   * @param {MaterialUiPickersDate} date новая дата
   */
  const handleDeadLineChange = (date: MaterialUiPickersDate): void => (
    setTask({ ...task, dead_line: date })
  );

  /**
   * Функция отправка задачи на сервер
   */
  const submitTask = (): void => {
    openDialog('', 'loading');
    api.sendContent('assign-task', task)
      .then((response: AxiosResponse): void => {
        openDialog(SERVER_RESPONSES[response.status], 'success');
        setTask({
          summary: '',
          description: '',
          comment: '',
          dead_line: null,
          assigned_to: '',
        });
      })
      .catch((error: AxiosError): void => {
        let message: string = 'Сервер недоступен, попробуйте позже';
        if (error.response) {
          message = SERVER_RESPONSES[error.response.status];
        }
        openDialog(message, 'error');
      });
  };

  /**
   * Функция для установки заголовка панели
   */
  const setDashBoardTitle = (): void => updateDashBoardTitle!('Назначить задание');

  useEffect(
    (): void => {
      document.title = `${documentTitle} | Назначить задание`;
    },
    [documentTitle],
  );

  useEffect(loadUsers, []);

  useEffect(setDashBoardTitle, []);

  return (
    <Collapse in={loaded} timeout={750}>
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
                endAdornment: <DescriptionIcon />,
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
                endAdornment: <CommentIcon />,
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
              variant="contained"
              icon="add"
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

export default withNotification<IProps>({ withDialog: true })(TaskAssignment);
