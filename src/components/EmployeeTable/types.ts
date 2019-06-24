import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { Employee } from '../../lib/types';
import { Column, TableColumnWidthInfo } from '@devexpress/dx-react-grid';

export interface Props extends WithStyles<typeof styles> {
}

export interface State {
  employees: Employee[];
  rowId: number;
  totalCount: number;
  currentPage: number;
  columns: Column[];
  defaultOrder: string[];
  defaultColumnWidths: TableColumnWidthInfo[];
  pageSizes: number[];
  pageSize: number;
  addEmployee: boolean;
  loading: boolean;
}

export interface TableRows {
  id: number;
  fullName: string;
  registrationDate: string;
  phone: string;
  email: string;
  age: number;
  dateOfBirth: string;
  sex: string;
}
