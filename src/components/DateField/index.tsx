import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, DatePickerProps, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/styles';
import { ru } from 'date-fns/locale';
import React, { FC } from 'react';
import styles from './styles';

const useStyles = makeStyles(styles);

/**
 * Компонент поля с выбором даты
 * @param {DatePickerProps} props остальные пропсы
 * @returns {JSX.Element}
 * @constructor
 */
const DateField: FC<DatePickerProps> = (props) => {
  const classes = useStyles();

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ru}>
      <DatePicker
        autoOk
        openTo="year"
        views={['year', 'month', 'date']}
        className={classes.datePicker}
        variant="inline"
        inputVariant="outlined"
        format="dd.MM.yyyy"
        {...props}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DateField;
