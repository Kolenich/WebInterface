import React, { PureComponent, ReactNode } from 'react';
import { Props, State } from './types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  withStyles,
  CircularProgress,
} from '@material-ui/core';
import { CheckCircle, Done, Error, Warning } from '@material-ui/icons';
import classNames from 'classnames';
import { styles } from './styles';
import { CustomButtonProps } from '../../lib/types';

class StatusWindow extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  PrimaryButton = ({ text, icon, ...props }: CustomButtonProps): JSX.Element => {
    const { classes } = this.props;
    return (
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        {...props}
      >
        {text}
        {icon === 'confirm' &&
        <Done className={classes.rightIcon}/>}
      </Button>
    );
  }

  public render(): ReactNode {
    const { open, status, message, classes, onClose } = this.props;
    return (
      <Dialog open={open} scroll="paper" disableBackdropClick disableEscapeKeyDown>
        <DialogTitle disableTypography>
          {status === 'success' &&
          <Typography variant="h5" className={classes.message}>
            <CheckCircle className={classNames(classes.statusIcon, classes.successIcon)}/>
            Успешно
          </Typography>}
          {status === 'error' &&
          <Typography variant="h5" className={classes.message}>
            <Error className={classNames(classes.statusIcon, classes.errorIcon)}/>
            Ошибка
          </Typography>}
          {status === 'warning' &&
          <Typography variant="h5" className={classes.message}>
            <Warning className={classNames(classes.statusIcon, classes.warningIcon)}/>
            Внимание
          </Typography>}
          {status === 'loading' &&
          <Typography variant="h5" className={classes.message}>
            <CircularProgress className={classes.statusIcon}/>
            Пожалуйста, подождите...
          </Typography>}
        </DialogTitle>
        {status !== 'loading' &&
        <>
          <DialogContent>
            {message}
          </DialogContent>
          <DialogActions>
            <this.PrimaryButton
              text="Ок"
              onClick={onClose}
              icon="confirm"
            />
          </DialogActions>
        </>}
      </Dialog>);
  }
}

export default withStyles(styles)(StatusWindow);
