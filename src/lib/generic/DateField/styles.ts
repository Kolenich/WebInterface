import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) => createStyles<string, any>({
  datePicker: {
    margin: theme.spacing(1),
    width: '100%',
  },
});
