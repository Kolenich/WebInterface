export interface IContext {
  /** Функции для обновления значений */
  setters: ISetters;
  /** Константы */
  getters: IGetters;
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
