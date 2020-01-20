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

  /**
   * Функция-обертка для установки активного заголовка панели
   * @param {string} title устанавливаемый заголовок
   */
  const updateDashBoardTitle = (title: string) => (
    setDashBoardTitle(title)
  );

  const value: IContext = {
    getters: {
      dashBoardTitle,
      documentTitle: 'Ежедневник',
    },
    setters: {
      updateDashBoardTitle,
    },
  };

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
