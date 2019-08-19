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
import React, { FunctionComponent } from 'react';
import Button from '../Button';
import { styles } from './styles';
import { IProps } from './types';

const useStyles = makeStyles(styles);

/**
 * Компонент окна статуса
 * @param open флаг на открытие/закрытие
 * @param status отображаемый статус
 * @param message отображаемое сообщение
 * @param onClose функция, закрывающая окно
 * @param warningAcceptCallback функция-колбэк для отработки действий в случае, когда статус warning
 * @constructor
 */
const Dialog: FunctionComponent<IProps> =
  ({ open, status, message, onClose, warningAcceptCallback }: IProps): JSX.Element => {
    const classes = useStyles();
    const handleClick = () => {
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
              color="primary"
              text="Ок"
              onClick={handleClick}
              icon="confirm"
            />
            {status === 'warning' &&
            <Button text="Отмена" color="secondary" icon="cancel" onClick={onClose} />}
          </DialogActions>
        </>}
      </DialogBase>
    );
  };

export default Dialog;
