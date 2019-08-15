import { IconButton, Tooltip } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, { FunctionComponent } from 'react';
import { IProps } from '../types';

const DeleteButton: FunctionComponent<IProps> = ({ onExecute, text }: IProps): JSX.Element => (
  <Tooltip title={text}>
    <IconButton
      color="secondary"
      onClick={onExecute}
    >
      <Delete />
    </IconButton>
  </Tooltip>
);

export default DeleteButton;
