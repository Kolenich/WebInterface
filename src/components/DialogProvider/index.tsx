import React, { createContext, FC, useContext, useMemo, useState } from 'react';
import Dialog from './Dialog';
import { IDialogState, IDialogStatus } from './Dialog/types';
import { IDialogContext } from './types';

/** Объект контекста для диалога */
const DialogContext = createContext<IDialogContext>({} as IDialogContext);

/**
 * Компонент, предоставляюшщий доступ к вызову диалогового окна
 * @param {React.ReactChildren} children - дочерние элементы
 * @returns {JSX.Element}
 * @constructor
 */
const DialogProvider: FC = ({ children }) => {
  /** Переменные состояния для диалогового окна */
  const [dialog, setDialog] = useState<IDialogState>({
    open: false,
    status: 'loading',
    message: '',
    warningAcceptCallback: undefined,
  });
  /** Значение для контекста */
  const contextValue = useMemo(
    () => ({
      openDialog: (message: string, status: IDialogStatus, warningAcceptCallback?: () => void) => (
        setDialog({ message, status, warningAcceptCallback, open: true })
      ),
    }),
    [],
  );

  return (
    <DialogContext.Provider value={contextValue}>
      <Dialog
        {...dialog}
        onClose={() => setDialog((oldDialog) => ({ ...oldDialog, open: false }))}
      />
      {children}
    </DialogContext.Provider>
  );
};

/**
 * Пользовательский хук для вызова контекста DialogProvider
 * @returns {IDialogContext}
 */
export const useDialog = (): IDialogContext => useContext(DialogContext);

export default DialogProvider;
