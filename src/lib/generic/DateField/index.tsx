import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/styles';
import { ru } from 'date-fns/locale';
import React, { FunctionComponent } from 'react';
import { styles } from './styles';
import { IProps } from './types';

const useStyles = makeStyles(styles);

/**
 * Компонент поля с выбором даты
 * @param props остальные пропсы
 * @constructor
 */
const DateField: FunctionComponent<IProps> = (props: IProps): JSX.Element => {
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
