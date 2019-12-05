import { Typography } from '@material-ui/core';
import React, { FC, memo } from 'react';
import { IProps } from './types';

/**
 * Компонент отображения сообщения "Данных нет"
 * @param {Props<ISelectItem>} selectProps пропсы селекта
 * @param {React.ReactElement<any, string | React.JSXElementConstructor<any>>} children дочерние
 * компонеты
 * @param {{[p: string]: any}} innerProps внутренние пропсы
 * @returns {JSX.Element}
 * @constructor
 */
const NoOptionsMessage: FC<IProps> = ({ selectProps, children, innerProps }: IProps) => (
  <Typography
    color="primary"
    className={selectProps.classes.noOptionsMessage}
    {...innerProps}
  >
    {children}
  </Typography>
);

export default memo(NoOptionsMessage);
