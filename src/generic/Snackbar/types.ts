import { SnackbarContentProps } from '@material-ui/core/SnackbarContent';
import { SvgIconComponent } from '@material-ui/icons';

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
  success: SvgIconComponent;
  /** Иконка для статуса с предупреждением */
  warning: SvgIconComponent;
  /** Иконка для статуса ошибки */
  error: SvgIconComponent;
  /** Иконка для статуса с информацией */
  info: SvgIconComponent;

  [index: string]: SvgIconComponent;
}
