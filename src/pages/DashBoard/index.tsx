import {
  AppBar,
  Avatar,
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
  Archive,
  AssignmentTurnedIn as CompletedTasksIcon,
  ExitToApp as LogOutIcon,
  Menu as MenuIcon,
  Person as AccountIcon,
  WatchLater as ProcessIcon,
} from '@material-ui/icons';
import { makeStyles, useTheme } from '@material-ui/styles';
import { AxiosResponse } from 'axios';
import { Context } from 'components/GlobalContext';
import { IGlobalState } from 'components/GlobalContext/types';
import DashBoardRouter from 'components/Routers/DashBoardRouter';
import api from 'lib/api';
import auth from 'lib/auth';
import { useSnackbar } from 'notistack';
import React, { FC, MouseEvent, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getErrorMessage } from '../../lib/utils';
import styles from './styles';
import { IProfileUser, IProps } from './types';

const useStyles = makeStyles(styles);

/**
 * Компонент панели
 * @param {History<LocationState>} history история в браузере
 * @param {Location<LocationState>} location текущий адрес с параметрами
 * @returns {JSX.Element}
 * @constructor
 */
const DashBoard: FC<IProps> = ({ history, location }) => {
  const classes = useStyles();
  const theme = useTheme<Theme>();

  const { getters: { dashBoardTitle } } = useContext<IGlobalState>(Context);
  const { enqueueSnackbar } = useSnackbar();

  // Переменная открытия/закрытия панели
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  // Набор данных и пользователе
  const [user, setUser] = useState<IProfileUser>({
    first_name: null,
    last_name: null,
    email: '',
    username: '',
    profile: null,
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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

  useEffect(
    () => {
      api.getContent<IProfileUser>('users/detail/', {})
        .then((response: AxiosResponse<IProfileUser>) => setUser(response.data))
        .catch((error) => enqueueSnackbar(getErrorMessage(error), { variant: 'error' }));
    },
    [enqueueSnackbar],
  );

  const drawer = (
    <>
      <Typography component="div" className={classes.toolbar}/>
      <Divider/>
      <List>
        <ListSubheader inset disableGutters>Мои задания</ListSubheader>
        <ListItem
          button
          selected={location.pathname === '/tasks/in-process'}
          component={Link}
          onClick={() => setDrawerOpen(false)}
          to="/tasks/in-process"
        >
          <ListItemIcon>
            <ProcessIcon/>
          </ListItemIcon>
          <ListItemText primary="В процессе"/>
        </ListItem>
        <ListItem
          button
          component={Link}
          onClick={() => setDrawerOpen(false)}
          selected={location.pathname === '/tasks/completed'}
          to="/tasks/completed"
        >
          <ListItemIcon>
            <CompletedTasksIcon/>
          </ListItemIcon>
          <ListItemText primary="Выполненные"/>
        </ListItem>
      </List>
      <Divider/>
      <List>
        <ListSubheader inset disableGutters>Архив</ListSubheader>
        <ListItem
          button
          component={Link}
          onClick={() => setDrawerOpen(false)}
          selected={location.pathname === '/tasks/archived'}
          to="/tasks/archived"
        >
          <ListItemIcon>
            <Archive/>
          </ListItemIcon>
          <ListItemText primary="В архиве"/>
        </ListItem>
      </List>
      <Divider/>
      <List>
        <ListSubheader inset disableGutters>Управление</ListSubheader>
        <ListItem
          button
          selected={location.pathname === '/assign'}
          onClick={() => setDrawerOpen(false)}
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
              onClick={() => setDrawerOpen(true)}
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
              onClick={(event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)}
            >
              <AccountIcon/>
            </IconButton>
            <Menu
              id="profile-menu"
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={() => setAnchorEl(null)}
              className={classes.headerMenu}
              anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
              disableAutoFocusItem
            >
              <Typography component="div" className={classes.profileMenuUser}>
                <Typography
                  component="div"
                  className={classes.accountPageLink}
                  onClick={() => history.push({ pathname: '/account' })}
                >
                  {user.profile?.avatar ? (
                    <Avatar src={user?.profile?.avatar.file as string}/>
                  ) : (
                    <Avatar><AccountIcon/></Avatar>
                  )}
                  <Typography
                    variant="h5"
                    color="primary"
                    style={{ marginLeft: 0, fontStyle: 'normal' }}
                  >
                    {user.username}
                  </Typography>
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
            onClose={() => setDrawerOpen(false)}
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

export default DashBoard;
