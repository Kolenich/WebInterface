import { WithStyles } from '@material-ui/core';
import { ComponentState } from 'react';
import { styles } from './styles';

export interface IProps extends WithStyles<typeof styles> {
  /** Указатель открыто окно статуса или нет */
  open: boolean;
  /** Функция-колбэк, закрывающая окно статуса */
  onClose: () => ComponentState;
  /** Функция-колбэк, срабатывающий после закрытия окна */
  closeCallback?: () => ComponentState;
  /** Тип отображаемого статуса */
  status: 'success' | 'error' | 'warning' | 'loading';
  /** Отображаемое сообщеие */
  message: string;
}
