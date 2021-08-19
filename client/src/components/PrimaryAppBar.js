import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  Grid,
  List,
  Icon,
  useScrollTrigger,
} from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MenuIcon from '@material-ui/icons/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import SearchIcon from '@material-ui/icons/Search';
import { NavLink, useHistory, useRouteMatch } from 'react-router-dom';
import { useStyles } from './Toolbox/cssTheme';
import { useAuth } from '../Contexts/AuthContext';
// import HandleSearch from "./HandleSearch";
import { useSearch } from '../Contexts/SearchContext';
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import SpeakerGroupTwoToneIcon from '@material-ui/icons/SpeakerGroup';
import VpnKeyTwoToneIcon from '@material-ui/icons/VpnKeyTwoTone';
export default function PrimaryAppBar(props) {
  const classes = useStyles();
  const { isUser, setIsUser, token, userInfo, setUserInfo } = useAuth();
  const { searchTerm, setSearchTerm } = useSearch();
  console.log(`isUser`, isUser);
  const searchRef = useRef();
  let { path, url } = useRouteMatch();
  const history = useHistory();
  const [drawerState, setDrawerState] = useState(false);

  // const handleLogout = () => {
  //   console.log(`userInfo._id`, userInfo._id);
  //   const request = {
  //     method: "post",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ _id: userInfo._id }),
  //   };
  //   fetch("http://localhost:5000/users/logout/", request)
  //     .then((thing8) => {
  //       console.log(90909, thing8);
  //       setUserInfo(null);
  //       setIsUser(false);
  //       window.localStorage.removeItem("token");
  //       // history.push("/");
  //       window.location.reload();
  //     })
  //     .catch((error) => console.error(error));
  // };
  const handleLogout = async () => {
    const user = { _id: userInfo._id };
    setUserInfo(null);
    setIsUser(false);
    // setLoading(true);
    window.localStorage.removeItem('token');
    history.push('/');
    await axios
      .post('http://localhost:5000/users/logout', user)
      .then((u8u) => console.log('u8u', u8u.data));
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setDrawerState(open);
  };
  const list = (anchor) => (
    <div
      // className={classes.list}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}>
      <List>
        <NavLink
          className={classes.navlink}
          to='/'
          isActive={(match, location) => {
            if (!match) {
              return false;
            }
            const eventID = parseInt(match.params.eventID);
            return !isNaN(eventID) && eventID % 2 === 1;
          }}>
          <ListItem button key={'home'}>
            <ListItemIcon>
              <HomeTwoToneIcon />
            </ListItemIcon>
            <ListItemText primary={'home'} />
          </ListItem>{' '}
        </NavLink>
        <NavLink
          className={classes.navlink}
          to='/parties'
          isActive={(match, location) => {
            if (!match) {
              return false;
            }
            const eventID = parseInt(match.params.eventID);
            return !isNaN(eventID) && eventID % 2 === 1;
          }}>
          <ListItem button key={'parties'}>
            <ListItemIcon>
              {/* <IconButton aria-label='back' onClick={history.goBack}>
                <FontAwesomeIcon icon={faBackward} />
              </IconButton> */}
              <SpeakerGroupTwoToneIcon />
            </ListItemIcon>
            <ListItemText primary={'parties'} />
          </ListItem>{' '}
        </NavLink>
        {!isUser && (
          <NavLink
            className={classes.navlink}
            to='/signup'
            isActive={(match, location) => {
              if (!match) {
                return false;
              }
              const eventID = parseInt(match.params.eventID);
              return !isNaN(eventID) && eventID % 2 === 1;
            }}>
            <ListItem button key={'signup'}>
              <ListItemIcon>
                <FontAwesomeIcon icon={faUserPlus} />
              </ListItemIcon>
              <ListItemText primary={'Sign up'} />
            </ListItem>
          </NavLink>
        )}
        {!isUser && (
          <NavLink className={classes.navlink} to='/signin'>
            <ListItem button key={'signin'}>
              <ListItemIcon>
                <VpnKeyTwoToneIcon />
              </ListItemIcon>
              <ListItemText primary={'Sign in'} />
            </ListItem>{' '}
          </NavLink>
        )}
      </List>

      <Divider />
      {userInfo && (
        <List>
          <NavLink to={`/${userInfo.username}`} className={classes.navlink}>
            <ListItem button key={'favourites'}>
              <ListItemIcon>
                <FavoriteIcon />
              </ListItemIcon>
              <ListItemText primary={'My Parties'} />
            </ListItem>
          </NavLink>{' '}
          <NavLink
            className={classes.navlink}
            to={`/${userInfo.username}/manageprofile`}
            isActive={(match, location) => {
              if (!match) {
                return false;
              }
              const eventID = parseInt(match.params.eventID);
              return !isNaN(eventID) && eventID % 2 === 1;
            }}>
            <ListItem button key={'dashboard'}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={'Manage profile'} />
            </ListItem>
          </NavLink>
          <NavLink className={classes.navlink} to='/submitevent'>
            <ListItem button key={'SubmitAParty'}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={'Submit a Party'} />
            </ListItem>{' '}
          </NavLink>
          <ListItem button key={'logout'} onClick={handleLogout}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={'Logout'} />
          </ListItem>
        </List>
      )}
    </div>
  );

  function ElevationScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
      target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  }
  const handleSearch = (event) => {
    event.preventDefault();
    setSearchTerm(searchRef.current.value);
  };
  useEffect(() => {
    console.log(userInfo);
  }, []);
  return (
    <div className={classes.NavRoot}>
      <ElevationScroll {...props}>
        <AppBar position='fixed' className={classes.AppBar2}>
          <Toolbar>
            <Grid container align='right'>
              <IconButton
                edge='start'
                className={classes.menuButton}
                color='inherit'
                aria-label='open drawer'
                onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>{' '}
              <Drawer
                anchor={'left'}
                open={drawerState}
                onClose={toggleDrawer(false)}
                // transitionDuration={5000000000000000000000000000000000000}
                // transitionDuration={{
                //   appear: 9999999999999,
                //   enter: 9999999999999,
                //   exit: 9999999999999,
                // }}
                // className={classes.drawerList}
                elevation={16}>
                <Typography variant='h6' align='center' noWrap color='primary'>
                  EventRate
                </Typography>
                {list()}
              </Drawer>
              <IconButton aria-label='back' onClick={history.goBack}>
                <FontAwesomeIcon icon={faBackward} />
              </IconButton>
              <Typography
                className={classes.title}
                variant='h6'
                align='center'
                noWrap>
                EventRate
              </Typography>
              {history.location.pathname === '/parties' && (
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder='Find a party…'
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    id='searchBar'
                    name='searchBar'
                    key={'searchBar'}
                    value={searchTerm}
                    type='text'
                    inputRef={searchRef}
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={handleSearch}
                    autoFocus
                  />
                </div>
              )}
            </Grid>{' '}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </div>
  );
}
