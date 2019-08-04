import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/core/styles';

export const styles = (theme: Theme) => createStyles<string, any>({
  fileUploader: {
    marginLeft: theme.spacing(1),
  },
  subTitle: {
    marginLeft: theme.spacing(1),
  },
});
