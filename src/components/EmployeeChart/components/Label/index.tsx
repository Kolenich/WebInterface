import { ValueAxis } from '@devexpress/dx-react-chart-material-ui';
import React from 'react';

/**
 * Базовый компонент для указателей на оси абсцисс
 * @param symbol дополниьельный к значению символ
 * @constructor
 */
const Label = (symbol: string) => ({ text, ...props }: ValueAxis.LabelProps): JSX.Element => {
  return (
    <ValueAxis.Label
      {...props}
      text={text + symbol}
    />
  );
};

export const SaleLabel = Label(' тыс. руб.');
export const TransactionLabel = Label(' ед.');
