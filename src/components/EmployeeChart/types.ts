import { Theme, WithStyles } from '@material-ui/core';
import { IRouterProps } from '../../lib/types';
import { styles } from './styles';

export interface IProps extends WithStyles<typeof styles>, IRouterProps {
  /** Тема Material UI */
  theme: Theme;
}

export interface IState {
  /** Тип массива точек для графика */
  chartData: IChartPoint[];
}

export interface IChartPoint {
  /** Месяц */
  month: string;
  /** Объём продаж */
  sale: number;
  /** Всего транзакций */
  total: number;
}
