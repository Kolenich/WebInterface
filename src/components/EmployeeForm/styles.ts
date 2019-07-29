import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) => createStyles({
  textField: {
    color: theme.palette.text.primary,
    margin: theme.spacing(1),
  },
  datePicker: {
    margin: theme.spacing(1),
    width: '100%',
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
  },

  cancelButton: {
    float: 'right',
    padding: 0,
  },
});
