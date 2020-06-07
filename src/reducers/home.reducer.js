import { homeConstants } from '../constants';

export function home(state = {}, action) {
    console.log('action: ', action);
  switch (action.type) {
    case homeConstants.FETCH_LIST_INVOICES_REQUEST:
      return {
        loading: true
      };
    case homeConstants.FETCH_LIST_INVOICES_SUCCESS:
      return {
        items: action.res
      };
    case homeConstants.FETCH_LIST_INVOICES_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}