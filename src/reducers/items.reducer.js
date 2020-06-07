import { invoiceContants } from "../constants";

export function items(state = {}, action) {
  switch (action.type) {
    case invoiceContants.FETCH_LIST_ITEMS_REQUEST:
      return {
        loading: true,
      };
    case invoiceContants.FETCH_LIST_ITEMS_SUCCESS:
      return {
        items: action.res,
      };
    case invoiceContants.FETCH_LIST_ITEMS_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}
