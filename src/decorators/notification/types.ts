import { IVariantIcons } from 'generic/Snackbar/types';
import { IDialogStatus } from 'lib/types';

export interface INotifications {
  /** Функция для открытия диалогового окна */
  openDialog: (status: IDialogStatus, message: string) => void;
  /** Функция для открытия снэкбара */
  openSnackbar: (variant: keyof IVariantIcons, message: string) => void;
}
