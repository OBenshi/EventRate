import React, { useEffect, useState, useRef } from "react";
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
  useScrollTrigger,
  TextField,
} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { fade, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  NavLink,
  useHistory,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { useStyles } from "./Toolbox/cssTheme";
import { useAuth } from "../Contexts/AuthContext";
// import HandleSearch from "./HandleSearch";
import { useSearch } from "../Contexts/SearchContext";
export default function PrimaryAppBar(props) {
  const classes = useStyles();
  const { isUser, setIsUser, token, userInfo, setUserInfo } = useAuth();
  const { searchTerm, setSearchTerm } = useSearch();
  console.log(`isUser`, isUser);
  const searchRef = useRef();
  let { path, url } = useRouteMatch();
  const history = useHistory();
  const [drawerState, setDrawerState] = useState(false);

  const handleLogout = () => {
    const request = { method: "post", body: { _id: userInfo._id } };
    fetch("/users/logout", request)
      .then((response) => {
        setUserInfo([]);
        setIsUser(false);
        window.localStorage.removeItem("token");
        // history.push("/");
        window.location.reload();
        console.log(response);
      })
      .catch((error) => console.error(error));
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerState(open);
  };
  const list = (anchor) => (
    <div
      // className={classes.list}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <NavLink to="/">
          <ListItem button key={"home"}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"home"} />
          </ListItem>{" "}
        </NavLink>
        <NavLink to="/parties">
          <ListItem button key={"parties"}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"parties"} />
          </ListItem>{" "}
        </NavLink>
        {!isUser && (
          <NavLink to="/signup">
            <ListItem button key={"signup"}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"Sign up"} />
            </ListItem>
          </NavLink>
        )}
        {!isUser && (
          <Link to="/signin">
            <ListItem button key={"signin"}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"Sign in"} />
            </ListItem>{" "}
          </Link>
        )}
      </List>

      <Divider />
      {userInfo && (
        <List>
          <Link to={`/${userInfo.username}`}>
            <ListItem button key={"favourites"}>
              <ListItemIcon>
                <FavoriteIcon />
              </ListItemIcon>
              <ListItemText primary={"My Parties"} />
            </ListItem>
          </Link>{" "}
          <NavLink to="/dashboard">
            <ListItem button key={"dashboard"}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"Manage profile"} />
            </ListItem>
          </NavLink>
          <Link to="/submitevent">
            <ListItem button key={"SubmitAParty"}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={"Submit a Party"} />
            </ListItem>{" "}
          </Link>
          <ListItem>
            <ListItemText primary={`${isUser},${userInfo.username}`} />{" "}
          </ListItem>
          <ListItem button key={"logout"} onClick={handleLogout}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
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
        <AppBar position="fixed">
          <Toolbar>
            <Grid container align="right">
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>{" "}
              <Drawer
                anchor={"left"}
                open={drawerState}
                onClose={toggleDrawer(false)}
                // className={classes.drawerList}
                elevation={16}
              >
                <Typography variant="h6" align="center" noWrap color="primary">
                  EventRate
                </Typography>
                {list()}
              </Drawer>
              <Typography className={classes.title} variant="h6" noWrap>
                EventRate
              </Typography>
              {history.location.pathname === "/parties" && (
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Find a party…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    id="searchBar"
                    name="searchBar"
                    key={"searchBar"}
                    value={searchTerm}
                    type="text"
                    inputRef={searchRef}
                    inputProps={{ "aria-label": "search" }}
                    onChange={handleSearch}
                    autoFocus
                  />
                </div>
              )}
            </Grid>{" "}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </div>
  );
}
