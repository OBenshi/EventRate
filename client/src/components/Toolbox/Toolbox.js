// const CalcPartyRating = (party) => {
//     if (!party.reviews) { return 0 } else {
//         const userRatings=[]
//     party.reviews.forEach(review => {
//         userRatings.push(review.rating)

//     });
// }}

const averageScores = ({ avg, n }, reviews) => {
  if (!reviews.rating) {
    return { avg, n };
  }
  return {
    avg: (reviews.rating + n * avg) / (n + 1),
    n: n + 1,
  };
};

export { averageScores };
