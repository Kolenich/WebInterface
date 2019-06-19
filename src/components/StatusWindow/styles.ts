import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';
import { amber, green } from '@material-ui/core/colors';

export const styles = (theme: Theme) => createStyles({
  statusIcon: {
    fontSize: 35,
    opacity: 0.9,
    marginRight: theme.spacing(1),
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
  button: {
    margin: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
});
