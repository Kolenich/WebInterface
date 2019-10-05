import { Theme } from '@material-ui/core';
import { amber, green } from '@material-ui/core/colors';
import { createStyles, StyleRules } from '@material-ui/styles';

const styles = (theme: Theme): StyleRules => createStyles<string, {}>({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  snackbar: {
    margin: theme.spacing(1),
  },
});

export default styles;
