import { Button, Tooltip } from '@material-ui/core';
import { Cancel } from '@material-ui/icons';
import React, { FunctionComponent } from 'react';
import { IProps } from '../types';

const CancelButton: FunctionComponent<IProps> = ({ onExecute, text }: IProps): JSX.Element => (
  <Tooltip title={text}>
    <Button
      color="secondary"
      onClick={onExecute}
    >
      <Cancel />
    </Button>
  </Tooltip>
);

export default CancelButton;
