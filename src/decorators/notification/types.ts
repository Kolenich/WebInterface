import { IVariantIcons } from 'generic/Snackbar/types';
import { IDialogStatus } from 'lib/types';

export interface INotifications {
  /** Функция для открытия диалогового окна */
  openDialog: (status: IDialogStatus, message: string, warningAcceptCallback?: () => void) => void;
  /** Функция для открытия снэкбара */
  openSnackbar: (variant: keyof IVariantIcons, message: string) => void;
}

export interface IOptions {
  /** Флаг на подмешивание диалогового окна */
  withDialog?: boolean;
  /** Флаг на подмешивание снэкбара */
  withSnackbar?: boolean;
}
