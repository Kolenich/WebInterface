import { MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { ISelectItem } from 'lib/generic/Select/types';
import React from 'react';
import { OptionProps } from 'react-select/src/components/Option';
import { styles } from './styles';

const useStyles = makeStyles(styles);

/**
 * Компонент выбора в селекте
 * @param innerRef внутрення ссылка DOM
 * @param isFocused флаг на фокус
 * @param isSelected флаг на выбор
 * @param innerProps внутренние пропсы
 * @param children дочерние компоненты
 */
export default ({ innerRef, isFocused, isSelected, innerProps, children }: OptionProps<ISelectItem>)
  : JSX.Element => {
  const classes = useStyles();

  return (
    <MenuItem
      ref={innerRef}
      selected={isFocused}
      component="div"
      className={clsx(isSelected && classes.itemSelected)}
      {...innerProps}
    >
      {children}
    </MenuItem>
  );
};
