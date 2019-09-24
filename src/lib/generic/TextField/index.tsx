import { TextField as TextFieldBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { validationMessages, validationMethods } from 'lib/validation';
import React, { FunctionComponent } from 'react';
import { styles } from './styles';
import { IProps } from './types';

const useStyles = makeStyles(styles);

/**
 * Компонент кастомного текстового поля
 * @param validationType тип валидации
 * @param fieldValue значение текстового поля
 * @param props остальные пропсы
 * @param onError колбэк, срабатывающий при ошибке валидации
 * @constructor
 */
const TextField: FunctionComponent<IProps> =
  ({ validationType, fieldValue, onError, ...props }: IProps): JSX.Element => {
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
        if (onError) {
          onError();
        }
      }
    }
    return (
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
    );
  };

export default TextField;
