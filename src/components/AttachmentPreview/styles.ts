import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';

const styles = (theme: Theme) => createStyles({
  preview: {
    '&:hover': {
      color: theme.palette.primary.dark,
      textDecoration: 'none',
    },
  },
});

export default styles;
