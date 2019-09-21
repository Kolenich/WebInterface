import { Theme } from '@material-ui/core';
import { createStyles, StyleRules } from '@material-ui/styles';

export const styles = (theme: Theme): StyleRules => createStyles<string, {}>({
  datePicker: {
    margin: theme.spacing(1),
    width: '100%',
  },
});
