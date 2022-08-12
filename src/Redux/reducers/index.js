import { combineReducers } from 'redux';
import player from './player.reducer';
import settings from './settings.reducer';

const rootReducer = combineReducers({ player, settings });

export default rootReducer;
