import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { ComponentState } from 'react';

export interface Props extends WithStyles<typeof styles> {
  open: boolean;
  onClose: () => ComponentState;
  closeCallback?: () => ComponentState;
  status: 'success' | 'error' | 'warning' | 'loading';
  message: string;
}

export interface State {
}
