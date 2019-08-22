import { SnackbarContentProps } from '@material-ui/core/SnackbarContent';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { ComponentType } from 'react';

export interface IWrapperProps extends SnackbarContentProps {
  /** Сообщение снэкбара */
  message: string;
  /** Функция, закрывающая снэкбар */
  onClose: () => void;
  /** Тип снэкбара */
  variant: keyof IVariantIcons;
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
