import { DataTypeProvider } from '@devexpress/dx-react-grid';
import { dateOptions } from 'lib/utils';
import React, { FunctionComponent } from 'react';

/**
 * Форматтер для даты без времени
 * @param value значение
 * @constructor
 */
const DateFormatter: FunctionComponent<DataTypeProvider.ValueFormatterProps> =
  ({ value }: DataTypeProvider.ValueFormatterProps): JSX.Element => (
    <>{new Date(value).toLocaleDateString('ru', dateOptions)}</>
  );

export default DateFormatter;
