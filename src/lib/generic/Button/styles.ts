import { Theme } from '@material-ui/core';
import { createStyles, StyleRules } from '@material-ui/styles';

export const styles = (theme: Theme): StyleRules => createStyles<string, {}>({
  button: {
    margin: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
});
