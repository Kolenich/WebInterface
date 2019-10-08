import { IVariantIcons } from 'lib/generic/Snackbar/types';
import { IDialogStatus } from 'lib/types';

export interface IContext {
  /** Функции для обновления значений */
  setters: ISetters;
  /** Константы */
  getters: IGetters;
}

interface ISetters {
  /** Функция для установки заголовка панели */
  updateDashBoardTitle?: (title: string) => void;
  /** Функция для вызова снэкбара */
  openSnackbar?: (variant: keyof IVariantIcons, message: string) => void;
  /** Функция для вызова диалогового окна */
  openDialog?: (status: IDialogStatus, message: string) => void;
}

interface IGetters {
  /** Заголовок страницы */
  documentTitle?:
    string;
  /** Заголовок панели */
  dashBoardTitle?: string;
}
