import { Button, Tooltip } from '@material-ui/core';
import { Save } from '@material-ui/icons';
import React, { FunctionComponent } from 'react';
import { IProps } from '../types';

const EditButton: FunctionComponent<IProps> = ({ onExecute, text }: IProps): JSX.Element => (
  <Tooltip title={text}>
    <Button
      color="primary"
      onClick={onExecute}
    >
      <Save />
    </Button>
  </Tooltip>
);

export default EditButton;
