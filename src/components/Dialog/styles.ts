import { Theme } from '@material-ui/core';
import { amber, green } from '@material-ui/core/colors';
import { createStyles } from '@material-ui/styles';

/**
 * Стили Material UI
 * @param {Theme} theme тема Material UI
 * @return {StyleRules<{}, string>} CSS-классы
 */
const styles = (theme: Theme) => createStyles({
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
  button: {
    margin: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
});

export default styles;
