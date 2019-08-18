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
import classNames from 'classnames';
import React, { FunctionComponent } from 'react';
import Button from '../Button';
import { styles } from './styles';
import { IProps } from './types';

const useStyles = makeStyles(styles);

/**
 * Компонент окна статуса
 */
const Dialog: FunctionComponent<IProps> =
  ({ open, status, message, onClose, closeCallback }: IProps): JSX.Element => {
    const classes = useStyles();
    const handleClick = () => {
      if (status === 'warning' && closeCallback) {
        closeCallback();
      }
      onClose();
    };
    return (
      <DialogBase open={open} scroll="paper" disableBackdropClick disableEscapeKeyDown>
        <DialogTitle disableTypography>
          {status === 'success' &&
          <Typography variant="h5" className={classes.message}>
            <CheckCircle className={classNames(classes.statusIcon, classes.successIcon)} />
            Успешно
          </Typography>}
          {status === 'error' &&
          <Typography variant="h5" className={classes.message}>
            <Error className={classNames(classes.statusIcon, classes.errorIcon)} />
            Ошибка
          </Typography>}
          {status === 'warning' &&
          <Typography variant="h5" className={classes.message}>
            <Warning className={classNames(classes.statusIcon, classes.warningIcon)} />
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
            {message}
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
      </DialogBase>);
  };

export default Dialog;
