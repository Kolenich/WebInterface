import { Button as ButtonBase } from '@material-ui/core';
import { Add, Cancel, Delete, Done, Save, Update } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import React, { FC } from 'react';
import { styles } from './styles';
import { IProps } from './types';

const useStyles = makeStyles(styles);

/**
 * Кастомная кнопка
 * @param text - текст кнопки
 * @param icon - иконка кнопки
 * @param props
 * @constructor
 */
const Button: FC<IProps> = ({ text, icon, ...props }: IProps): JSX.Element => {
  const classes = useStyles();
  return (
    <ButtonBase
      variant="contained"
      {...props}
    >
      {text}
      {icon === 'save' &&
      <Save className={classes.rightIcon} />}
      {icon === 'add' &&
      <Add className={classes.rightIcon} />}
      {icon === 'confirm' &&
      <Done className={classes.rightIcon} />}
      {icon === 'update' &&
      <Update className={classes.rightIcon} />}
      {icon === 'delete' &&
      <Delete className={classes.rightIcon} />}
      {icon === 'cancel' &&
      <Cancel className={classes.rightIcon} />}
    </ButtonBase>
  );
};

export default Button;
