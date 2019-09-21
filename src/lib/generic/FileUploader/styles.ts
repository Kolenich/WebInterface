import { Theme } from '@material-ui/core';
import { createStyles, StyleRules } from '@material-ui/styles';

export const styles = (theme: Theme): StyleRules => createStyles<string, {}>({
  fileUploader: {
    marginLeft: theme.spacing(1),
  },
  subTitle: {
    marginLeft: theme.spacing(1),
  },
});
