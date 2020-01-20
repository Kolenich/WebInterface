import React, { createContext, FC, useState } from 'react';
import { IContext } from './types';

// Глобальное хранилище (контекст)
export const Context = createContext<IContext>({} as IContext);

/**
 *
 * @param {React.ReactNode} children дочерний
 * компонент, который получит данные из контекста
 * @returns {JSX.Element}
 * @constructor
 */
const ContextProvider: FC = ({ children }) => {
  // Заголовок для панели
  const [dashBoardTitle, setDashBoardTitle] = useState<string>('');

  const value: IContext = {
    getters: {
      dashBoardTitle,
      documentTitle: 'Ежедневник',
    },
    setters: {
      updateDashBoardTitle: setDashBoardTitle,
    },
  };

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
