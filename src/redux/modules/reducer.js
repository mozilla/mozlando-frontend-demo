import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

import auth from './auth';
import {reducer as form} from 'redux-form';
import info from './info';
import searchResults from './searchResults';
import addon from './addon';

export default combineReducers({
  router: routerStateReducer,
  auth,
  form,
  info,
  searchResults,
  addon,
});
