import { Typography } from '@material-ui/core';
import React, { FC } from 'react';
import { IProps } from './types';

/**
 * Компонент для отображения единичного значения
 * @param selectProps пропсы селекта
 * @param innerProps внутренние пропсы
 * @param children дочерние компоненты
 */
const SingleValue: FC<IProps> = ({ selectProps, innerProps, children }: IProps): JSX.Element => (
  <Typography className={selectProps.classes.singleValue} {...innerProps}>
    {children}
  </Typography>
);

export default SingleValue;
