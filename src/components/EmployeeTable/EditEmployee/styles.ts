import { Theme } from '@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import amber from '@material-ui/core/colors/amber';
import green from '@material-ui/core/colors/green';

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
  button: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  statusIcon: {
    fontSize: 35,
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  errorIcon: {
    color: theme.palette.error.dark,
  },
  warningIcon: {
    color: amber[600],
  },
  successIcon: {
    color: green[600],
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },

});
