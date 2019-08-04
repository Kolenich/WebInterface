import { createStyles, Theme } from '@material-ui/core';

export const styles = (theme: Theme) => createStyles<string, any>({
  datePicker: {
    marginBottom: theme.spacing(2),
    width: '100%',
  },
});
