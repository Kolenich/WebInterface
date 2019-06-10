import { Theme, WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface Props extends WithStyles<typeof styles> {
  theme: Theme;
}

export interface State {
  data: EmployeeChartPoint[];
}

export interface EmployeeChartPoint {
  month: string;
  sale: number;
  total: number;
}
