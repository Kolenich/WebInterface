import { Theme } from '@material-ui/core';
import { createStyles, StyleRules } from '@material-ui/styles';

const styles = (theme: Theme): StyleRules => createStyles<string, {}>({
  itemSelected: {
    backgroundColor: theme.palette.grey.A100,
  },
});

export default styles;
