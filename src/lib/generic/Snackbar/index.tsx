import { Grow, Snackbar as SnackbarBase, SnackbarContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { TransitionProps } from '@material-ui/core/transitions';
import { CheckCircle, Error, Info, Warning } from '@material-ui/icons';
import clsx from 'clsx';
import React, { ComponentType, FunctionComponent } from 'react';
import { styles } from './styles';
import { IProps, IVariantIcons, IWrapperProps } from './types';

const useStyles = makeStyles(styles);

export const variantIcon: IVariantIcons = {
  success: CheckCircle,
  warning: Warning,
  error: Error,
  info: Info,
};

const TransitionComponent = (props: TransitionProps): JSX.Element => (
  <Grow {...props} />
);

const SnackbarContentWrapper: FunctionComponent<IWrapperProps> =
  ({ message, onClose, variant, ...props }: IWrapperProps): JSX.Element => {
    const classes = useStyles();
    const Icon: ComponentType<SvgIconProps> = variantIcon[variant];
    return (
      <SnackbarContent
        // @ts-ignore
        className={clsx(classes[variant], classes.snackbar)}
        aria-describedby="snackbar"
        message={
          <Typography component="span" id="snackbar" className={classes.message}>
            <Icon className={clsx(classes.icon, classes.iconVariant)} />
            {message}
          </Typography>
        }
        {...props}
      />
    );
  };

const Snackbar: FunctionComponent<IProps> =
  ({ message, variant, onClose, open }: IProps) => (
    <SnackbarBase
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      TransitionComponent={TransitionComponent}
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
    >
      <SnackbarContentWrapper
        onClose={onClose}
        variant={variant}
        message={message}
      />
    </SnackbarBase>
  );

export default Snackbar;
