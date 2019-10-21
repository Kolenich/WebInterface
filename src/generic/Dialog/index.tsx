import {
  CircularProgress,
  Dialog as DialogBase,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import { CheckCircle, Error, Warning } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { Button } from 'generic';
import React, { FC } from 'react';
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
  ({ open, status, message, onClose, warningAcceptCallback }: IProps): JSX.Element => {
    const classes = useStyles();
    const handleClick = (): void => {
      if (status === 'warning' && warningAcceptCallback) {
        warningAcceptCallback();
      }
      onClose();
    };
    return (
      <DialogBase open={open} scroll="paper" disableBackdropClick disableEscapeKeyDown>
        <DialogTitle disableTypography>
          {status === 'success' &&
          <Typography variant="h5" className={classes.message}>
            <CheckCircle className={clsx(classes.statusIcon, classes.successIcon)} />
            Успешно
          </Typography>}
          {status === 'error' &&
          <Typography variant="h5" className={classes.message}>
            <Error className={clsx(classes.statusIcon, classes.errorIcon)} />
            Ошибка
          </Typography>}
          {status === 'warning' &&
          <Typography variant="h5" className={classes.message}>
            <Warning className={clsx(classes.statusIcon, classes.warningIcon)} />
            Внимание
          </Typography>}
          {status === 'loading' &&
          <Typography variant="h5" className={classes.message}>
            <CircularProgress className={classes.statusIcon} />
            Пожалуйста, подождите...
          </Typography>}
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
              icon="confirm"
            >
              OK
            </Button>
            {status === 'warning' &&
            <Button
              variant="contained"
              color="secondary"
              icon="cancel"
              onClick={onClose}
            >
              Отмена
            </Button>}
          </DialogActions>
        </>}
      </DialogBase>
    );
  };

export default Dialog;
