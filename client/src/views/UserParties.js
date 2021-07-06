import React, { useEffect, useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { useParty } from "../Contexts/PartyContext";
import { Paper, Typography, Grid, Divider } from "@material-ui/core";
import PartyInfoCard from "../components/PartyInfoCard";
const UserParties = () => {
  const { userInfo, getUserInfo } = useAuth();
  const { parties } = useParty();
  const [bob, setBob] = useState([]);

  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <div>
      {userInfo &&
        userInfo.reviews
          .filter((review, i) => userInfo.reviews.indexOf(review) === i)
          .map((review) => <PartyInfoCard party={review.party} />)}
      {/* //   .filter((review, j) => {
          //     const _review = JSON.stringify(review);
          //     return (
          //       j ===
          //       userInfo.reviews.findIndex((thing) => {
          //         return JSON.stringify(thing) === _review;
          //       })
          //     );
          //   })
        //   .map((review, index) => {
        //     console.log(userInfo.reviews[index - 1]);
        //     if (userInfo.reviews[index - 1] !== undefined) {
        //       if (review.party._id !== userInfo.reviews[index - 1].party._id) {
        //         return <PartyInfoCard party={review.party} />;
        //       }
        //     }
        //   })} */}
    </div>
  );
};

export default UserParties;
