import React, { useEffect, useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { useParty } from "../Contexts/PartyContext";
import {
  Paper,
  Typography,
  Grid,
  Divider,
  Tab,
  Tabs,
  Box,
} from "@material-ui/core";
import PartyInfoCard from "../components/PartyInfoCard";
import { useStyles } from "../components/Toolbox/cssTheme";
import SwipeableViews from "react-swipeable-views";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const UserParties = () => {
  const classes = useStyles();
  const { userInfo, getUserInfo } = useAuth();
  const { parties } = useParty();
  const [bob, setBob] = useState([]);
  const [value, setValue] = React.useState(0);

  function a11yProps(index) {
    return {
      id: `${index}-tab`,
      "aria-controls": `${index}-tabpane`,
    };
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <div>
      <Typography color="primary" variant="h2" align="center">
        {userInfo.username.charAt(0).toUpperCase() + userInfo.username.slice(1)}
        `s zone
      </Typography>

      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="secondary"
        variant="fullWidth"
      >
        <Tab label="Parties reviewed" {...a11yProps("Parties-reviewed")} />
        <Tab label="Parties owned" {...a11yProps("Parties-owned")} />
      </Tabs>
      <SwipeableViews
        axis={"x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={"ltr"}>
          <Grid container spacing={1}>
            {userInfo && userInfo.reviews && userInfo.reviews.length > 0 ? (
              userInfo.reviews
                .filter(
                  (review, index, self) =>
                    index ===
                    self.findIndex(
                      (t) =>
                        t.party._id === review.party._id &&
                        t.party.display === true
                    )
                )
                .map((review) => (
                  <Grid item xs={12}>
                    <PartyInfoCard
                      party={review.party}
                      className={classes.userPartyInfo}
                    />
                  </Grid>
                ))
            ) : (
              <Typography color="primary">123</Typography>
            )}
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1} dir={"ltr"}>
          <Grid container spacing={1}>
            {userInfo &&
            userInfo.own_parties &&
            userInfo.own_parties.length > 0 ? (
              userInfo.own_parties
                .filter(
                  (party, index, self) =>
                    index ===
                    self.findIndex(
                      (t) => t._id === party._id && party.display === true
                    )
                )
                .map((party) => {
                  return (
                    <Grid item xs={12}>
                      <PartyInfoCard party={party} />
                    </Grid>
                  );
                })
            ) : (
              <Typography color="primary">go make parties</Typography>
            )}
          </Grid>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
};

export default UserParties;
