import { makeStyles, fade } from "@material-ui/core/styles";
// import { Fade } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core";

import cork from "../../imgs/josephine-bredehoft-KsAo8ouBn8A-unsplash.jpg";

const colors = ["yellow", "pink", "green", "orange"];
const randomColor = colors[Math.floor(Math.random() * colors.length)];

export const theme = createMuiTheme({});

export const useStyles = makeStyles((theme) => ({
  partyCard: {
    maxWidth: "98%",
  },
  media: {
    height: 300,
    // display: "block",
  },
  NavRoot: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  partyImg: {
    width: "100%",
    height: "100%",
  },
  imgPostIt: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  yellowPostIt: {
    backgroundColor: "yellow",
  },
  pinkPostIt: {
    backgroundColor: "pink",
  },
  cork: {
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(${cork})`,
  },
}));
