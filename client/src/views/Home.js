import { Typography, Grid, Link, Button } from '@material-ui/core';
import React from 'react';
import {
  NavLink,
  useHistory,
  useRouteMatch,
  Link as RouterLink,
} from 'react-router-dom';
import { FmL } from '../components/FmL';
import { useAuth } from '../Contexts/AuthContext';
import { useStyles } from '../components/Toolbox/cssTheme';
const Home = () => {
  const { userInfo, isUser } = useAuth();
  const classes = useStyles();
  console.log(isUser);

  return (
    <div>
      <Grid
        container
        direction='column'
        alignItems='center'
        justifyContent='center'
        id='moshe'
        spacing={4}>
        <Grid item xs={10}>
          <Grid
            container
            spacing={5}
            alignContent='center'
            justifyContent='center'
            id='rick'
            style={{ justifyContent: 'center' }}>
            <Grid item xs={12}>
              <Typography
                variant='h2'
                component='h5'
                // variantMapping={{ h2: 'h1' }}
                color='secondary'
                align='center'
                gutterBottom>
                WELCOME TO
              </Typography>
            </Grid>
            <Grid item xs={11}>
              {' '}
              <Typography
                variant='h3'
                component='h1'
                color='primary'
                align='center'
                gutterBottom>
                EventRate
              </Typography>
            </Grid>
            {userInfo && (
              <Grid item xs={12}>
                <Typography
                  variant='h2'
                  component='h6'
                  color='primary'
                  align='center'>
                  {userInfo.username}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid item xs={10}>
          <Typography
            variant='h5'
            align='center'
            color='secondary'
            gutterBottom>
            a platform for
            <br /> objective non-sponsored
            <br /> Event reviews
          </Typography>
          {!isUser && (
            <Grid item xs={12}>
              {' '}
              <Button
                fullWidth={true}
                component={RouterLink}
                to={'/signin'}
                color='primary'
                variant='contained'>
                Login
              </Button>
            </Grid>
          )}
        </Grid>

        {!isUser && (
          <Grid item xs={12}>
            <Grid container align='center'>
              <Grid item xs={12}>
                <Typography variant='h6' color='secondary'>
                  Don't have an account yet?
                </Typography>{' '}
              </Grid>{' '}
              <Grid item xs={12}>
                {' '}
                <Button
                  fullWidth
                  component={RouterLink}
                  color='primary'
                  to='/signup'
                  variant='contained'
                  // className={classes.navlink}
                >
                  Signup!
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography variant='h6' color='secondary'>
                  to start reviewing events
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        )}

        {/* <button onClick={FmL}>fuck</button> */}
      </Grid>
    </div>
  );
};

export default Home;
