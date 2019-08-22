import { Theme } from '@material-ui/core';
import { WithStyles } from '@material-ui/styles';
import { RouteComponentProps } from 'react-router-dom';
import { styles } from './styles';

export interface IProps extends WithStyles<typeof styles>, RouteComponentProps {
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
