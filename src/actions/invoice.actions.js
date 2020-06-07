import { invoiceContants } from '../constants';
import { invoiceService } from '../services';
import { alertActions } from './';

export const invoiceActions = {
    getCustomerList,
    addInvoice,
};


function getCustomerList () {
    return dispatch => {
        dispatch(request());

        invoiceService.getListCustomers()
        .then(response => response.json())
        .then(data => dispatch(success(data)))
        .catch(error => dispatch(failure(error)));
    };

    function request() { return { type: invoiceContants.FETCH_LIST_CUSTOMERS_REQUEST } }
    function success(res) {  return { type: invoiceContants.FETCH_LIST_CUSTOMERS_SUCCESS, res } }
    function failure(error) { return { type: invoiceContants.FETCH_LIST_CUSTOMERS_FAILURE, error } }
}


function addInvoice (param) {
    
    return dispatch => {
        dispatch(request());

        // invoiceService.addInvoice(invoice_number, invoice_date,customer_id)
        // .then(response => response.json())
        // .then(data => dispatch(success(data)))
        // .catch(error => dispatch(failure(error)));

        invoiceService.addInvoice(param)
            .then(
                res => { 
                    console.log('res: ', res);
                    
                    dispatch(success(res));
                    dispatch(alertActions.success(res.message));
                    // history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: invoiceContants.ADD_INVOICE_REQUEST } }
    function success(res) { return { type: invoiceContants.ADD_INVOICE_SUCCESS, res } }
    function failure(error) { return { type: invoiceContants.ADD_INVOICE_FAILURE, error } }
}