export interface IProps {
}

export interface IChart {
  /** Тип массива точек для графика */
  data: IPoint[];
}

export interface IPoint {
  /** Месяц */
  month: string;
  /** Объём продаж */
  sale: number;
  /** Всего транзакций */
  total: number;
}
