import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Menu,
  Toolbar,
  Typography,
} from '@material-ui/core';
import {
  AddCircle,
  Assessment as TasksInProcessIcon,
  AssignmentTurnedIn as CompletedTasksIcon,
  ChevronLeft,
  ExitToApp as LogOutIcon,
  Menu as MenuIcon,
  Person as AccountIcon,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import { AxiosResponse } from 'axios';
import clsx from 'clsx';
import auth from 'lib/auth';
import React, { FunctionComponent, MouseEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashBoardRouter from 'router/DashBoardRouter';
import api from '../../lib/api';
import { USERS_APP } from '../../lib/session';
import { styles } from './styles';
import { IProfileUser, IProps } from './types';

const useStyles = makeStyles(styles);

/**
 * Компонент панели
 * @constructor
 */
const DashBoard: FunctionComponent<IProps> = ({ history }: IProps): JSX.Element => {
  const classes = useStyles();

  // Переменная открытия/закрытия панели
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  // Набор данных и пользователе
  const [user, setUser] = useState<IProfileUser>({
    first_name: '',
    last_name: '',
    email: '',
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  /**
   * Функция, открывающая панель
   */
  const openDrawer = (): void => setDrawerOpen(true);

  /**
   * Функция, закрывающая панель
   */
  const closeDrawer = (): void => setDrawerOpen(false);

  /**
   * Функция, открывающая меню
   * @param currentTarget текущий элемент для привязки
   */
  const openMenu = ({ currentTarget }: MouseEvent<HTMLButtonElement>): void => (
    setAnchorEl(currentTarget)
  );

  /**
   * Функция, закрывающая меню
   */
  const closeMenu = (): void => setAnchorEl(null);

  /**
   * Функция разлогинивания
   */
  const handleLogout = (): void => {
    auth.logout().finally(redirectToMain);
  };

  /**
   * Функция редиректа на главную стараницу
   */
  const redirectToMain = (): void => history.push({ pathname: '/' });

  /**
   * Функция выгрузки данных о пользователе
   */
  const loadUser = (): void => {
    api.getContent<IProfileUser>('user-profile/user', {}, USERS_APP)
      .then(({ data }: AxiosResponse<IProfileUser>) => setUser(data))
      .catch();
  };

  const { first_name, last_name, email } = user;

  useEffect(loadUser, []);

  return (
    <Typography component="div" className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute"
              className={clsx(classes.appBar, drawerOpen && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={openDrawer}
            className={clsx(classes.menuButton, drawerOpen && classes.menuButtonHidden)}
          >
            <MenuIcon />
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
          <IconButton
            aria-haspopup="true"
            color="inherit"
            className={classes.headerMenuButton}
            aria-controls="profile-menu"
            onClick={openMenu}
          >
            <AccountIcon />
          </IconButton>
          <Menu
            id="profile-menu"
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={closeMenu}
            className={classes.headerMenu}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            disableAutoFocusItem
          >
            <Typography component="div" className={classes.profileMenuUser}>
              <Typography
                variant="h5"
                color="primary"
                style={{ marginLeft: 0, fontStyle: 'normal' }}
              >
                {first_name} {last_name}
              </Typography>
              <Typography
                className={classes.profileMenuLink}
                color="primary"
              >
                {email}
              </Typography>
            </Typography>
            <Typography component="div" className={classes.profileMenuUser}>
              <Typography
                className={classes.profileMenuLink}
                color="primary"
                onClick={handleLogout}
              >
                Выйти
                <LogOutIcon className={classes.rightIcon} />
              </Typography>
            </Typography>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !drawerOpen && classes.drawerPaperClose),
        }}
        open={drawerOpen}
      >
        <Typography component="div" className={classes.toolbarIcon}>
          <IconButton onClick={closeDrawer}>
            <ChevronLeft />
          </IconButton>
        </Typography>
        <Divider />
        <List>
          <ListSubheader inset disableGutters>Задания</ListSubheader>
          <ListItem button component={Link} to="/main/tasks/in-process" onClick={closeDrawer}>
            <ListItemIcon>
              <TasksInProcessIcon />
            </ListItemIcon>
            <ListItemText primary="В процессе" />
          </ListItem>
          <ListItem button component={Link} to="/main/tasks/completed" onClick={closeDrawer}>
            <ListItemIcon>
              <CompletedTasksIcon />
            </ListItemIcon>
            <ListItemText primary="Выполненные" />
          </ListItem>
          <ListItem button component={Link} to="/main/assign" onClick={closeDrawer}>
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
