import React, { FunctionComponent } from 'react';
import AddButton from './AddButton';
import CancelButton from './CancelButton';
import CommitButton from './CommitButton';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import { ICommandComponents, IProps } from './types';

const commandComponents: ICommandComponents<IProps> = {
  add: AddButton,
  edit: EditButton,
  delete: DeleteButton,
  commit: CommitButton,
  cancel: CancelButton,
};

const CommandComponent = (props: IProps): JSX.Element => {
  const CommandButton: FunctionComponent<IProps> = commandComponents[props.id];
  return (
    <CommandButton
      {...props}
    />
  );
};

export default CommandComponent;
