import { Grid, TextField as TextFieldBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { FunctionComponent } from 'react';
import { validationMessages, validationMethods } from '../../validation';
import { styles } from './styles';
import { IProps } from './types';

const useStyles = makeStyles(styles);

/**
 * Компонент кастомного текстового поля
 * @param xs размер в Grid-сетке на маденьких экранах
 * @param lg размер в Grid-сетке на больших экранах
 * @param classes классы CSS
 * @param validationType тип валидации
 * @param fieldValue значение текстового поля
 * @param props остальные пропсы
 * @constructor
 */
const TextField: FunctionComponent<IProps> =
  ({ xs, lg, validationType, fieldValue, ...props }: IProps): JSX.Element => {
    const classes = useStyles();
    let valid: boolean = true;
    let helperText: string = '';
    let value: string = '';
    if (validationType && fieldValue !== '') {
      if (fieldValue) {
        valid = validationMethods[validationType](fieldValue);
        value = fieldValue;
      }
      if (!valid) {
        helperText = validationMessages[validationType];
      }
    }
    return (
      <Grid item xs={xs} lg={lg}>
        <TextFieldBase
          className={classes.textField}
          error={!valid}
          helperText={helperText}
          fullWidth
          margin="normal"
          variant="outlined"
          value={value}
          {...props}
        />
      </Grid>
    );
  };

export default TextField;
