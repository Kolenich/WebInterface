export interface IProps extends IDialogProps {
  /** Функция-колбэк, закрывающая окно статуса */
  onClose: () => void;
}

export type IDialogStatus = 'success' | 'error' | 'warning' | 'loading';

export interface IDialogProps {
  /** Флаг открытия/закрытия */
  open: boolean;
  /** Сообщение на снэкбаре */
  message: string;
  /** Статус снэкбара */
  status: IDialogStatus;
  /** Функция-колбэк для обработки принятия предупреждения */
  warningAcceptCallback?: () => void;
}
