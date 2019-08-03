import { ComponentState } from 'react';

export interface IProps {
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
