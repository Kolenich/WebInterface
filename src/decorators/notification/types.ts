import { IVariantIcons } from 'generic/Snackbar/types';
import { IDialogStatus } from 'lib/types';

export interface INotifications {
  /** Функция для открытия диалогового окна */
  openDialog: (message: string, status: IDialogStatus, warningAcceptCallback?: () => void) => void;
  /** Функция для открытия снэкбара */
  openSnackbar: (message: string, variant: keyof IVariantIcons) => void;
}

export interface IOptions {
  /** Флаг на подмешивание диалогового окна */
  withDialog?: boolean;
  /** Флаг на подмешивание снэкбара */
  withSnackbar?: boolean;
}
