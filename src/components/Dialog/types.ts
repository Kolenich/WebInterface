export interface IProps extends IDialogState {
  /** Функция-колбэк, закрывающая окно статуса */
  onClose: () => void;
}

export type IDialogStatus = 'success' | 'error' | 'warning' | 'loading';

export interface IDialogState {
  /** Флаг открытия/закрытия */
  open: boolean;
  /** Сообщение на снэкбаре */
  message: string;
  /** Статус снэкбара */
  status: IDialogStatus;
  /** Функция-колбэк для обработки принятия предупреждения */
  warningAcceptCallback?: () => void;
}
