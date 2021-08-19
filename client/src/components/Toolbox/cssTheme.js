import { makeStyles, fade } from '@material-ui/core/styles';
// import { Fade } from "@material-ui/core";
import { createMuiTheme } from '@material-ui/core';
import '@fontsource/major-mono-display';
import cork from '../../imgs/josephine-bredehoft-KsAo8ouBn8A-unsplash.jpg';
const drawerWidth = '100%';
const colors = ['yellow', 'pink', 'green', 'orange'];
const randomColor = colors[Math.floor(Math.random() * colors.length)];

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#FF9D00',
      main: '#FF7600',
      dark: '#FF3C00',
    },
    secondary: {
      light: '#4ef500',
      main: '#3EC300',
      dark: '#34a300',
    },
    background: {
      default: '#000000',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h2: {
      fontFamily:
        '"Major Mono Display","Roboto", "Helvetica", "Arial", sans-serif',
    },
    h3: {
      fontFamily:
        '"Major Mono Display","Roboto", "Helvetica", "Arial", sans-serif',
    },
    h4: {
      fontFamily:
        '"Major Mono Display","Roboto", "Helvetica", "Arial", sans-serif',
    },
    h5: {
      fontFamily:
        '"Major Mono Display","Roboto", "Helvetica", "Arial", sans-serif',
    },
    h6: {
      fontFamily:
        '"Major Mono Display","Roboto", "Helvetica", "Arial", sans-serif',
    },
  },
});
// theme.typography.h1.fontFamily =
//   '"Major Mono Display","Helvetica","Arial",sans-serif';
// theme.typography.h2.fontFamily =
//   '"Major Mono Display","Helvetica","Arial",sans-serif';
// theme.typography.h3.fontFamily =
//   '"Major Mono Display","Helvetica","Arial",sans-serif';
// theme.typography.h4.fontFamily =
//   '"Major Mono Display","Helvetica","Arial",sans-serif';
// theme.typography.h5.fontFamily =
//   '"Major Mono Display","Helvetica","Arial",sans-serif';
// theme.typography.h6.fontFamily =
//   '"Major Mono Display","Helvetica","Arial",sans-serif';

export const useStyles = makeStyles((theme) => ({
  rootOfRoots: {
    // display: 'flex',
    // width: '100wh',
  },
  partyCard: {
    maxWidth: '98%',
  },
  media: {
    height: 300,
    // display: "block",
  },
  NavRoot: {
    flexGrow: 1,
    marginBottom: theme.spacing(12),
  },
  navlink: {
    textDecoration: 'none',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    // display: "none",
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    display: 'flex',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  partyImg: {
    width: '100%',
    height: '100%',
  },
  imgPostIt: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  yellowPostIt: {
    backgroundColor: 'yellow',
  },
  pinkPostIt: {
    backgroundColor: 'pink',
  },
  cork: {
    backgroundSize: 'cover',
    backgroundRepeat: 'repeat',
    backgroundImage: `url(${cork})`,
    borderRadius: '1%',
  },
  root: {
    // display: 'flex',
  },
  AppBar2: {
    // backgroundColor: "",
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth * 0.5,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  ReviewBox: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(1),
  },
  partyInfo: {
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "center",
    // alignItems: "center",
  },
  reviewEditText: {
    width: '100%',
  },
  partiesScroll: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'noWrap',
    overflowY: 'scroll',
  },
  partyDetailsRoot: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    // display: "flex",
    // flexDirection: "column",
    // alignItems: "center",
    // alignContent: "center",
    // justifyContent: "center",
  },
  reviewsContainer: {
    marginTop: theme.spacing(5),
  },
}));
