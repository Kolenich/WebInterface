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
} from '@material-ui/core';
import { Add, CheckCircle, Done, Error, Save, Update } from '@material-ui/icons';
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
        {buttonProps.icon === 'save' &&
				<Save className={classes.rightIcon}/>}
        {buttonProps.icon === 'add' &&
				<Add className={classes.rightIcon}/>}
        {buttonProps.icon === 'confirm' &&
				<Done className={classes.rightIcon}/>}
        {buttonProps.icon === 'update' &&
				<Update className={classes.rightIcon}/>}
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
      <Dialog open={open} scroll="paper">
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
        </DialogTitle>
        <DialogContent>
          {message}
        </DialogContent>
        <DialogActions>
          <this.PrimaryButton
            text="Ок"
            onClick={this.closeWindow}
            icon="confirm"
          />
        </DialogActions>
      </Dialog>);
  }
}

export default withStyles(styles)(StatusWindow);
