import { AxiosError } from 'axios';
import { IDialogProps, IDialogStatus } from 'components/Dialog/types';
import { Dialog } from 'components/index';
import auth from 'lib/auth';
import { SERVER_NOT_AVAILABLE, SERVER_RESPONSES } from 'lib/constants';
import { useSnackbar } from 'notistack';
import React, { ComponentType, useState } from 'react';
import { useHistory } from 'react-router';
import { INotifications, IServerError } from './types';

/**
 * Декоратор, подмешивающий компоненту диалоговое окно с функцией для его вызова
 * @param {React.ComponentType<T>} Component оборачиваемый компонент
 * @returns {React.FC<T>} компонент с подмшаным диалоговым окном и функцией вызова
 */
const withDialog = <T extends INotifications>(Component: ComponentType<T>) => (props: T) => {
  // Переменные состояния для диалогового окна
  const [dialog, setDialog] = useState<IDialogProps>({
    open: false,
    status: 'loading',
    message: '',
    warningAcceptCallback: undefined,
  });

  const history = useHistory();

  const { enqueueSnackbar } = useSnackbar();

  /**
   * Функция, закрывающая диалог
   */
  const closeDialog = () => (
    setDialog((oldDialog: IDialogProps) => ({ ...oldDialog, open: false }))
  );

  /**
   * Функция вызова диалогового окна
   * @param {string} message сообщение
   * @param {IDialogStatus} status статус вызываемого окна
   * @param {() => void} warningAcceptCallback функция-колбэк для принятия предупреждения
   */
  const openDialog =
    (message: string, status: IDialogStatus, warningAcceptCallback?: () => void) => (
      setDialog({ message, status, warningAcceptCallback, open: true })
    );

  /**
   * Общая функция обработки ошибки
   * @param error {AxiosError} объект ошибки
   * @param {"dialog" | "snackbar"} by куда вывести ошибку
   * @param {string} forceMessage принудительное сообщение для вывода
   */
  const showError =
    (error: AxiosError<IServerError>, by: 'dialog' | 'snackbar', forceMessage?: string) => {
      let detail = SERVER_NOT_AVAILABLE;
      if (error.response) {
        detail = SERVER_RESPONSES[error.response.status];
        if (error.response.data.detail) {
          ({ detail } = error.response.data);
        }
        if (forceMessage) {
          detail = forceMessage;
        }
        if (error.response.status === 401) {
          auth.logout().finally(() => history.push({ pathname: '/' }));
          return;
        }
      }
      switch (by) {
        case 'dialog':
          openDialog(detail, 'error');
          break;
        case 'snackbar':
          enqueueSnackbar(detail, { variant: 'error' });
          break;
        default:
          break;
      }
    };

  return (
    <>
      <Dialog {...dialog} onClose={closeDialog}/>
      <Component {...props} openDialog={openDialog} showError={showError}/>
    </>
  );

};

export default withDialog;
