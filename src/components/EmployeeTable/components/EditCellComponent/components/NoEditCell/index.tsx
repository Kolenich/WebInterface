import { TableCell, Typography } from '@material-ui/core';
import React, { FunctionComponent } from 'react';

const NoEditCell: FunctionComponent<{}> = (): JSX.Element => (
  <TableCell>
    <Typography component="div" />
  </TableCell>
);

export default NoEditCell;
