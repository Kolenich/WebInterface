import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';

export const styles = (theme: Theme) => createStyles<string, {}>({
  fileUploader: {
    marginLeft: theme.spacing(1),
  },
  subTitle: {
    marginLeft: theme.spacing(1),
  },
});
