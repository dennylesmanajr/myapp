import { invoiceContants } from "../constants";

export function customer(state = {}, action) {
  switch (action.type) {
    case invoiceContants.FETCH_LIST_CUSTOMERS_REQUEST:
      return {
        loading: true,
      };
    case invoiceContants.FETCH_LIST_CUSTOMERS_SUCCESS:
      return {
        customer: action.res,
      };
    case invoiceContants.FETCH_LIST_CUSTOMERS_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}
