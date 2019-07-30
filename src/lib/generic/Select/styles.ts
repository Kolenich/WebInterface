import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) => createStyles({
  formControl: {
    margin: theme.spacing(1),
    width: '100%',
  },
});
