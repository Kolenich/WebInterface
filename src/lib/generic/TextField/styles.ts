import { Theme } from '@material-ui/core';
import { createStyles, StyleRules } from '@material-ui/styles';

export const styles = (theme: Theme): StyleRules => createStyles<string, {}>({
  textField: {
    color: theme.palette.text.primary,
    margin: theme.spacing(1),
  },
});
