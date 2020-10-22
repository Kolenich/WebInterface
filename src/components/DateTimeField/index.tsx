import DateFnsUtils from '@date-io/date-fns';
import {
  DateTimePicker,
  DateTimePickerProps,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/styles';
import { ru } from 'date-fns/locale';
import React, { FC } from 'react';
import styles from './styles';

const useStyles = makeStyles(styles);

/**
 * Компонент поля с выбором даты и времени
 * @param {DateTimePickerProps} props остальные пропсы
 * @returns {JSX.Element}
 * @constructor
 */
const DateField: FC<DateTimePickerProps> = (props) => {
  const classes = useStyles();

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ru}>
      <DateTimePicker
        autoOk
        className={classes.datePicker}
        variant="inline"
        inputVariant="outlined"
        format="dd.MM.yyyy HH:mm"
        ampm={false}
        {...props}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DateField;
