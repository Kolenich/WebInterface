export interface IProps {
  /** Указатель открыто окно статуса или нет */
  open: boolean;
  /** Функция-колбэк, закрывающая окно статуса */
  onClose: () => void;
  /** Функция-колбэк, срабатывающий после закрытия окна */
  warningAcceptCallback?: () => void;
  /** Тип отображаемого статуса */
  status: 'success' | 'error' | 'warning' | 'loading';
  /** Отображаемое сообщеие */
  message: string;
}
