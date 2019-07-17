import { Grid, TextField as TextFieldBase, withStyles } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { validationMessages, validationMethods } from '../../validation';
import { styles } from './styles';
import { IProps } from './types';

const TextField: FunctionComponent<IProps> =
  ({ xs, classes, fieldName, validationType, fieldValue, ...props }: IProps) => {
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
      <Grid item xs={xs}>
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
