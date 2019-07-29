import { Filter } from '@devexpress/dx-react-grid';
import { TableFilterRow } from '@devexpress/dx-react-grid-material-ui';
import {
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  withStyles,
} from '@material-ui/core';
import React, { ChangeEvent, useState } from 'react';
import { ISelectElement, Sex } from '../../../../lib/types';
import { styles } from './styles';
import { IProps } from './types';

const sexParams: string[] = ['Муж.', 'Жен.'];

/**
 * Компонент ячейуи для фильтрации по столбцам
 * @param classes стили
 * @param props базовые пропсы
 */
const FilterCellComponent = ({ classes, ...props }: IProps) => {
  const [sex, setSex] = useState('');
  const { column, onFilter } = props;
  if (column.name !== 'sex') {
    if (column.name === 'button' || column.name === 'avatar') {
      return (
        <TableFilterRow.Cell {...props} >
          <Typography component="div" />
        </TableFilterRow.Cell>
      );
    }
    return (
      <TableFilterRow.Cell {...props} />
    );
  }
  return (
    <TableFilterRow.Cell{...props}>
      <FormControl fullWidth>
        <InputLabel>Фильтр...</InputLabel>
        <Select
          className={classes.sexSelect}
          value={sex}
          input={<Input />}
          onChange={
            (event: ChangeEvent<ISelectElement>) => {
              let value: string = '';
              const columnName: string = column.name;
              const operation: string = 'equal';
              if (event.target.value === 'Муж.') {
                value = 'male';
              }
              if (event.target.value === 'Жен.') {
                value = 'female';
              }
              const filter: Filter = { value, columnName, operation };
              onFilter(filter);
              setSex(event.target.value as Sex);
            }
          }
        >
          <MenuItem value=""><em>Сброс</em></MenuItem>
          {sexParams.map((value: string) => (
            <MenuItem key={value} value={value}>{value}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </TableFilterRow.Cell>
  );
};

export default withStyles(styles)(FilterCellComponent);
