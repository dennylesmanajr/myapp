import React from 'react';
import { Route, Redirect } from 'react-router-dom';
const a = localStorage.getItem('user')
console.log('a: ', a);

export const PrivateRoute = ({ component: Component, ...rest }) => (
    
    
    <Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)
console.log('PrivateRoute: ', PrivateRoute);