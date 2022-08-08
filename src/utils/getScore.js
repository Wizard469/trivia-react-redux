const getScore = (difficulty) => {
  const diffScore = {
    easy: 1,
    medium: 2,
    hard: 3,
  };
  return diffScore[difficulty];
};

export default getScore;
