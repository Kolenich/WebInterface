import { Typography } from '@material-ui/core';
import { dateTimeOptions } from 'lib/utils';
import React, { FC } from 'react';
import { IProps } from './types';

/**
 * Форматтер для даты без времени
 * @param {any} value значение
 * @returns {JSX.Element}
 * @constructor
 */
const DateTimeFormatter: FC<IProps> = ({ value }: IProps): JSX.Element => (
  <Typography component="div">
    {value
      ? new Date(value).toLocaleDateString('ru', dateTimeOptions)
      : 'Не указана'}
  </Typography>
);

export default DateTimeFormatter;
