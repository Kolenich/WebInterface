import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  textField: {
    color: theme.palette.text.primary,
    margin: theme.spacing.unit,
  },
  datePicker: {
    marginLeft: 10,
  },
  formControl: {
    margin: theme.spacing.unit,
    width: 120,
  },
});
