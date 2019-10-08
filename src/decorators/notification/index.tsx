import { Dialog, Snackbar } from 'generic';
import { IVariantIcons } from 'generic/Snackbar/types';
import { IDialogProps, IDialogStatus, ISnackbarProps } from 'lib/types';
import React, { ComponentType, FC, useState } from 'react';
import { INotifications } from './types';

/**
 * Декоратор, подмешивающий компоненту диалоговое окно и снэкбар с функциями для их вызова
 * @param Component оборачиваемый компонент
 */
const withNotification =
  <T extends INotifications>(Component: ComponentType<T>): FC<T> => (props: T): JSX.Element => {
    // Переменные состояния для снэкбара
    const [snackbar, setSnackbar] = useState<ISnackbarProps>({
      open: false,
      variant: 'info',
      message: '',
    });

    // Переменные состояния для снэкбара
    const [dialog, setDialog] = useState<IDialogProps>({
      open: false,
      status: 'loading',
      message: '',
    });

    /**
     * Функция, закрывающая диалог
     */
    const closeDialog = (): void => setDialog({ ...dialog, open: false });

    /**
     * Функция, закрывающая снэкбар
     */
    const closeSnackbar = (): void => setSnackbar({ ...snackbar, open: false });

    /**
     * Функция вызова диалогового окна
     * @param status статус вызываемого окна
     * @param message сообщение
     */
    const openDialog = (status: IDialogStatus, message: string = ''): void => (
      setDialog({ status, message, open: true })
    );

    /**
     * Функция вызова снэкбара
     * @param variant тип вызываемого снэкбара
     * @param message сообщение
     */
    const openSnackbar = (variant: keyof IVariantIcons, message: string = ''): void => (
      setSnackbar({ variant, message, open: true })
    );

    return (
      <>
        <Dialog {...dialog} onClose={closeDialog} />
        <Snackbar {...snackbar} onClose={closeSnackbar} />
        <Component {...props} openDialog={openDialog} openSnackbar={openSnackbar} />
      </>
    );

  };

export default withNotification;
