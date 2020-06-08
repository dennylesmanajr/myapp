import { invoiceContants } from "../constants";

export function invoicesDetail(state = {}, action) {
  
  switch (action.type) {
    case invoiceContants.ADD_INVOICE_DETAIL_REQUEST:
      return {
        loading: true,
      };
    case invoiceContants.ADD_INVOICE_DETAIL_SUCCESS:
      return {
        invoiceDetail: action.res,
      };
    case invoiceContants.ADD_INVOICE_DETAIL_FAILURE:
      return {
        error: action.error,
      };
    case invoiceContants.EDIT_INVOICE_DETAIL_REQUEST:
      return {
        loading: true,
      };
    case invoiceContants.EDIT_INVOICE_DETAIL_SUCCESS:
      return {
        invoiceDetail: action.res,
      };
    case invoiceContants.EDIT_INVOICE_DETAIL_FAILURE:
      return {
        error: action.error,
      };
    case invoiceContants.DELETE_INVOICE_DETAIL_REQUEST:
      return {
        loading: true,
      };
    case invoiceContants.DELETE_INVOICE_DETAIL_SUCCESS:
      return {
        invoiceDetail: action.res,
      };
    case invoiceContants.DELETE_INVOICE_DETAIL_FAILURE:
      return {
        error: action.error,
      };
    case invoiceContants.FETCH_LIST_INVOICE_DETAIL_REQUEST:
      return {
        loading: true,
      };
    case invoiceContants.FETCH_LIST_INVOICE_DETAIL_SUCCESS:
      return {
        invoiceDetailList: action.res,
      };
    case invoiceContants.FETCH_LIST_INVOICE_DETAIL_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}
