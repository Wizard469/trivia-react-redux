import { SET_CONFIG } from '../actions';

const INITIAL_STATE = {
  category: '',
  difficulty: '',
  questionType: '',
};

const settings = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case SET_CONFIG:
    return payload;
  default:
    return state;
  }
};

export default settings;
