import { invoiceContants } from '../constants';
import { invoiceService, itemService } from '../services';
import { alertActions } from './';

export const invoiceActions = {
    getListInvoices,
    getCustomerList,
    addInvoice,
    editInvoice,
    deleteInvoice,
    getListInvoicesReport,
    getListItems,
    addInvoiceDetail,
    editInvoiceDetail,
    deleteInvoiceDetail,
};


function getListInvoices () {
    return dispatch => {
        dispatch(request());

        invoiceService.getListInvoicesService()
        .then(response => response.json())
        .then(data => dispatch(success(data)))
        .catch(error => dispatch(failure(error)));
    };

    function request() { return { type: invoiceContants.FETCH_LIST_INVOICES_REQUEST } }
    function success(res) {  return { type: invoiceContants.FETCH_LIST_INVOICES_SUCCESS, res } }
    function failure(error) { return { type: invoiceContants.FETCH_LIST_INVOICES_FAILURE, error } }
}

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


function editInvoice (param) {
    
    return dispatch => {
        dispatch(request());

        // invoiceService.addInvoice(invoice_number, invoice_date,customer_id)
        // .then(response => response.json())
        // .then(data => dispatch(success(data)))
        // .catch(error => dispatch(failure(error)));

        invoiceService.editInvoice(param)
            .then(
                res => { 
                    
                    
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

    function request() { return { type: invoiceContants.EDIT_INVOICE_REQUEST } }
    function success(res) { return { type: invoiceContants.EDIT_INVOICE_SUCCESS, res } }
    function failure(error) { return { type: invoiceContants.EDIT_INVOICE_FAILURE, error } }
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



function deleteInvoice (param) {
    
    return dispatch => {
        dispatch(request());

        // invoiceService.addInvoice(invoice_number, invoice_date,customer_id)
        // .then(response => response.json())
        // .then(data => dispatch(success(data)))
        // .catch(error => dispatch(failure(error)));

        invoiceService.deleteInvoice(param)
            .then(
                res => { 
                    dispatch(success(res));
                    dispatch(alertActions.success(res.message));

                    invoiceService.getListInvoicesService()
                    .then(response => response.json())
                    .then(data => dispatch(success_list(data)))
                    .catch(error => dispatch(failure_list(error)));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: invoiceContants.DELETE_INVOICE_REQUEST } }
    function success(res) { return { type: invoiceContants.DELETE_INVOICE_SUCCESS, res } }
    function failure(error) { return { type: invoiceContants.DELETE_INVOICE_FAILURE, error } }
    
    // function request_list() { return { type: invoiceContants.FETCH_LIST_CUSTOMERS_REQUEST } }
    function success_list(res) {  return { type: invoiceContants.FETCH_LIST_INVOICES_SUCCESS, res } }
    function failure_list(error) { return { type: invoiceContants.FETCH_LIST_INVOICES_FAILURE, error } }
}



function getListInvoicesReport () {
    return dispatch => {
        dispatch(request());

        invoiceService.getListInvoicesReport()
        .then(response => response.json())
        .then(data => dispatch(success(data)))
        .catch(error => dispatch(failure(error)));
    };

    function request() { return { type: invoiceContants.REPORT_INVOICE_REQUEST } }
    function success(res) {  return { type: invoiceContants.REPORT_INVOICE_SUCCESS, res } }
    function failure(error) { return { type: invoiceContants.REPORT_INVOICE_FAILURE, error } }
}


function getListItems () {
    return dispatch => {
        dispatch(request());

        itemService.getListItems()
        .then(response => response.json())
        .then(data => dispatch(success(data)))
        .catch(error => dispatch(failure(error)));
    };

    function request() { return { type: invoiceContants.FETCH_LIST_ITEMS_REQUEST } }
    function success(res) {  return { type: invoiceContants.FETCH_LIST_ITEMS_SUCCESS, res } }
    function failure(error) { return { type: invoiceContants.FETCH_LIST_ITEMS_FAILURE, error } }
}



function editInvoiceDetail (param) {
    
    return dispatch => {
        dispatch(request());

        // invoiceService.addInvoice(invoice_number, invoice_date,customer_id)
        // .then(response => response.json())
        // .then(data => dispatch(success(data)))
        // .catch(error => dispatch(failure(error)));

        invoiceService.editInvoiceDetail(param)
            .then(
                res => { 
                    
                    
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

    function request() { return { type: invoiceContants.EDIT_INVOICE_DETAIL_REQUEST } }
    function success(res) { return { type: invoiceContants.EDIT_INVOICE_DETAIL_SUCCESS, res } }
    function failure(error) { return { type: invoiceContants.EDIT_INVOICE_DETAIL_FAILURE, error } }
}



function addInvoiceDetail (param) {
    
    return dispatch => {
        dispatch(request());

        // invoiceService.addInvoice(invoice_number, invoice_date,customer_id)
        // .then(response => response.json())
        // .then(data => dispatch(success(data)))
        // .catch(error => dispatch(failure(error)));

        invoiceService.addInvoiceDetail(param)
            .then(
                res => { 
                    
                    
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

    function request() { return { type: invoiceContants.ADD_INVOICE_DETAIL_REQUEST } }
    function success(res) { return { type: invoiceContants.ADD_INVOICE_DETAIL_SUCCESS, res } }
    function failure(error) { return { type: invoiceContants.ADD_INVOICE_DETAIL_FAILURE, error } }
}



function deleteInvoiceDetail (param) {
    
    return dispatch => {
        dispatch(request());

        // invoiceService.addInvoice(invoice_number, invoice_date,customer_id)
        // .then(response => response.json())
        // .then(data => dispatch(success(data)))
        // .catch(error => dispatch(failure(error)));

        invoiceService.deleteInvoiceDetail(param)
            .then(
                res => { 
                    dispatch(success(res));
                    dispatch(alertActions.success(res.message));

                    invoiceService.getListInvoicesService()
                    .then(response => response.json())
                    .then(data => dispatch(success_list(data)))
                    .catch(error => dispatch(failure_list(error)));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() { return { type: invoiceContants.DELETE_INVOICE_DETAIL_REQUEST } }
    function success(res) { return { type: invoiceContants.DELETE_INVOICE_DETAIL_SUCCESS, res } }
    function failure(error) { return { type: invoiceContants.DELETE_INVOICE_DETAIL_FAILURE, error } }
    
    // function request_list() { return { type: invoiceContants.FETCH_LIST_CUSTOMERS_REQUEST } }
    function success_list(res) {  return { type: invoiceContants.FETCH_LIST_INVOICES_SUCCESS, res } }
    function failure_list(error) { return { type: invoiceContants.FETCH_LIST_INVOICES_FAILURE, error } }
}