// import config from 'config';
import { authHeader } from '../helpers';

export const userService = {
    login,
    logout,
    getAll
};

function login(email, password) {
    console.log('password: ', password);
    console.log('email: ', email);
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password })
    };

    return fetch(`http://localhost:8000/api/v1/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            console.log('user: ', user);
            // login successful if there's a jwt token in the response
            if (user.data) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user.data));
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/users`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                // location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}