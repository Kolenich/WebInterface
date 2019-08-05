import { TableFilterRow } from '@devexpress/dx-react-grid-material-ui';
import { Typography } from '@material-ui/core';
import React, { FunctionComponent } from 'react';

/**
 * Компонент ячейки для фильтрации по столбцам
 * @param props базовые пропсы
 */
const FilterCellComponent: FunctionComponent<TableFilterRow.CellProps> =
  (props: TableFilterRow.CellProps): JSX.Element => {
    const { column } = props;
    if (['button', 'avatar'].includes(column.name)) {
      return (
        <TableFilterRow.Cell {...props}>
          <Typography component="div" />
        </TableFilterRow.Cell>
      );
    }
    return <TableFilterRow.Cell {...props} />;
  };

export default FilterCellComponent;
