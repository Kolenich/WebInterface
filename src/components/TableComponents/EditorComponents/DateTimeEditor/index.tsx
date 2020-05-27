import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { makeStyles } from '@material-ui/styles';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import React, { FC } from 'react';
import styles from './styles';
import { IProps } from './types';

const useStyles = makeStyles(styles);

/**
 * Компонент фильтрации по дате
 * @param {(newValue: any) => void} onValueChange функция, обрабатывающая изменение в поле
 * @param {any} value значение в поле
 * @returns {JSX.Element}
 * @constructor
 */
const DateTimeEditor: FC<IProps> = ({ onValueChange, value }) => {
  const classes = useStyles();

  /**
   * Функция обработки изменений в поле с датой
   * @param {MaterialUiPickersDate} date новая дата
   */
  const handleChange = (date: MaterialUiPickersDate) => {
    if (date) {
      onValueChange(format(date as Date, 'yyyy-MM-dd HH:mm:SS'));
    } else {
      onValueChange(null);
    }
  };

  let displayValue = null;
  if (value) {
    displayValue = value;
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ru}>
      <DateTimePicker
        value={displayValue}
        label="Фильтр..."
        className={classes.datePicker}
        onChange={handleChange}
        format="dd MMMM yyyy HH:mm"
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
