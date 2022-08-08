export const LOG_USER = 'LOG_USER';
export const UPDATE_SCORE = 'UPDATE_SCORE';

export const logUserAction = (payload) => ({
  type: LOG_USER,
  payload,
});

export const updateScoreAction = (payload) => ({
  type: UPDATE_SCORE,
  payload,
});
