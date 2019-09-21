import { DataTypeProvider } from '@devexpress/dx-react-grid';
import { Chip } from '@material-ui/core';
import React, { FunctionComponent } from 'react';

/**
 * Форматтер для булевских значений
 * @param value значение
 * @constructor
 */
const BooleanFormatter: FunctionComponent<DataTypeProvider.ValueFormatterProps> =
  ({ value }: DataTypeProvider.ValueFormatterProps) => {
    const color: string = value
      ? '#65C888'
      : '#F26065';
    const label: string = value
      ? 'Да'
      : 'Нет';
    return <Chip label={label} style={{ background: color, textAlign: 'center', width: 50 }} />;
  };

export default BooleanFormatter;
