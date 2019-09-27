import { Typography } from '@material-ui/core';
import { ISelectItem } from 'lib/generic/Select/types';
import React from 'react';
import { SingleValueProps } from 'react-select/src/components/SingleValue';

/**
 * Компонент для отображения единичного значения
 * @param selectProps пропсы селекта
 * @param innerProps внутренние пропсы
 * @param children дочерние компоненты
 */
export default ({ selectProps, innerProps, children }: SingleValueProps<ISelectItem>)
  : JSX.Element => (
  <Typography className={selectProps.classes.singleValue} {...innerProps}>
    {children}
  </Typography>
);
