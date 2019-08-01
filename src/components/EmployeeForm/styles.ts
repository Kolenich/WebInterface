import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) => createStyles({
  cancelButton: {
    float: 'right',
    padding: 0,
  },
  avatar: {
    width: 100,
    height: 100,
  },
  gridItem: {
    margin: theme.spacing(1),
  },
});
