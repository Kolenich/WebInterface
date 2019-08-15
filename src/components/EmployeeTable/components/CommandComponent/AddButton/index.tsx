import { Button } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { IProps } from '../types';

const AddButton: FunctionComponent<IProps> = ({ onExecute, text }: IProps): JSX.Element => (
  <Button
    color="primary"
    onClick={onExecute}
  >
    {text}
  </Button>
);

export default AddButton;
