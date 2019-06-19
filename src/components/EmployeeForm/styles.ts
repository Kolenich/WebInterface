import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) => createStyles({
  textField: {
    color: theme.palette.text.primary,
    margin: theme.spacing(1),
  },
  datePicker: {
    marginLeft: theme.spacing(1),
    width: '100%',
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
  },
  button: {
    margin: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  cancelButton: {
    float: 'right',
    padding: 0,
  },
});
