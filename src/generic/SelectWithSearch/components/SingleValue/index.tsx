import { Typography } from '@material-ui/core';
import React, { FC, memo } from 'react';
import { IProps } from './types';

/**
 * Компонент для отображения единичного значения
 * @param {Props<ISelectItem>} selectProps пропсы селекта
 * @param {any} innerProps внутренние пропсы
 * @param {React.ReactElement<any, string | React.JSXElementConstructor<any>>} children дочерние
 * компоненты
 * @returns {JSX.Element}
 * @constructor
 */
const SingleValue: FC<IProps> = ({ selectProps, innerProps, children }: IProps): JSX.Element => (
  <Typography className={selectProps.classes.singleValue} {...innerProps}>
    {children}
  </Typography>
);

export default memo<IProps>(SingleValue);
