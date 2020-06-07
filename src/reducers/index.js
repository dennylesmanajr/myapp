import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { home } from './home.reducer';
import { invoices } from './invoice.reducer';

const rootReducer = combineReducers({
  authentication,
  users,
  alert,
  home,
  invoices,
});

export default rootReducer;