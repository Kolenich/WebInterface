import { FormControlLabel, Grid, Paper, Switch, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { AxiosError, AxiosResponse } from 'axios';
import { AttachmentPreview, Loading } from 'components';
import { Context } from 'components/GlobalContext';
import { IGlobalState } from 'components/GlobalContext/types';
import api from 'lib/api';
import React, { ChangeEvent, FC, useContext, useEffect, useState } from 'react';
import { useDialog } from '../../components/DialogProvider';
import { getErrorMessage } from '../../lib/utils';
import styles from './styles';
import { IProps, ITaskDetail } from './types';

const useStyles = makeStyles(styles);

/**
 * Компонент формы для отображения деталей задания
 * @param {match<IDetailParams>} match передаваемые параметры в адресную строку
 * @returns {JSX.Element}
 * @constructor
 */
const TaskDetail: FC<IProps> = ({ match }) => {
  const classes = useStyles();

  const {
    getters: { documentTitle }, setters: { updateDashBoardTitle },
  } = useContext<IGlobalState>(Context);
  const { openDialog } = useDialog();

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
   * Функция выставления выполнености задания через сервер
   * @param {React.ChangeEvent<HTMLInputElement>} event событие изменения
   */
  const handleSwitchChange = async (event: ChangeEvent<HTMLInputElement>) => {
    openDialog('', 'loading');
    const { name, checked } = event.target;
    try {
      await api.sendContent(`tasks/${task.id}/`, { [name]: checked }, 'patch');
      setTask((oldTask) => ({ ...oldTask, [name]: checked }));
      openDialog('Задание обновлено!', 'success');
    } catch (error) {
      openDialog(getErrorMessage(error), 'error');
    }
  };

  useEffect(
    () => {
      api.getContent<ITaskDetail>(`tasks/${match.params.id}/`)
        .then((response: AxiosResponse<ITaskDetail>) => setTask(response.data))
        .catch((error: AxiosError) => openDialog(getErrorMessage(error), 'error'))
        .finally(() => setLoaded(true));
      updateDashBoardTitle('Посмотреть задание');
      document.title = `${documentTitle} | Задание №${match.params.id}`;
    },
    [match.params, documentTitle, openDialog, updateDashBoardTitle],
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

export default TaskDetail;
