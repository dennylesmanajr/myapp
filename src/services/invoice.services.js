// import config from 'config';
import { authHeader } from '../helpers';
import { userService } from '../services';


export const invoiceService = {
    getListCustomers,
    addInvoice,
    editInvoice,
    getListInvoicesService,
    deleteInvoice,
    getListInvoicesReport,
    addInvoiceDetail,
    editInvoiceDetail,
    deleteInvoiceDetail,
    getListInvoicesDetail,
};

function getListInvoicesService() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };

    return fetch(`http://localhost:8000/api/v1/invoice`, requestOptions);
}

// function getListInvoices() {
//     console.log('password: ', password);
//     console.log('email: ', email);
//     const requestOptions = {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json'},
//         body: JSON.stringify({ email, password })
//     };

//     return fetch(`http://localhost:8000/api/v1/login`, requestOptions)
//         .then(handleResponse)
//         .then(user => {
//             console.log('user: ', user);
//             // login successful if there's a jwt token in the response
//             if (user.data) {
//                 // store user details and jwt token in local storage to keep user logged in between page refreshes
//                 localStorage.setItem('user', JSON.stringify(user.data));
//             }

//             return user;
//         });
// }

function getListCustomers() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };

    return fetch(`http://localhost:8000/api/v1/customer`, requestOptions);
}

function addInvoice(param) {
    console.log('param: ', param);
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ ...param })
    };

    return fetch(`http://localhost:8000/api/v1/invoice`, requestOptions)
        .then(handleResponse)
        .then(res => {return res;});
}


function editInvoice(param) {
    console.log('param: ', param);
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify({ ...param })
    };

    return fetch(`http://localhost:8000/api/v1/invoice/`+param.id, requestOptions)
        .then(handleResponse)
        .then(res => {return res;});
}



function deleteInvoice(param) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(),
    };

    return fetch(`http://localhost:8000/api/v1/invoice/`+param, requestOptions)
        .then(handleResponse)
        .then(res => {return res;});
}


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                userService.logout();
                // location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}


function getListInvoicesReport() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };

    return fetch(`http://localhost:8000/api/v1/invoice/report`, requestOptions);
}


function addInvoiceDetail(param) {
    console.log('param: ', param);
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({ ...param })
    };

    return fetch(`http://localhost:8000/api/v1/invoicedetail`, requestOptions)
        .then(handleResponse)
        .then(res => {return res;});
}


function editInvoiceDetail(param) {
    console.log('param: ', param);
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify({ ...param })
    };

    return fetch(`http://localhost:8000/api/v1/invoicedetail/`+param.id, requestOptions)
        .then(handleResponse)
        .then(res => {return res;});
}



function deleteInvoiceDetail(param) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(),
    };

    return fetch(`http://localhost:8000/api/v1/invoicedetail/`+param, requestOptions)
        .then(handleResponse)
        .then(res => {return res;});
}


function getListInvoicesDetail(data) {
    console.log('data: ', data);
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };

    return fetch(`http://localhost:8000/api/v1/invoicedetail?invoice_id=${encodeURIComponent(data.invoice_id)}`, requestOptions);
}