import { Theme } from '@material-ui/core';
import { createStyles, StyleRules } from '@material-ui/styles';

const styles = (theme: Theme): StyleRules => createStyles<string, {}>({
  textField: {
    marginBottom: theme.spacing(2),
  },
});

export default styles;
