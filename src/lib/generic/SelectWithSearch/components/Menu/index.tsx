import { Paper } from '@material-ui/core';
import { ISelectItem } from 'lib/generic/Select/types';
import React from 'react';
import { MenuProps } from 'react-select/src/components/Menu';

/**
 * Компонент меню селекта
 * @param selectProps пропсы селекта
 * @param innerProps внутренние пропсы
 * @param children дочерние компоненты
 */
export default ({ selectProps, innerProps, children }: MenuProps<ISelectItem>): JSX.Element => (
  <Paper square className={selectProps.classes.paper} {...innerProps}>
    {children}
  </Paper>
);
