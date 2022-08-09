import { LOG_USER, RESET_SCORE, UPDATE_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case RESET_SCORE:
    return INITIAL_STATE;
  case UPDATE_SCORE:
    return {
      ...state,
      score: state.score + payload,
      assertions: state.assertions + 1,
    };
  case LOG_USER:
    return {
      ...state,
      name: payload.name,
      gravatarEmail: payload.email,
    };
  default:
    return state;
  }
};

export default player;
