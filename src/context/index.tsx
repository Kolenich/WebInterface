import React, { createContext, FC, useState } from 'react';
import Router from 'router';
import { IContext } from './types';

// Глобальное хранилище (контекст)
export const Context = createContext<IContext>({} as IContext);

/**
 * Класс провайдер для контекста
 * @constructor
 */
const Provider: FC<{}> = (): JSX.Element => {
  // Заголовок для панели
  const [dashBoardTitle, setDashBoardTitle] = useState<string>('');

  /**
   * Функция-обертка для установки активного заголовка панели
   * @param title устанавливаемый заголовок
   */
  const updateDashBoardTitle = (title: string): void => setDashBoardTitle(title);

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
      <Router />
    </Context.Provider>
  );
};

export default Provider;
