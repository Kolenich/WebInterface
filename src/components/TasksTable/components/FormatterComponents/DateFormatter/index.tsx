import { DataTypeProvider } from '@devexpress/dx-react-grid';
import { dateOptions } from 'lib/utils';
import React from 'react';

/**
 * Форматтер для даты без времени
 * @param value значение
 * @constructor
 */
const DateFormatter = ({ value }: DataTypeProvider.ValueFormatterProps) => (
  <>{new Date(value).toLocaleDateString('ru', dateOptions)}</>
);

export default DateFormatter;
