import { LOG_USER, UPDATE_SCORE } from '../actions';

const INITIAL_STATE = {
  name: 'Renato Mendes',
  assertions: '',
  score: 0,
  gravatarEmail: 'mendeslrenato@gmail.com',
};

const player = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case UPDATE_SCORE:
    return {
      ...state,
      score: state.score + payload,
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
