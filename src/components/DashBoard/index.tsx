import {
  AppBar,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Toolbar,
  Typography,
} from '@material-ui/core';
import {
  AddCircle,
  Assessment as TasksInProcessIcon,
  AssignmentTurnedIn as CompletedTasksIcon,
  ChevronLeft,
  ExitToApp,
  Menu,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import auth from 'lib/auth';
import React, { FunctionComponent, useState } from 'react';
import { Link } from 'react-router-dom';
import DashBoardRouter from 'router/DashBoardRouter';
import { styles } from './styles';
import { IProps } from './types';

const useStyles = makeStyles(styles);

/**
 * Компонент панели
 * @constructor
 */
const DashBoard: FunctionComponent<IProps> = ({ history }: IProps): JSX.Element => {
  const classes = useStyles();

  const [open, setOpen] = useState<boolean>(false);

  const handleDrawerOpen = (): void => setOpen(true);

  const handleDrawerClose = (): void => setOpen(false);

  const handleLogout = (): void => {
    auth.logout()
      .then(redirectToMain)
      .catch(redirectToMain);
  };

  const redirectToMain = (): void => history.push({ pathname: '/' });

  return (
    <Typography component="div" className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <Menu />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Ежедневник
          </Typography>
          <Button variant="text" color="inherit" onClick={handleLogout}>
            Выйти
            <ExitToApp className={classes.rightButton} />
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <Typography component="div" className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeft />
          </IconButton>
        </Typography>
        <Divider />
        <List>
          <ListSubheader inset disableGutters>Задания</ListSubheader>
          <ListItem button component={Link} to="/main/tasks/in-process" onClick={handleDrawerClose}>
            <ListItemIcon>
              <TasksInProcessIcon />
            </ListItemIcon>
            <ListItemText primary="В процессе" />
          </ListItem>
          <ListItem button component={Link} to="/main/tasks/completed" onClick={handleDrawerClose}>
            <ListItemIcon>
              <CompletedTasksIcon />
            </ListItemIcon>
            <ListItemText primary="Выполненные" />
          </ListItem>
          <ListItem button component={Link} to="/main/assign" onClick={handleDrawerClose}>
            <ListItemIcon>
              <AddCircle />
            </ListItemIcon>
            <ListItemText primary="Назначить" />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <Typography component="main" className={classes.content}>
        <Typography component="div" className={classes.appBarSpacer} />
        <DashBoardRouter />
      </Typography>
    </Typography>
  );
};

export default DashBoard;
