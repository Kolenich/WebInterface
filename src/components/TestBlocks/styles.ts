import { Theme } from '@material-ui/core';
import { createStyles, StyleRules } from '@material-ui/styles';

const styles = (theme: Theme): StyleRules => createStyles<string, {}>({
  container: {
    height: window.innerHeight - 64,
  },
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  card: {
    borderRadius: 10,
    width: 350,
    height: 400,
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows[0],
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflow: 'hidden',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: theme.shadows[10],
      cursor: 'pointer',
    },
  },
  completed: {
    backgroundColor: '#268e1c',
  },
  inCompleted: {
    backgroundColor: '#742819',
  },
});

export default styles;
