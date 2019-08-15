import { Button, Tooltip } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, { FunctionComponent } from 'react';
import { IProps } from '../types';

const DeleteButton: FunctionComponent<IProps> = ({ onExecute, text }: IProps): JSX.Element => (
  <Tooltip title={text}>
    <Button
      color="secondary"
      onClick={onExecute}
    >
      <Delete />
    </Button>
  </Tooltip>
);

export default DeleteButton;
