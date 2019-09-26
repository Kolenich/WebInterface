import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/styles';
import { ru } from 'date-fns/locale';
import React, { FunctionComponent } from 'react';
import { styles } from './styles';
import { IProps } from './types';

const useStyles = makeStyles(styles);

/**
 * Компонент поля с выбором даты
 * @param props остальные пропсы
 * @param withTime флаг "С временем"
 * @constructor
 */
const DateField: FunctionComponent<IProps> = ({ withTime, ...props }: IProps): JSX.Element => {
  const classes = useStyles();
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ru}>
      {withTime
        ?
        <DateTimePicker
          autoOk
          className={classes.datePicker}
          variant="inline"
          inputVariant="outlined"
          format="dd.MM.yyyy HH:mm"
          ampm={false}
          disablePast
          {...props}
        />
        :
        <DatePicker
          autoOk
          openTo="year"
          views={['year', 'month', 'date']}
          className={classes.datePicker}
          variant="inline"
          inputVariant="outlined"
          format="dd.MM.yyyy"
          disablePast
          {...props}
        />}
    </MuiPickersUtilsProvider>
  );
};

export default DateField;
