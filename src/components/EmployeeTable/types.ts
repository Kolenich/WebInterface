import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { Employee, ModalProps } from '../../lib/types';
import { Column, TableColumnWidthInfo } from '@devexpress/dx-react-grid';
import { ReactElement } from 'react';
import EditEmployee from '../EmployeeForm';

export interface Props extends WithStyles<typeof styles> {
}

export interface State {
  employees: Employee[];
  rows: TableRows[];
  rowId: number;
  columns: Column[];
  defaultOrder: string[];
  defaultColumnWidths: TableColumnWidthInfo[];
  pageSizes: number[];
  defaultPageSize: number;
  addEmployee: boolean;
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

export interface EditEmployeeProps extends ModalProps {
  form: ReactElement<typeof EditEmployee>;
}
