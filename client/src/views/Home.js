import { Typography, Grid, Link } from "@material-ui/core";
import React from "react";
import {
  NavLink,
  useHistory,
  useRouteMatch,
  Link as RouterLink,
} from "react-router-dom";
import { FmL } from "../components/FmL";
import { useAuth } from "../Contexts/AuthContext";
import { useStyles } from "../components/Toolbox/cssTheme";
const Home = () => {
  const { userInfo, isUser } = useAuth();
  const classes = useStyles();
  console.log(isUser);

  return (
    <Grid container align="center" spacing={5}>
      <Grid item xs={12}>
        <Typography
          variant="h2"
          variantMapping={{ h2: "h1" }}
          color="primary"
          align="center"
        >
          WELCOME TO EventRate,
        </Typography>
        {userInfo && (
          <Typography
            variant="h2"
            variantMapping={{ h2: "h1" }}
            color="primary"
            align="center"
          >
            {userInfo.username}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h2" align="center" color="secondary">
          an objective non-sponsored platform for party reviews
        </Typography>
      </Grid>

      {!isUser && (
        <Grid container align="center">
          <Grid item xs={12}>
            <Typography variant="h5" color="primary" align="center">
              <Link
                component={RouterLink}
                color="secondary"
                to="/signin"
                // className={classes.navlink}
              >
                Sign-in
              </Link>{" "}
              to start reviewing events!
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" color="primary">
              Don't have an account yet?{" "}
              <Link
                component={RouterLink}
                color="secondary"
                to="/signup"
                // className={classes.navlink}
              >
                Signup!
              </Link>
            </Typography>
          </Grid>
        </Grid>
      )}

      {/* <button onClick={FmL}>fuck</button> */}
    </Grid>
  );
};

export default Home;
