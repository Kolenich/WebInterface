import { DataTypeProvider, DataTypeProviderProps } from '@devexpress/dx-react-grid';
import React from 'react';
import { dateTimeOptions } from '../../../../lib/utils';

/**
 * Форматтер для даты с временем
 * @param value значение
 * @constructor
 */
const DateTimeFormatter = ({ value }: DataTypeProvider.ValueFormatterProps) => (
  <>{new Date(value).toLocaleDateString('ru', dateTimeOptions)}</>
);

/**
 * Тип данных для ячеек даты с временем
 * @param props свойства ячейки
 * @constructor
 */
const DateTimeTypeProvider = (props: DataTypeProviderProps) => (
  <DataTypeProvider {...props} formatterComponent={DateTimeFormatter} />
);

export default DateTimeTypeProvider;
