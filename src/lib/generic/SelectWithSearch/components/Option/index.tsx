import { MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, { FC } from 'react';
import { styles } from './styles';
import { IProps } from './types';

const useStyles = makeStyles(styles);

/**
 * Компонент выбора в селекте
 * @param innerRef внутрення ссылка DOM
 * @param isFocused флаг на фокус
 * @param isSelected флаг на выбор
 * @param innerProps внутренние пропсы
 * @param children дочерние компоненты
 */
const Option: FC<IProps> =
  ({ innerRef, isFocused, isSelected, innerProps, children }: IProps): JSX.Element => {
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

export default Option;
