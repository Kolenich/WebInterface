import { ButtonProps } from '@material-ui/core/Button';

export interface IProps extends ButtonProps {
  /** Текст кнопки */
  text: string;
  /** Тип иконки */
  icon?: IButtonIcon;
}

export type IButtonIcon = 'save' | 'add' | 'confirm' | 'update' | 'edit' | 'delete' | 'cancel';
