import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { ComponentState } from 'react';
import { Employee } from '../../lib/types';
import { GridSize } from '@material-ui/core/Grid';
import { Validation } from '../../lib/validation';

export interface Props extends WithStyles<typeof styles> {
  id: number;
  open: boolean;
  onCLose: () => ComponentState;
  updateTable: (newEmployee: Employee) => ComponentState;
  deleteRecord: (id: number) => ComponentState;
}

export interface State extends Employee {
  successWindow: boolean;
  errorWindow: boolean;
  statusMessage: Employee | string;
}

export interface InputFieldProps {
  xs: GridSize;
  fieldName: keyof Employee;
  required?: boolean;
  validationType?: Validation;
}
