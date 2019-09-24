export interface IContext {
  /** Заголовок страницы */
  documentTitle?: string;
  /** Заголовок панели */
  dashBoardTitle?: string;
  /** Функция для установки заголовка панели */
  updateDashBoardTitle?: (title: string) => void;
}
