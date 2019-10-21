import { Grow, Snackbar as SnackbarBase, SnackbarContent, Typography } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import { CheckCircle, Error, Info, SvgIconComponent, Warning } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, { FC } from 'react';
import styles from './styles';
import { IProps, IVariantIcons, IWrapperProps } from './types';

const useStyles = makeStyles(styles);

/**
 * Объект с иконками для снэкбара
 */
export const variantIcon: IVariantIcons = {
  success: CheckCircle,
  warning: Warning,
  error: Error,
  info: Info,
};

/**
 * Компонент, отвечающий за анимацию появления и исчезновения снэкбара
 * @param {TransitionProps} props передаваемые пропсы
 * @returns {JSX.Element}
 * @constructor
 */
const TransitionComponent: FC<TransitionProps> = (props: TransitionProps): JSX.Element => (
  <Grow {...props} />
);

/**
 * Компонент-обертка для содержимого снэкбара
 * @param {string} message сообщение снэкбара
 * @param {() => void} onClose функция, закрывающая снэкбар
 * @param {"success" | "warning" | "error" | "info"} variant тип отображаемого снэкбара
 * @param {Partial<IProps} props остальные пропсы
 * @returns {JSX.Element}
 * @constructor
 */
const SnackbarContentWrapper: FC<IWrapperProps> =
  ({ message, onClose, variant, ...props }: IWrapperProps): JSX.Element => {
    const classes = useStyles();
    const Icon: SvgIconComponent = variantIcon[variant];
    return (
      <SnackbarContent
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

/**
 * Основной компонент снэкбара
 * @param {string} message message сообщение снэкбара
 * @param {"success" | "warning" | "error" | "info"} variant тип отображаемого снэкбара
 * @param {() => void} onClose функция, закрывающая снэкбар
 * @param {boolean} open переменная, отвечающая за открытие/закрытие снэкбара
 * @returns {JSX.Element}
 * @constructor
 */
const Snackbar: FC<IProps> = ({ message, variant, onClose, open }: IProps): JSX.Element => (
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
