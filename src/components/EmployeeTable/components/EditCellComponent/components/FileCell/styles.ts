import { createStyles, Theme } from '@material-ui/core';

export const styles = (theme: Theme) => createStyles<string, {}>({
  fileUploader: {
    margin: theme.spacing(1),
    width: '100%',
  },
});
