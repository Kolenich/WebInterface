import { SnackbarContentProps } from '@material-ui/core/SnackbarContent';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { ComponentState, ComponentType } from 'react';
import { variantIcon } from './index';

export interface IWrapperProps extends SnackbarContentProps {
  /** Сообщение снэкбара */
  message?: string;
  /** Функция, закрывающая снэкбар */
  onClose?: () => ComponentState;
  /** Тип снэкбара */
  variant: keyof typeof variantIcon;
}

export interface IProps extends IWrapperProps {
  /** Флаг, отвечающий за открытие снэкбара */
  open: boolean;
}

export interface IVariantIcons {
  /** Иконка для успешного статуса */
  success: ComponentType<SvgIconProps>;
  /** Иконка для статуса с предупреждением */
  warning: ComponentType<SvgIconProps>;
  /** Иконка для статуса ошибки */
  error: ComponentType<SvgIconProps>;
  /** Иконка для статуса с информацией */
  info: ComponentType<SvgIconProps>;

  [index: string]: ComponentType<SvgIconProps>;
}
