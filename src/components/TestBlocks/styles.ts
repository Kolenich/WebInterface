import { Theme } from '@material-ui/core';
import { createStyles, StyleRules } from '@material-ui/styles';

const styles = (theme: Theme): StyleRules => createStyles<string, {}>({
  container: {
    height: window.innerHeight - 64,
  },
  card: {
    backgroundColor: theme.palette.background.paper,
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.shortest,
    }),
    overflow: 'hidden',
    '&:hover': {
      transform: 'scale(1.1)',
      cursor: 'pointer',
      backgroundColor: theme.palette.background.default,
    },
  },
  cardImage: {
    width: 500,
    height: 'auto',
  },
});

export default styles;
