import React, { ComponentState, PureComponent, ReactElement, ReactNode } from 'react';
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

  PrimaryButton = (buttonProps: CustomButtonProps): ReactElement<ReactNode> => {
    const { classes } = this.props;
    return (
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        {...buttonProps}
      >
        {buttonProps.text}
        {buttonProps.icon === 'confirm' &&
				<Done className={classes.rightIcon}/>}
      </Button>
    );
  }

  private closeWindow = (): ComponentState => {
    const { onCLose, closeCallback } = this.props;
    onCLose();
    if (closeCallback) closeCallback();
  }

  public render(): ReactNode {
    const { open, status, message, classes } = this.props;
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
		    <DialogContent>
          {message}
		    </DialogContent>}
        {status !== 'loading' &&
		    <DialogActions>
			    <this.PrimaryButton
				    text="Ок"
				    onClick={this.closeWindow}
				    icon="confirm"
			    />
		    </DialogActions>}
      </Dialog>);
  }
}

export default withStyles(styles)(StatusWindow);
