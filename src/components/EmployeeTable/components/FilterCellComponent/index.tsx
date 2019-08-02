import { TableFilterRow } from '@devexpress/dx-react-grid-material-ui';
import React, { FunctionComponent } from 'react';

/**
 * Компонент ячейки для фильтрации по столбцам
 * @param props базовые пропсы
 */
const FilterCellComponent: FunctionComponent<TableFilterRow.CellProps> =
  (props: TableFilterRow.CellProps) => {
    const { column } = props;
    if (['button', 'avatar'].includes(column.name)) {
      return (
        <th />
      );
    }
    return <TableFilterRow.Cell {...props} />;
  };

export default FilterCellComponent;
