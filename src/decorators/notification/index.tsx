import { Dialog } from 'generic';
import { IDialogProps, IDialogStatus } from 'lib/types';
import React, { ComponentType, FC, useState } from 'react';
import { INotifications } from './types';

/**
 * Декоратор, подмешивающий компоненту диалоговое окно и снэкбар с функциями для их вызова
 * @param {ComponentType} Component оборачиваемый компонент
 * @returns {(Component: React.ComponentType<T>) => React.FC<T>} компонент декоратора
 */
const withNotification =
  <T extends INotifications>(Component: ComponentType<T>): FC<T> => (props: T): JSX.Element => {
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
     * Функция вызова диалогового окна
     * @param status статус вызываемого окна
     * @param message сообщение
     * @param warningAcceptCallback функция-колбэк для принятия предупреждения
     */
    const openDialog = (
      message: string,
      status: IDialogStatus = 'success',
      warningAcceptCallback?: () => void,
    ): void => (
      setDialog({ message, status, warningAcceptCallback, open: true })
    );

    return (
      <>
        <Dialog {...dialog} onClose={closeDialog} />
        <Component {...props} openDialog={openDialog} />
      </>
    );

  };

export default withNotification;
