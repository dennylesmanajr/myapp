// import config from 'config';
import { authHeader } from '../helpers';

export const homeService = {
    getListInvoicesService,
};

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

function getListInvoicesService() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'}
    };

    return fetch(`http://localhost:8000/api/v1/invoice`, requestOptions);
}

