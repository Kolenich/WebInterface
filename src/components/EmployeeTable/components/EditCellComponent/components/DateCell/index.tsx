import DateFnsUtils from '@date-io/date-fns';
import { TableCell } from '@material-ui/core';
import { DatePicker, MaterialUiPickersDate, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ru } from 'date-fns/locale';
import moment from 'moment';
import React, { FunctionComponent } from 'react';
import { IProps } from '../../types';

/**
 * Компонент фильтрации по дате
 * @param onValueChange функция, обрабатывающая изменение в поле
 * @param value значение в поле
 * @param column объект столбца
 * @param readOnly объект столбца
 * @constructor
 */
const DateCell: FunctionComponent<IProps> =
  ({ onValueChange, value, column, disabled }: IProps): JSX.Element => {
    const handleChange = (date: MaterialUiPickersDate): void => {
      let dateValue = null;
      if (date) {
        dateValue = moment(date).format('YYYY-MM-DD');
      }
      onValueChange(dateValue);
    };
    let displayValue = null;
    if (value) {
      displayValue = value;
    }
    return (
      <TableCell>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ru}>
          <DatePicker
            disabled={disabled}
            label={column.title}
            value={displayValue}
            onChange={handleChange}
            disableFuture
            format="dd MMMM yyyy"
            animateYearScrolling
            clearable
            okLabel="Ок"
            cancelLabel="Отмена"
            clearLabel="Очистить"
          />
        </MuiPickersUtilsProvider>
      </TableCell>
    );
  };

export default DateCell;
