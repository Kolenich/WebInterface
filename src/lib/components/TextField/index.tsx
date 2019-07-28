import { Grid, TextField as TextFieldBase, withStyles } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { validationMessages, validationMethods } from '../../validation';
import { styles } from './styles';
import { IProps } from './types';

/**
 * Компонент кастомного текстового поля
 * @param xs размер в Grid-сетке на маденьких экранах
 * @param lg размер в Grid-сетке на больших экранах
 * @param classes классы CSS
 * @param fieldName имя поля
 * @param validationType тип валидации
 * @param fieldValue значение текстового поля
 * @param props остальные пропсы
 * @constructor
 */
const TextField: FunctionComponent<IProps> =
  ({ xs, lg, classes, fieldName, validationType, fieldValue, ...props }: IProps) => {
    let valid: boolean = true;
    let helperText: string = '';
    if (validationType && fieldValue !== '') {
      if (fieldValue) {
        valid = validationMethods[validationType](fieldValue);
      }
      if (!valid) {
        helperText = validationMessages[validationType];
      }
    }
    let value: string = '';
    if (fieldValue !== null) {
      value = fieldValue;
    }
    return (
      <Grid item xs={xs} lg={lg}>
        <TextFieldBase
          className={classes.textField}
          name={fieldName as string}
          error={!valid}
          helperText={helperText}
          fullWidth
          margin="normal"
          variant="outlined"
          placeholder=""
          value={value}
          {...props}
        />
      </Grid>
    );
  };

export default withStyles(styles)(TextField);
