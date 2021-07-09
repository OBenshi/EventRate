import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React, { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import Copyright from "../components/copyright";
import { useStyles } from "../components/Toolbox/cssTheme";
import { useAuth } from "../Contexts/AuthContext";
import { useParty } from "../Contexts/PartyContext";

export default function SignIn() {
  const { isUser, setIsUser, setWithExpiry } = useAuth();
  const classes = useStyles();
  const passwordRef = useRef();
  const emailRef = useRef();
  const history = useHistory();
  const { refresh, setRefresh } = useParty();
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(passwordRef.current.value);
    fetch("http://localhost:5000/users/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: passwordRef.current.value,
        email: emailRef.current.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setWithExpiry("token", data.token, 28800000);
        setIsUser(true);
        // history.push("/parties");
        history.go(-1);
        setRefresh(!refresh);
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.cork}>
      {/* <CssBaseline /> */}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            inputRef={emailRef}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={passwordRef}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
