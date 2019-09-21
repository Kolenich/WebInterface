import { createStyles, Theme } from '@material-ui/core';
import { StyleRules } from '@material-ui/styles';

export const styles = (theme: Theme): StyleRules => createStyles<string, {}>({
  datePicker: {
    marginBottom: theme.spacing(2),
    width: '100%',
  },
});
