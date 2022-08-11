export const LOG_USER = 'LOG_USER';
export const UPDATE_SCORE = 'UPDATE_SCORE';
export const RESET_SCORE = 'RESET_SCORE';
export const SET_CONFIG = 'SET_CONFIG';

export const logUserAction = (payload) => ({
  type: LOG_USER,
  payload,
});

export const updateScoreAction = (payload) => ({
  type: UPDATE_SCORE,
  payload,
});

export const resetScoreAction = () => ({
  type: RESET_SCORE,
});

export const setConfigAction = (payload) => ({
  type: SET_CONFIG,
  payload,
});
