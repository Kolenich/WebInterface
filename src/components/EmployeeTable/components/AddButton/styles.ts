import { createStyles, Theme } from '@material-ui/core';

export const styles = (theme: Theme) => createStyles<string, any>({
  addIcon: {
    position: 'fixed',
    bottom: theme.spacing(2),
    left: theme.spacing(2),
  },
});
