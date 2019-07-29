import { DataTypeProvider, DataTypeProviderProps } from '@devexpress/dx-react-grid';
import React from 'react';
import { dateOptions } from '../../../../lib/utils';

/**
 * Форматтер для даты без времени
 * @param value значение
 * @constructor
 */
const DateFormatter = ({ value }: DataTypeProvider.ValueFormatterProps) => (
  <>{new Date(value).toLocaleDateString('ru', dateOptions)}</>
);

/**
 * Тип данных для ячеек даты без времени
 * @param props свойства ячейки
 * @constructor
 */
const DateTypeProvider = (props: DataTypeProviderProps) => (
  <DataTypeProvider {...props} formatterComponent={DateFormatter} />
);

export default DateTypeProvider;
