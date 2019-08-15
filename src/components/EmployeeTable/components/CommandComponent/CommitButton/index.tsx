import { IconButton, Tooltip } from '@material-ui/core';
import { Save } from '@material-ui/icons';
import React, { FunctionComponent } from 'react';
import { IProps } from '../types';

const EditButton: FunctionComponent<IProps> = ({ onExecute, text }: IProps): JSX.Element => (
  <Tooltip title={text}>
    <IconButton
      color="primary"
      onClick={onExecute}
    >
      <Save />
    </IconButton>
  </Tooltip>
);

export default EditButton;
