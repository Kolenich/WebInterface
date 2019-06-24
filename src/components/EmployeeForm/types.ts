import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { ComponentState } from 'react';
import { Employee } from '../../lib/types';
import { GridSize } from '@material-ui/core/Grid';
import { Validation } from '../../lib/validation';

export interface Props extends WithStyles<typeof styles> {
  id: number;
  open: boolean;
  onClose: () => ComponentState;
  updateTable: () => ComponentState;
}

export interface State {
  employee: Employee;
  dateOfBirthNotNull: boolean;
  statusWindowOpen: boolean;
  statusMessage: string;
  statusType: 'success' | 'error' | 'warning' | 'loading';
}

export interface InputFieldProps {
  xs: GridSize;
  fieldName: keyof Employee;
  required?: boolean;
  validationType?: Validation;
}
