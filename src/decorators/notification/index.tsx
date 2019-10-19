import { Dialog, Snackbar } from 'generic';
import { IVariantIcons } from 'generic/Snackbar/types';
import { IDialogProps, IDialogStatus, ISnackbarProps } from 'lib/types';
import React, { ComponentType, FC, useState } from 'react';
import { INotifications, IOptions } from './types';

/**
 * Декоратор, подмешивающий компоненту диалоговое окно и снэкбар с функциями для их вызова
 * @param withSnackbar флаг на подмешивание снэкбара
 * @param withDialog флаг на подмешивание диалогового окна
 */
const withNotification =
  <T extends INotifications>({ withSnackbar = false, withDialog = false }: IOptions) =>
    (Component: ComponentType<T>): FC<T> => (props: T): JSX.Element => {
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
        warningAcceptCallback: undefined,
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
       * @param warningAcceptCallback функция-колбэк для принятия предупреждения
       */
      const openDialog = (
        status: IDialogStatus,
        message: string = '',
        warningAcceptCallback?: () => void,
      ): void => (
        setDialog({ status, message, warningAcceptCallback, open: true })
      );

      /**
       * Функция вызова снэкбара
       * @param variant тип вызываемого снэкбара
       * @param message сообщение
       */
      const openSnackbar = (variant: keyof IVariantIcons, message: string = ''): void => (
        setSnackbar({ variant, message, open: true })
      );

      let notification: Partial<INotifications> = {};
      if (withSnackbar) {
        notification = { ...notification, openSnackbar };
      }
      if (withDialog) {
        notification = { ...notification, openDialog };
      }

      return (
        <>
          {withDialog &&
          <Dialog {...dialog} onClose={closeDialog} />}
          {withSnackbar &&
          <Snackbar {...snackbar} onClose={closeSnackbar} />}
          <Component {...props} {...notification} />
        </>
      );

    };

export default withNotification;
