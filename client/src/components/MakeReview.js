import React, { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import {
  Drawer,
  CssBaseline,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  TextField,
} from "@material-ui/core";
import { flexbox } from "@material-ui/system";
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
import Rating from "@material-ui/lab/Rating";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
// import { CustomizedRatings } from "./Rating";
import { useAuth } from "../Contexts/AuthContext";
import { useParty } from "../Contexts/PartyContext";
import { useStyles } from "./Toolbox/cssTheme";
const { serverURL } = require("../config");

const StyledRating = withStyles({
  iconFilled: {
    color: "#ff6d75",
  },
  iconHover: {
    color: "#ff3d47",
  },
})(Rating);

export default function MakeReview(props) {
  const party = props.party;
  const [rating, setRating] = useState(0);
  const history = useHistory();
  const { refresh, setRefresh } = useParty();
  const textRef = useRef();
  const { isUser, token, userInfo } = useAuth();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  // console.log(isUser);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleSendReview = (event) => {
    event.preventDefault();
    const postDate = new Date(Date.now());
    const newReview = {
      user: userInfo._id,
      party: party._id,
      date: postDate.toISOString(),
      rating: rating,
      text: textRef.current.value,
    };
    fetch(`${serverURL}/reviews/new`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(newReview),
    })
      .then((res) => res.json())
      .then((things) => {
        console.log(things);
        // history.push(`/parties/${party.name}`);
        setRefresh(!refresh);
      })
      .then(handleDrawerClose)
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {/* <h1>{party.reviews.reverse()[0].text}</h1> */}
      <Grid container>
        <Grid container alignItems="center" align="center">
          <Grid item xs={6}>
            <Typography variant="h6" noWrap>
              Leave a Review&nbsp;
            </Typography>
          </Grid>
          <Grid item xs={6} align="center">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="bottom"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <Grid container justify="space-between">
            <Grid item>
              <IconButton onClick={handleDrawerClose}>
                <ExpandMoreOutlinedIcon />
              </IconButton>
            </Grid>
            {isUser === true && (
              <Grid item>
                <IconButton onClick={handleSendReview}>
                  <FontAwesomeIcon icon={faPaperPlane} />
                </IconButton>
              </Grid>
            )}
          </Grid>
        </div>
        <Divider />
        {isUser === true ? (
          <>
            <Grid container align="center">
              <Grid item xs={12}>
                <StyledRating
                  name="partyRating"
                  defaultValue={4}
                  getLabelText={(value) =>
                    `${value} Heart${value !== 1 ? "s" : ""}`
                  }
                  precision={0.5}
                  icon={<FavoriteIcon fontSize="default" />}
                  onChange={(event) => setRating(event.target.value)}
                />
              </Grid>
            </Grid>
            <Divider />
            <TextField
              id="standard-multiline-static"
              label="Your Review"
              multiline
              rows={15}
              inputRef={textRef}
            />
          </>
        ) : (
          <>
            <Typography variant="h4">
              <Link to="/signup">Signup</Link> for leaving a Review!
            </Typography>
            <Typography variant="h4">
              Already have an account?
              <Link to="/signin">Login</Link>
            </Typography>
          </>
        )}
      </Drawer>
    </>
  );
}
