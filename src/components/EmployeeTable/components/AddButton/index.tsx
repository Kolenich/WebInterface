import { Fab, makeStyles, Tooltip } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React, { FunctionComponent } from 'react';
import { styles } from './styles';
import { IProps } from './types';

const useStyles = makeStyles(styles);

/**
 * Кнопка для добавления нового сотрудника
 * @constructor
 */
const AddButton: FunctionComponent<IProps> = ({ tooltip, text, ...props }: IProps): JSX.Element => {
  const classes = useStyles();
  return (
    <Tooltip title={tooltip}>
      <Fab
        color="primary"
        className={classes.addIcon}
        variant="extended"
        {...props}
      >
        <Add />
        {text}
      </Fab>
    </Tooltip>
  );
};

export default AddButton;
