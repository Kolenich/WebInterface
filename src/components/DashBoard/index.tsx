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
import { AxiosError, AxiosResponse } from 'axios';
import clsx from 'clsx';
import { Context } from 'context';
import { IContext } from 'context/types';
import { withNotification } from 'decorators';
import api from 'lib/api';
import auth from 'lib/auth';
import { USERS_APP } from 'lib/session';
import { SERVER_NOT_AVAILABLE, SERVER_RESPONSES } from 'lib/utils';
import React, { FC, MouseEvent, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashBoardRouter from 'router/DashBoardRouter';
import styles from './styles';
import './styles.css';
import { IProfileUser, IProps } from './types';

const useStyles = makeStyles(styles);

/**
 * Компонент панели
 * @constructor
 */
const DashBoard: FC<IProps> = ({ history, location, openSnackbar }: IProps): JSX.Element => {
  const classes = useStyles();
  const theme: Theme = useTheme<Theme>();

  const context = useContext<IContext>(Context);

  const { dashBoardTitle } = context.getters;

  const completedSection: boolean = location.pathname === '/my-tasks/completed';
  const inProcessSection: boolean = location.pathname === '/my-tasks/in-process';
  const assignSection: boolean = location.pathname === '/assign';

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
      .then((response: AxiosResponse<IProfileUser>): void => setUser(response.data))
      .catch((error: AxiosError): void => {
        let message: string = SERVER_NOT_AVAILABLE;
        if (error.response) {
          message = SERVER_RESPONSES[error.response.status];
        }
        openSnackbar('error', message);
      });
  };

  const { first_name, last_name, email } = user;

  useEffect(loadUser, []);

  const drawer = (
    <>
      <Typography component="div" className={classes.toolbar} />
      <Divider />
      <List>
        <ListSubheader inset disableGutters>Мои задания</ListSubheader>
        <ListItem
          className={clsx(inProcessSection && classes.menuItemActive)}
          button
          component={Link}
          to="/my-tasks/in-process"
          onClick={closeDrawer}
        >
          <ListItemIcon>
            <ProcessIcon />
          </ListItemIcon>
          <ListItemText primary="В процессе" />
        </ListItem>
        <ListItem
          button
          className={clsx(completedSection && classes.menuItemActive)}
          component={Link}
          to="/my-tasks/completed"
          onClick={closeDrawer}
        >
          <ListItemIcon>
            <CompletedTasksIcon />
          </ListItemIcon>
          <ListItemText primary="Выполненные" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListSubheader inset disableGutters>Управление</ListSubheader>
        <ListItem
          button
          className={clsx(assignSection && classes.menuItemActive)}
          component={Link}
          to="/assign"
          onClick={closeDrawer}
        >
          <ListItemIcon>
            <AddCircle />
          </ListItemIcon>
          <ListItemText primary="Назначить" />
        </ListItem>
      </List>
    </>
  );

  return (
    <>
      <Typography component="div" className={classes.root}>
        <CssBaseline />
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
              <MenuIcon />
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
          <Typography component="div" className={classes.appBarSpacer} />
          <DashBoardRouter />
        </Typography>
      </Typography>
    </>
  );
};

export default withNotification<IProps>(DashBoard);
