

export function getRole() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));
    console.log('user: ', user);
    

    if (user && user.roles) {
        return user.roles.role_code;
    } else {
        return '';
    }
}


export function getEmail() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));
    console.log('user: ', user);
    

    if (user && user.email) {
        return user.email;
    } else {
        return '';
    }
}