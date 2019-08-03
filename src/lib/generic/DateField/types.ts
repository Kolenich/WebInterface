import { GridSize } from '@material-ui/core/Grid';
import { KeyboardDatePickerProps } from '@material-ui/pickers';

export interface IProps extends KeyboardDatePickerProps {
  /** Размер в Grid-сетке на маленьких экранах */
  xs: GridSize;
  /** Размер в Grid-сетке на больших экранах */
  lg: GridSize;
}
