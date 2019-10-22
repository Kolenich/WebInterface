export interface IProps {
  /** Указатель открыто окно статуса или нет */
  open: boolean;
  /** Функция-колбэк, закрывающая окно статуса */
  onClose: () => void;
  /** Функция-колбэк, срабатывающий после закрытия окна */
  warningAcceptCallback?: () => void;
  /** Тип отображаемого статуса */
  status: IDialogStatus;
  /** Отображаемое сообщеие */
  message: string;
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
