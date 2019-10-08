import { ButtonProps } from '@material-ui/core/Button';

export interface IProps extends ButtonProps {
  /** Тип иконки */
  icon?: IButtonIcon;
}

export type IButtonIcon = 'save' | 'add' | 'confirm' | 'update' | 'edit' | 'delete' | 'cancel';
