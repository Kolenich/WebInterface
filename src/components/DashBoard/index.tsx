import {
  AppBar,
  Button,
  Container,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { ChevronLeft, ExitToApp, Menu, Person, ShoppingCart } from '@material-ui/icons';
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
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleLogout = (): void => {
    auth.logout()
      .then((response) => {
        if (response) {
          history.push({ pathname: '/' });
        }
      })
      .catch(() => {
        history.push({ pathname: '/' });
      });
  };
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
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Панель
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
          <ListItem button component={Link} to="/main/employees">
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary="Сотрудники" />
          </ListItem>
          <ListItem button component={Link} to="/main/charts">
            <ListItemIcon>
              <ShoppingCart />
            </ListItemIcon>
            <ListItemText primary="Графики" />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <Typography component="main" className={classes.content}>
        <Typography component="div" className={classes.appBarSpacer} />
        <Container maxWidth="xl" className={classes.container}>
          <DashBoardRouter />
        </Container>
      </Typography>
    </Typography>
  );
};

export default DashBoard;
