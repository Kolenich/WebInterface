import { IconButton, Tooltip } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, { FunctionComponent, useState } from 'react';
import Dialog from '../../../../../lib/generic/Dialog';
import { IProps } from '../types';

const DeleteButton: FunctionComponent<IProps> = ({ onExecute, text }: IProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const closeDialog = () => setOpen(false);
  const openDialog = () => setOpen(true);
  return (
    <>
      <Dialog
        open={open}
        onClose={closeDialog}
        status="warning"
        message="Вы уверены?"
        closeCallback={onExecute}
      />
      <Tooltip title={text}>
        <IconButton
          color="secondary"
          onClick={openDialog}
        >
          <Delete />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default DeleteButton;
