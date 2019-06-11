import { Theme, WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface Props extends WithStyles<typeof styles> {
  theme: Theme;
}

export interface State {
  chartData: ChartPoint[];
}

export interface ChartPoint {
  month: string;
  sale: number;
  total: number;
}
