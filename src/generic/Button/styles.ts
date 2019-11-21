import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';

const styles = (theme: Theme) => createStyles({
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
});

export default styles;
