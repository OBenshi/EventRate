import React, { useEffect, useState } from "react";
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
} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import FavoriteIcon from "@material-ui/icons/Favorite";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import IconButton from "@material-ui/core/IconButton";
// import Typography from "@material-ui/core/Typography";
// import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
// import Divider from "@material-ui/core/Divider";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
// import ListItemText from "@material-ui/core/ListItemText";
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

export default function PrimaryAppBar() {
  const classes = useStyles();
  let { path, url } = useRouteMatch();
  const history = useHistory();
  const [drawerState, setDrawerState] = useState(false);

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
        <NavLink to="/signup">
          <ListItem button key={"signup"}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Sign up"} />
          </ListItem>{" "}
        </NavLink>
        <Link to="/signin">
          <ListItem button key={"signin"}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Sign in"} />
          </ListItem>{" "}
        </Link>
      </List>

      <Divider />

      <List>
        <Link to="/Favourites">
          <ListItem button key={"favourites"}>
            <ListItemIcon>
              <FavoriteIcon />
            </ListItemIcon>
            <ListItemText primary={"Favourites"} />
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
        <ListItem
          button
          key={"logout"}
          onClick={() => console.log("logged out")}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={"Logout"} />
        </ListItem>
      </List>
    </div>
  );
  useEffect(() => {
    console.log(path);
  }, []);
  return (
    <div className={classes.NavRoot}>
      <AppBar position="static">
        <Toolbar>
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
            Material-UI
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
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
