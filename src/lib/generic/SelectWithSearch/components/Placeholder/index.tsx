import { Typography } from '@material-ui/core';
import React from 'react';
import { MuiPlaceholderProps } from './types';

/**
 * Подписи на селекте
 * @param selectProps пропсы селекта
 * @param innerProps внутренние пропсы
 * @param children дочерние компоненты
 */
export default ({ selectProps, innerProps = {}, children }: MuiPlaceholderProps): JSX.Element => (
  <Typography color="textSecondary" className={selectProps.classes.placeholder} {...innerProps}>
    {children}
  </Typography>
);
