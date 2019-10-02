import Snackbar from 'lib/generic/Snackbar';
import { IVariantIcons } from 'lib/generic/Snackbar/types';
import { IDialogProps, IDialogStatus, ISnackbarProps } from 'lib/types';
import React, { createContext, FC, useState } from 'react';
import Router from 'router';
import Dialog from '../lib/generic/Dialog';
import { IContext } from './types';

// Глобальное хранилище (контекст)
export const Context = createContext<IContext>({});

/**
 * Класс провайдер для контекста
 * @constructor
 */
const Provider: FC<{}> = (): JSX.Element => {
  // Заголовок для панели
  const [dashBoardTitle, setDashBoardTitle] = useState<string>('');

  // Переменные состояния снэкбара
  const [snackbar, setSnackbar] = useState<ISnackbarProps>({
    open: false,
    variant: 'info',
    message: '',
  });

  // Переменные состояния диалогового окна
  const [dialog, setDialog] = useState<IDialogProps>({
    open: false,
    status: 'loading',
    message: '',
  });

  /**
   * Функция-обертка для установки активного заголовка панели
   * @param title устанавливаемый заголовок
   */
  const updateDashBoardTitle = (title: string): void => setDashBoardTitle(title);

  /**
   * Функция, закрывающая снэкбар
   */
  const closeSnackbar = (): void => setSnackbar({ ...snackbar, open: false });

  /**
   * Функция, закрывающая диалоговое окно
   */
  const closeDialog = (): void => setDialog({ ...dialog, open: false });

  /**
   * Обертка для открытия снэкбара
   * @param variant тип вызываемого снэкбара
   * @param message сообщение в снэкбаре
   */
  const openSnackbar = (variant: keyof IVariantIcons, message: string): void => (
    setSnackbar({ ...snackbar, variant, message, open: true })
  );

  /**
   * Обертка для открытия диалога
   * @param status тип вызываемого диалога
   * @param message сообщение в диалоге
   */
  const openDialog = (status: IDialogStatus, message: string): void => (
    setDialog({ ...dialog, status, message, open: true })
  );

  const value: IContext = {
    dashBoardTitle,
    updateDashBoardTitle,
    openSnackbar,
    openDialog,
    documentTitle: 'Ежедневник',
  };

  return (
    <>
      <Snackbar {...snackbar} onClose={closeSnackbar} />
      <Dialog {...dialog} onClose={closeDialog} />
      <Context.Provider value={value}>
        <Router />
      </Context.Provider>
    </>
  );
};

export default Provider;
