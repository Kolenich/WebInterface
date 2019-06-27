import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { Sex, TableRow } from '../../lib/types';
import {
  Column,
  Filter,
  FilteringState,
  Sorting, SortingState,
  TableColumnWidthInfo,
} from '@devexpress/dx-react-grid';

export interface Props extends WithStyles<typeof styles> {
}

export interface State {
  sex: Sex;
  dateColumns: string[];
  dateTimeColumns: string[];
  rows: TableRow[];
  rowId: number;
  totalCount: number;
  currentPage: number;
  columns: Column[];
  filters: Filter[];
  sorting: Sorting[];
  defaultOrder: string[];
  defaultColumnWidths: TableColumnWidthInfo[];
  filteringStateColumnExtensions: FilteringState.ColumnExtension[];
  sortingStateColumnExtensions: SortingState.ColumnExtension[];
  pageSizes: number[];
  pageSize: number;
  addEmployee: boolean;
  loading: boolean;
}
