import { webColors } from "./webcolors";

export const randomColor =
  webColors[Math.floor(Math.random() * webColors.length)];

export const averageScores = ({ avg, n }, reviews) => {
  if (!reviews.rating) {
    return { avg, n };
  }
  return {
    avg: (reviews.rating + n * avg) / (n + 1),
    n: n + 1,
  };
};

// export { averageScores, randomColor };
