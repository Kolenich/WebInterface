import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core';
import {
  DateTimePicker,
  MaterialUiPickersDate,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import ruLocale from 'date-fns/locale/ru';
import React, { FunctionComponent } from 'react';
import { styles } from './styles';
import { IProps } from './types';

const useStyles = makeStyles(styles);

/**
 * Компонент фильтрации по дате/времени
 * @param onValueChange функция, обрабатывающая изменение в поле
 * @param value значение в поле
 * @param props остальные пропсы
 * @constructor
 */
const DateTimeEditorComponent: FunctionComponent<IProps> =
  ({ onValueChange, value, ...props }: IProps): JSX.Element => {
    const classes = useStyles();
    const handleChange = (date: MaterialUiPickersDate) => {
      onValueChange(date);
    };
    let displayValue = null;
    if (value) {
      displayValue = value;
    }
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
        <DateTimePicker
          {...props}
          hideTabs
          ampm={false}
          value={displayValue}
          label="Фильтр..."
          className={classes.datePicker}
          onChange={handleChange}
          format="dd MMMM yyyy, HH:mm"
          disableFuture
          animateYearScrolling
          clearable
          okLabel="Ок"
          cancelLabel="Отмена"
          clearLabel="Очистить"
        />
      </MuiPickersUtilsProvider>
    );
  };

export default DateTimeEditorComponent;
