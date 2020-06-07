import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { homeActions } from '../actions';
import ModalForm  from "../components/ModalForm";

class HomePage extends React.Component {
    componentDidMount() {
        console.log('componentDidMount: ');
        // this.props.dispatch(userActions.getAll());
        this.props.doFetchListInvoices();
    }

    render() {
        console.log(process.env.REACT_APP_FORMAT_DATE);
        const { user, users, home } = this.props;
        console.log('home: ', home);

        return (
            <div className="col-md-12">
                <h1>Hi {user.firstName}!</h1>
                <p>You're logged in with React & JWT!!</p>
                <h3>Users from secure api end point:</h3>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                    <ul>
                        {users.items.map((user, index) =>
                            <li key={user.id}>
                                {user.firstName + ' ' + user.lastName}
                            </li>
                        )}
                    </ul>
                }
                <p>
                    <Link to="/login">Logout</Link>
                </p>

                <h1>List Invoices</h1>
                <div className="col-md-3 float-right">
                    {/* <Link to="/new_invoice">
                        <button className="btn btn-primary float-right button-margin-tb">New</button>
                    </Link> */}
                    <ModalForm buttonLabel="Add Invoice" addItemToState={this.addItemToState}/>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">Invoice ID</th>
                        <th scope="col">Invoice Date</th>
                        <th scope="col">Customer Name</th>
                        <th scope="col">Total Invoice Amount</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {home.items && home.items.data.map((row, index) =>
                            // <li key={user.id}>
                            //     {user.firstName + ' ' + user.lastName}
                            // </li>
                            <tr>
                                <th scope="row">{row.invoice_number}</th>
                                <td>{moment(row.invoice_date).format(process.env.REACT_APP_FORMAT_DATE)}</td>
                                <td>{row.Customer.customer_name}</td>
                                <td>{row.total_amount}</td>
                                <td>
                                    <button className="btn btn-primary button-margin-side" type="submit">Edit</button>
                                    <button className="btn btn-primary button-margin-side" type="submit">Delete</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication, home, } = state;
    const { user } = authentication;
    return {
        user,
        users,
        home,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        doFetchListInvoices: () => dispatch(homeActions.getListInvoices()),
    }
}

const connectedHomePage = connect(mapStateToProps, mapDispatchToProps)(HomePage);
export { connectedHomePage as HomePage };