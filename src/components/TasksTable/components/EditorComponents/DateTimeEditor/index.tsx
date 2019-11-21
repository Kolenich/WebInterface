import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { makeStyles } from '@material-ui/styles';
import { ru } from 'date-fns/locale';
import React, { FC, memo } from 'react';
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
const DateTimeEditor: FC<IProps> = ({ onValueChange, value }: IProps) => {
  const classes = useStyles();

  /**
   * Функция обработки изменений в поле с датой
   * @param {MaterialUiPickersDate} date новая дата
   */
  const handleChange = (date: MaterialUiPickersDate) => {
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
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ru}>
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

export default memo<IProps>(DateTimeEditor);
