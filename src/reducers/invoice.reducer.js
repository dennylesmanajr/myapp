import { invoiceContants } from "../constants";

export function invoices(state = {}, action) {
  console.log("action > invoices > reducer: ", action);
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
    case invoiceContants.ADD_INVOICE_REQUEST:
      return {
        loading: true,
      };
    case invoiceContants.ADD_INVOICE_SUCCESS:
      return {
        invoiceHeader: action.res,
      };
    case invoiceContants.ADD_INVOICE_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}
