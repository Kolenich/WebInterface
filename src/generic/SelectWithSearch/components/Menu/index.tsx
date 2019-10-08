import { Paper } from '@material-ui/core';
import React, { FC } from 'react';
import { IProps } from './types';

/**
 * Компонент меню селекта
 * @param selectProps пропсы селекта
 * @param innerProps внутренние пропсы
 * @param children дочерние компоненты
 */
const Menu: FC<IProps> = ({ selectProps, innerProps, children }: IProps): JSX.Element => (
  <Paper square className={selectProps.classes.paper} {...innerProps}>
    {children}
  </Paper>
);

export default Menu;
