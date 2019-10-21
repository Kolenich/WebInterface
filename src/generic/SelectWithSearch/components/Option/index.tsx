import { MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, { FC } from 'react';
import styles from './styles';
import { IProps } from './types';

const useStyles = makeStyles(styles);

/**
 * Компонент выбора в селекте
 * @param {((instance: (any | null)) => void) | React.RefObject<any> | null} innerRef внутрення
 * ссылка DOM
 * @param {boolean} isFocused флаг на фокус
 * @param {boolean} isSelected флаг на выбор
 * @param {InnerProps} innerProps внутренние пропсы
 * @param {React.ReactElement<any, string | React.JSXElementConstructor<any>>} children дочерние
 * компоненты
 * @returns {JSX.Element}
 * @constructor
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
