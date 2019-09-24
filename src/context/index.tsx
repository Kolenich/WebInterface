import React, { createContext, FunctionComponent, useState } from 'react';
import Router from 'router';
import { IContext } from './types';

// Глобальное хранилище (контекст)
export const Context = createContext<IContext>({});

/**
 * Класс провайдер для контекста
 * @constructor
 */
const Provider: FunctionComponent<{}> = (): JSX.Element => {
  // Заголовок для панели
  const [dashBoardTitle, setDashBoardTitle] = useState<string>('');

  // Функция-обертка для установки активного заголовка панели
  const updateDashBoardTitle = (title: string) => setDashBoardTitle(title);

  const value: IContext = {
    dashBoardTitle,
    updateDashBoardTitle,
    documentTitle: 'Ежедневник',
  };

  return (
    <Context.Provider value={value}>
      <Router />
    </Context.Provider>
  );
};

export default Provider;
