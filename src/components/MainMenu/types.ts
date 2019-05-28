import { Theme, WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { Employee } from '../../lib/types';
import { Locales } from '../../lib/utils';
import { ReactNode } from 'react';

export interface Props extends WithStyles<typeof styles> {
  theme: Theme;
}

export interface State {
  employees: Employee[];
  locale: Locales;
  value: number;
}

export interface TabContainerProps {
  children?: ReactNode;
  dir?: string;
}
