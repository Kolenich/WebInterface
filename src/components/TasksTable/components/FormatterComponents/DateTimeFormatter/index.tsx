import { DataTypeProvider } from '@devexpress/dx-react-grid';
import { dateTimeOptions } from 'lib/utils';
import React, { FunctionComponent } from 'react';

/**
 * Форматтер для даты без времени
 * @param value значение
 * @constructor
 */
const DateTimeFormatter: FunctionComponent<DataTypeProvider.ValueFormatterProps> =
  ({ value }: DataTypeProvider.ValueFormatterProps): JSX.Element => (
    <>
      {value
        ? new Date(value).toLocaleDateString('ru', dateTimeOptions)
        : 'Не указана'}
    </>
  );

export default DateTimeFormatter;
