import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) => createStyles({
  addIcon: {
    margin: theme.spacing.unit,
  },
  rowCursor: {
    cursor: 'pointer',
  },
});
