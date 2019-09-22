import React, { createContext, FunctionComponent } from 'react';
import Router from 'router';
import { IContext } from './types';

// Глобальное хранилище (контекст)
export const Context = createContext<IContext>({});

/**
 * Класс провайдер для контекста
 * @constructor
 */
const Provider: FunctionComponent<{}> = (): JSX.Element => {
  const value: IContext = {
    documentTitle: 'Ежедневник',
  };

  return (
    <Context.Provider value={value}>
      <Router />
    </Context.Provider>
  );
};

export default Provider;
