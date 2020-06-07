export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.data && user.data.accessToken) {
        return { 'Authorization': 'Bearer ' + user.data.accessToken };
    } else {
        return {};
    }
}