import { DataTypeProvider, DataTypeProviderProps } from '@devexpress/dx-react-grid';
import React from 'react';
import { ISexLabels } from './types';

const SEX_LABELS: ISexLabels = {
  male: 'Муж.',
  female: 'Жен.',
};

/**
 * Форматтер для пола
 * @param value значение
 * @constructor
 */
const SexFormatter = ({ value }: DataTypeProvider.ValueFormatterProps) => (
  <>{SEX_LABELS[value]}</>
);

/**
 * Тип данных для ячеек пола
 * @param props свойства ячейки
 * @constructor
 */
const SexTypeProvider = (props: DataTypeProviderProps) => (
  <DataTypeProvider {...props} formatterComponent={SexFormatter} />
);

export default SexTypeProvider;
