import { DataTypeProvider } from '@devexpress/dx-react-grid';
import { dateTimeOptions } from 'lib/utils';
import React from 'react';

/**
 * Форматтер для даты с временем
 * @param value значение
 * @constructor
 */
const DateTimeFormatter = ({ value }: DataTypeProvider.ValueFormatterProps) => (
  <>{new Date(value).toLocaleDateString('ru', dateTimeOptions)}</>
);

export default DateTimeFormatter;
