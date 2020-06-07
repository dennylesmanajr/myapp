import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
// import { home } from './home.reducer';
import { invoices } from './invoice.reducer';
import { invoicesDetail } from './invoicedetail.reducer';
import { items } from './items.reducer';
import { customer } from './customer.reducer';

const rootReducer = combineReducers({
  authentication,
  users,
  alert,
  // home,
  invoices,
  invoicesDetail,
  items,
  customer,
});

export default rootReducer;