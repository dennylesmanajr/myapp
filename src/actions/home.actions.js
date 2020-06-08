import { homeConstants } from '../constants';
import { homeService } from '../services';


export const homeActions = {
    getListInvoices,
};


function getListInvoices () {
    return dispatch => {
        dispatch(request());

        homeService.getListInvoicesService()
        .then(response => response.json())
        .then(data => dispatch(success(data)))
        .catch(error => dispatch(failure(error)));
    };

    function request() { return { type: homeConstants.FETCH_LIST_INVOICES_REQUEST } }
    function success(res) {  return { type: homeConstants.FETCH_LIST_INVOICES_SUCCESS, res } }
    function failure(error) { return { type: homeConstants.FETCH_LIST_INVOICES_FAILURE, error } }
}