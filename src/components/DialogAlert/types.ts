import { AxiosError } from 'axios';
import { IDialogStatus } from 'components/Dialog/types';

export interface INotifications {
  /** Функция для открытия диалогового окна */
  openDialog: (message: string, status: IDialogStatus, warningAcceptCallback?: () => void) => void;
  /** Общая функция отработки ошибки */
  showError: (error: AxiosError, by: 'dialog' | 'snackbar', forceMessage?: string) => void;
}

export interface IServerError {
  /** Сообщение, выводимое сервером в общем случае */
  detail: string;
}
