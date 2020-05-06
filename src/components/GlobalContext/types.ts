export interface IGlobalState {
  /** Функции для обновления значений */
  setters: ISetters;
  /** Константы */
  getters: IGetters;
}

export interface IGlobalReducerAction {
  /** Виды взаимодействия с глобальным хранилищем */
  type: 'SET_GLOBAL_TITLE' | 'SET_DASHBOARD_TITLE';
  /** Значения для работы с глобальным хранилищем */
  payload: string;
}

interface ISetters {
  /** Функция для установки заголовка панели */
  updateDashBoardTitle: (title: string) => void;
}

interface IGetters {
  /** Заголовок страницы */
  documentTitle: string;
  /** Заголовок панели */
  dashBoardTitle: string;
}
