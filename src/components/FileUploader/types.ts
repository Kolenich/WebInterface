import { Avatar } from '../../lib/types';
import { ComponentState } from 'react';
import { GridSize } from '@material-ui/core/Grid';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface Props extends WithStyles<typeof styles> {
  fileUploadCallback: (avatar: Avatar) => ComponentState;
  fileRemoveCallback: () => ComponentState;
  url: string | null;
  xs: GridSize;
  title?: string;
}

export interface State {
  fileLoaded: boolean;
}
