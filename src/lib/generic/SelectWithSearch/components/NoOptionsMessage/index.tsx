import { Typography } from '@material-ui/core';
import React, { FC } from 'react';
import { IProps } from './types';

/**
 * Компонент отображения сообщения "Данных нет"
 * @param selectProps пропсы селекта
 * @param children дочерние компонеты
 * @param innerProps внутренние пропсы
 */
const NoOptionsMessage: FC<IProps> =
  ({ selectProps, children, innerProps }: IProps): JSX.Element => (
    <Typography
      color="primary"
      className={selectProps.classes.noOptionsMessage}
      {...innerProps}
    >
      {children}
    </Typography>
  );

export default NoOptionsMessage;
