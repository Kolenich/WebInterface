import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';

export const styles = (theme: Theme) => createStyles<string, {}>({
  datePicker: {
    margin: theme.spacing(1),
    width: '100%',
  },
});
