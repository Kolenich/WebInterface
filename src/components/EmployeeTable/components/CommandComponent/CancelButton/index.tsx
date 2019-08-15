import { IconButton, Tooltip } from '@material-ui/core';
import { Cancel } from '@material-ui/icons';
import React, { FunctionComponent } from 'react';
import { IProps } from '../types';

const CancelButton: FunctionComponent<IProps> = ({ onExecute, text }: IProps): JSX.Element => (
  <Tooltip title={text}>
    <IconButton
      color="secondary"
      onClick={onExecute}
    >
      <Cancel />
    </IconButton>
  </Tooltip>
);

export default CancelButton;
