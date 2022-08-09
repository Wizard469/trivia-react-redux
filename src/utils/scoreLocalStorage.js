import store from '../Redux/store';

export const saveScoreToLocalStorage = () => {
  const {
    player: {
      name,
      gravatarEmail,
      score,
    },
  } = store.getState();

  const ranking = JSON.parse(localStorage.getItem('ranking'));
  if (ranking) {
    const newRanking = [...ranking, {
      name,
      score,
      picture: gravatarEmail,
    }];
    localStorage.setItem('ranking', JSON.stringify(newRanking));
  } else {
    localStorage.setItem('ranking', JSON.stringify([{
      name,
      score,
      picture: gravatarEmail,
    }]));
  }
};

export const getScoreFromLocalStorage = () => {
  const minusOne = -1;
  const ranking = JSON.parse(localStorage.getItem('ranking'));
  if (!ranking) return [];

  return ranking.sort((a, b) => {
    if (a.score > b.score) return minusOne;
    if (b.score > a.score) return 1;

    return 0;
  });
};
