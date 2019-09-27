import DateFnsUtils from '@date-io/date-fns';
import {
  DateTimePicker,
  MaterialUiPickersDate,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/styles';
import ruLocale from 'date-fns/locale/ru';
import React, { FC } from 'react';
import { styles } from './styles';
import { IProps } from './types';

const useStyles = makeStyles(styles);

/**
 * Компонент фильтрации по дате
 * @param onValueChange функция, обрабатывающая изменение в поле
 * @param value значение в поле
 * @constructor
 */
const DateTimeEditor: FC<IProps> = ({ onValueChange, value }: IProps): JSX.Element => {
  const classes = useStyles();
  const handleChange = (date: MaterialUiPickersDate): void => {
    let value: null | Date = null;
    if (date) {
      value = date;
    }
    onValueChange(value);
  };
  let displayValue = null;
  if (value) {
    displayValue = value;
  }
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
      <DateTimePicker
        value={displayValue}
        label="Фильтр..."
        className={classes.datePicker}
        onChange={handleChange}
        format="dd MMMM yyyy HH:mm"
        disablePast
        animateYearScrolling
        clearable
        okLabel="Ок"
        cancelLabel="Отмена"
        clearLabel="Очистить"
        ampm={false}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DateTimeEditor;
