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
    backgroundColor: theme.palette.background.paper,
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
      backgroundColor: theme.palette.background.paper,
    },
  },
  cardImage: {
    [theme.breakpoints.up('xs')]: {
      width: 250,
    },
    [theme.breakpoints.up('sm')]: {
      width: 300,
    },
    [theme.breakpoints.up('md')]: {
      width: 350,
    },
    [theme.breakpoints.up('lg')]: {
      width: 450,
    },
  },
});

export default styles;
