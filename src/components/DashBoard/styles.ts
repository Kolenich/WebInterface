import { Theme } from '@material-ui/core';
import { createStyles, StyleRules } from '@material-ui/styles';

const drawerWidth: number = 200;

export const styles = (theme: Theme): StyleRules => createStyles<string, {}>({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: theme.spacing(3), // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  rightButton: {
    marginLeft: theme.spacing(1),
  },
  headerMenuButton: {
    marginLeft: theme.spacing(2),
    padding: theme.spacing(0.5),
  },
  headerMenu: {
    marginTop: theme.spacing(7),
    horizontal: 'right',
  },
  profileMenuUser: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
  },
  profileMenuLink: {
    fontSize: 16,
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    '&:hover': {
      cursor: 'pointer',
      color: theme.palette.primary.dark,
    },
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  menuItemActive: {
    backgroundColor: theme.palette.grey.A100,
  },
});
