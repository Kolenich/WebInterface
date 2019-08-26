import { ValueAxis } from '@devexpress/dx-react-chart-material-ui';
import React from 'react';

/**
 * Базовый компонент для указателей на оси абсцисс
 * @param symbol дополнительный к значению символ
 * @constructor
 */
const LabelComponent = (symbol: string) => ({ text, ...props }: ValueAxis.LabelProps):
  JSX.Element => {
  return (
    <ValueAxis.Label
      {...props}
      text={`${text} ${symbol}`}
    />
  );
};

export default LabelComponent;
