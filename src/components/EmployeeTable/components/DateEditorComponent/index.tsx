import DateFnsUtils from '@date-io/date-fns';
import { withStyles } from '@material-ui/core';
import { DatePicker, MaterialUiPickersDate, MuiPickersUtilsProvider } from '@material-ui/pickers';
import ruLocale from 'date-fns/locale/ru';
import moment from 'moment';
import React, { FunctionComponent } from 'react';
import { styles } from './styles';
import { IProps } from './types';

/**
 * Компонент фильтрации по дате
 * @param classes стили
 * @param onValueChange функция, обрабатывающая изменение в поле
 * @param value значение в поле
 * @param props остальные пропсы
 * @constructor
 */
const DateEditorComponent: FunctionComponent<IProps> =
  ({ classes, onValueChange, value, ...props }: IProps): JSX.Element => {
    const handleChange = (date: MaterialUiPickersDate) => {
      let value: null | string = null;
      if (date) {
        value = moment(date as Date).format('YYYY-MM-DD');
      }
      onValueChange(value);
    };
    let displayValue = null;
    if (value) {
      displayValue = value;
    }
    console.log(displayValue);
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
        <DatePicker
          {...props}
          value={displayValue}
          label="Фильтр..."
          className={classes.datePicker}
          onChange={handleChange}
          format="dd MMMM yyyy"
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

export default withStyles(styles)(DateEditorComponent);
