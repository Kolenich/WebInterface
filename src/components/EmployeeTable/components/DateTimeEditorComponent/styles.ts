import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) => createStyles({
  datePicker: {
    marginBottom: theme.spacing(2),
    width: '100%',
  },
});
