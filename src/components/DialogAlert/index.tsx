import { AxiosError } from 'axios';
import { IDialogProps, IDialogStatus } from 'components/Dialog/types';
import { Dialog } from 'components/index';
import auth from 'lib/auth';
import { SERVER_NOT_AVAILABLE, SERVER_RESPONSES } from 'lib/constants';
import { useSnackbar } from 'notistack';
import React, { ComponentType, useCallback, useState } from 'react';
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
   * Функция вызова диалогового окна
   * @param {string} message сообщение
   * @param {IDialogStatus} status статус вызываемого окна
   * @param {() => void} warningAcceptCallback функция-колбэк для принятия предупреждения
   */
  const openDialog = useCallback(
    (message: string, status: IDialogStatus, warningAcceptCallback?: () => void) => (
      setDialog({ message, status, warningAcceptCallback, open: true })
    ),
    [],
  );

  /**
   * Общая функция обработки ошибки
   * @param error {AxiosError<IServerError>} объект ошибки
   * @param {"dialog" | "snackbar"} by куда вывести ошибку
   * @param {string} forceMessage принудительное сообщение для вывода
   */
  const showError = useCallback(
    (error: AxiosError<IServerError>, by?: 'dialog' | 'snackbar', forceMessage?: string) => {
      let message = SERVER_NOT_AVAILABLE;
      if (error.response) {
        message = SERVER_RESPONSES[error.response.status];
        if (error.response.data.detail) {
          message = error.response.data.detail;
        }
        if (error.response.data.non_field_errors) {
          message = error.response.data.non_field_errors[0];
        }
        if (forceMessage) {
          message = forceMessage;
        }
        if (error.response.status === 401) {
          auth.logout().finally(() => history.push({ pathname: '/' }));
          return;
        }
      }
      switch (by) {
        case 'dialog':
          openDialog(message, 'error');
          break;
        case 'snackbar':
          enqueueSnackbar(message, { variant: 'error' });
          break;
        default:
          enqueueSnackbar(message, { variant: 'error' });
          break;
      }
    },
    [enqueueSnackbar, history, openDialog],
  );

  return (
    <>
      <Dialog
        {...dialog}
        onClose={() => setDialog((oldDialog: IDialogProps) => ({
          ...oldDialog,
          open: false,
        }))}
      />
      <Component {...props} openDialog={openDialog} showError={showError}/>
    </>
  );

};

export default withDialog;
