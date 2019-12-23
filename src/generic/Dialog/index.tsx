import {
  CircularProgress,
  Dialog as DialogBase,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@material-ui/core';
import { Cancel, CheckCircle, Done, Error, Warning } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { Button } from 'generic';
import React, { FC, memo } from 'react';
import styles from './styles';
import { IProps } from './types';

const useStyles = makeStyles(styles);

/**
 * Компонент окна статуса
 * @param open {Boolean} флаг на открытие/закрытие
 * @param status {'success'|'error'|'warning'|'loading'} отображаемый статус
 * @param message {String} отображаемое сообщение
 * @param onClose {Function} функция, закрывающая окно
 * @param warningAcceptCallback {Function} функция-колбэк для отработки действий в случае,
 * когда статус warning
 * @constructor
 */
const Dialog: FC<IProps> =
  ({ open, status, message, onClose, warningAcceptCallback }: IProps) => {
    const classes = useStyles();

    /**
     * Функция обработки нажатия на кнопку
     */
    const handleClick = () => {
      if (status === 'warning' && warningAcceptCallback) {
        warningAcceptCallback();
      }
      onClose();
    };

    return (
      <DialogBase open={open} scroll="paper" disableBackdropClick disableEscapeKeyDown>
        <DialogTitle>
          <Grid container alignItems="center">
            {status === 'success' &&
            <>
              <CheckCircle className={clsx(classes.statusIcon, classes.successIcon)}/>
              Успешно
            </>}
            {status === 'error' &&
            <>
              <Error className={clsx(classes.statusIcon, classes.errorIcon)}/>
              Ошибка
            </>}
            {status === 'warning' &&
            <>
              <Warning className={clsx(classes.statusIcon, classes.warningIcon)}/>
              Внимание
            </>}
            {status === 'loading' &&
            <>
              <CircularProgress className={classes.statusIcon}/>
              Пожалуйста, подождите...
            </>}
          </Grid>
        </DialogTitle>
        {status !== 'loading' &&
        <>
          <DialogContent>
            <Typography>
              {message}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClick}
              icon={Done}
            >
              OK
            </Button>
            {status === 'warning' &&
            <Button
              variant="contained"
              color="secondary"
              onClick={onClose}
              icon={Cancel}
            >
              Отмена
            </Button>}
          </DialogActions>
        </>}
      </DialogBase>
    );
  };

export default memo(Dialog);
