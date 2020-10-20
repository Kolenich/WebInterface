import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Menu,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core';
import {
  AddCircle,
  AssignmentTurnedIn as CompletedTasksIcon,
  ExitToApp as LogOutIcon,
  Menu as MenuIcon,
  Person as AccountIcon,
  WatchLater as ProcessIcon,
} from '@material-ui/icons';
import { makeStyles, useTheme } from '@material-ui/styles';
import { AxiosResponse } from 'axios';
import { withDialog } from 'components';
import { Context } from 'components/GlobalContext';
import { IGlobalState } from 'components/GlobalContext/types';
import DashBoardRouter from 'components/Routers/DashBoardRouter';
import api from 'lib/api';
import auth from 'lib/session';
import { useMountEffect } from 'lib/utils';
import React, { FC, MouseEvent, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles';
import { IProfileUser, IProps } from './types';

const useStyles = makeStyles(styles);

/**
 * Компонент панели
 * @param {History<LocationState>} history история в браузере
 * @param {Location<LocationState>} location текущий адрес с параметрами
 * @param {(error: AxiosError, by: ("dialog" | "snackbar")) => void} showError функция вызова ошибки
 * @returns {JSX.Element}
 * @constructor
 */
const DashBoard: FC<IProps> = ({ history, location, showError }) => {
  const classes = useStyles();
  const theme = useTheme<Theme>();

  const { getters: { dashBoardTitle } } = useContext<IGlobalState>(Context);

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
  const openDrawer = () => setDrawerOpen(true);

  /**
   * Функция, закрывающая панель
   */
  const closeDrawer = () => setDrawerOpen(false);

  /**
   * Функция, открывающая меню
   * @param {React.MouseEvent<HTMLButtonElement>} event текущий элемент для привязки
   */
  const openMenu = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);

  /**
   * Функция, закрывающая меню
   */
  const closeMenu = () => setAnchorEl(null);

  /**
   * Функция разлогинивания
   */
  const handleLogout = async () => {
    try {
      await auth.logout();
    } finally {
      history.push({ pathname: '/' });
    }
  };

  /**
   * Функция выгрузки данных о пользователе
   */
  const loadUser = () => {
    api.getContent<IProfileUser>('users/detail', {})
      .then((response: AxiosResponse<IProfileUser>) => setUser(response.data))
      .catch(showError);
  };

  useMountEffect(loadUser);

  const drawer = (
    <>
      <Typography component="div" className={classes.toolbar}/>
      <Divider/>
      <List>
        <ListSubheader inset disableGutters>Мои задания</ListSubheader>
        <ListItem
          button
          selected={location.pathname === '/my-tasks/in-process'}
          component={Link}
          onClick={closeDrawer}
          to="/my-tasks/in-process"
        >
          <ListItemIcon>
            <ProcessIcon/>
          </ListItemIcon>
          <ListItemText primary="В процессе"/>
        </ListItem>
        <ListItem
          button
          component={Link}
          onClick={closeDrawer}
          selected={location.pathname === '/my-tasks/completed'}
          to="/my-tasks/completed"
        >
          <ListItemIcon>
            <CompletedTasksIcon/>
          </ListItemIcon>
          <ListItemText primary="Выполненные"/>
        </ListItem>
      </List>
      <Divider/>
      <List>
        <ListSubheader inset disableGutters>Управление</ListSubheader>
        <ListItem
          button
          selected={location.pathname === '/assign'}
          onClick={closeDrawer}
          component={Link}
          to="/assign"
        >
          <ListItemIcon>
            <AddCircle/>
          </ListItemIcon>
          <ListItemText primary="Назначить"/>
        </ListItem>
      </List>
    </>
  );

  return (
    <>
      <Typography component="div" className={classes.root}>
        <CssBaseline/>
        <AppBar
          position="absolute"
          className={classes.appBar}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={openDrawer}
              className={classes.navIconHide}
            >
              <MenuIcon/>
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              {dashBoardTitle}
            </Typography>
            <IconButton
              aria-haspopup="true"
              color="inherit"
              className={classes.headerMenuButton}
              aria-controls="profile-menu"
              onClick={openMenu}
            >
              <AccountIcon/>
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
                  {user.first_name} {user.last_name}
                </Typography>
                <Typography
                  className={classes.profileMenuLink}
                  color="primary"
                  component="a"
                  href={`mailto:${user.email}`}
                >
                  {user.email}
                </Typography>
              </Typography>
              <Typography component="div" className={classes.profileMenuUser}>
                <Typography
                  className={classes.profileMenuLink}
                  color="primary"
                  onClick={handleLogout}
                >
                  Выйти
                  <LogOutIcon className={classes.rightIcon}/>
                </Typography>
              </Typography>
            </Menu>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl'
              ? 'right'
              : 'left'}
            classes={{
              paper: classes.drawerPaper,
              root: classes.drawerRoot,
            }}
            onClose={closeDrawer}
            open={drawerOpen}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
              root: classes.drawerRoot,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Typography component="main" className={classes.content}>
          <Typography component="div" className={classes.appBarSpacer}/>
          <DashBoardRouter/>
        </Typography>
      </Typography>
    </>
  );
};

export default withDialog(DashBoard);
