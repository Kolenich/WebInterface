import { Theme, createStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

export const styles = (theme: Theme) => createStyles({
  paperMain: {
    padding: theme.spacing.unit,
    backgroundColor: grey[50],
  },
});
