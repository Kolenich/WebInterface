import DateFnsUtils from '@date-io/date-fns';
import { Grid, makeStyles } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import ruLocale from 'date-fns/locale/ru';
import React, { FunctionComponent } from 'react';
import { styles } from './styles';
import { IProps } from './types';

const useStyles = makeStyles(styles);

/**
 * Компонент поля с выбором даты
 * @param xs размер на маленьких экранах
 * @param lg размер на больших экранах
 * @param classes стили
 * @param props остальные пропсы
 * @constructor
 */
const DateField: FunctionComponent<IProps> = ({ xs, lg, ...props }: IProps): JSX.Element => {
  const classes = useStyles();
  return (
    <Grid item xs={xs} lg={lg}>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
        <KeyboardDatePicker
          autoOk
          openTo="year"
          views={['year', 'month', 'date']}
          className={classes.datePicker}
          margin="normal"
          variant="inline"
          inputVariant="outlined"
          format="dd.MM.yyyy"
          disableFuture
          invalidDateMessage="Дата должна быть в формате ДД.ММ.ГГГГ"
          minDateMessage="Дата не должна быть меньше 01.01.1900"
          maxDateMessage="Дата не должна превышать сегодняшнее число"
          {...props}
        />
      </MuiPickersUtilsProvider>
    </Grid>
  );
};

export default DateField;
