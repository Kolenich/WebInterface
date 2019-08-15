import { DataTypeProvider } from '@devexpress/dx-react-grid';
import React from 'react';
import { dateOptions } from '../../../../../lib/utils';

/**
 * Форматтер для даты без времени
 * @param value значение
 * @constructor
 */
const DateFormatter = ({ value }: DataTypeProvider.ValueFormatterProps) => (
  <>{new Date(value).toLocaleDateString('ru', dateOptions)}</>
);

export default DateFormatter;
