import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) => createStyles({
  textField: {
    color: theme.palette.text.primary,
    margin: theme.spacing.unit,
  },
  datePicker: {
    marginLeft: theme.spacing.unit,
    width: '100%',
  },
  formControl: {
    margin: theme.spacing.unit,
    width: '100%',
  },
  button: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  cancelButton: {
    float: 'right',
    padding: 0,
  },
});
