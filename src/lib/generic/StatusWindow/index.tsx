import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  withStyles,
} from '@material-ui/core';
import { CheckCircle, Error, Warning } from '@material-ui/icons';
import classNames from 'classnames';
import React, { FunctionComponent } from 'react';
import Button from '../Button';
import { styles } from './styles';
import { IProps } from './types';

/**
 * Компонент окна статуса
 */
const StatusWindow: FunctionComponent<IProps> = (props: IProps): JSX.Element => {
  const { open, status, message, classes, onClose } = props;
  return (
    <Dialog open={open} scroll="paper" disableBackdropClick disableEscapeKeyDown>
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
            onClick={onClose}
            icon="confirm"
          />
        </DialogActions>
      </>}
    </Dialog>);
};

export default withStyles(styles)(StatusWindow);
