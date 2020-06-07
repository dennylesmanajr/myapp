import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
// import { homeActions } from '../actions';

class NewInvoicePage extends React.Component {
    componentDidMount() {
        console.log('componentDidMount: ');
        // this.props.dispatch(userActions.getAll());
        // this.props.doFetchListInvoices();
    }

    render() {
        console.log('HOLAAA: ', );
        const { user, users, home } = this.props;

        return (
            <div className="col-md-12">
                <form className="form-wrapper">
                    <div class="form-row">
                        <div class="form-group col-md-4">
                            <label for="invoiceNumber">Invoice Number</label>
                            <input type="text" class="form-control" id="invoiceNumber" placeholder="Invoice Number" />
                        </div>
                        <div class="form-group col-md-4">
                            <label for="invoiceDate">Invoice Date</label>
                            <input type="date" class="form-control" id="invoiceDate" placeholder="Invoice Date" />
                        </div>
                        <div class="form-group col-md-4">
                            <label for="Customer">Customer</label>
                            <select id="inputState" class="form-control">
                                <option selected>Choose...</option>
                                <option>...</option>
                            </select>
                        </div>
                    </div>
                <button type="submit" class="btn btn-primary float-right">Save</button>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication, } = state;
    const { user } = authentication;
    return {
        user,
        users,
        // home,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        // doFetchListInvoices: () => dispatch(homeActions.getListInvoices()),
    }
}

const connectedNewInvoicePage = connect(mapStateToProps, mapDispatchToProps)(NewInvoicePage);
export { connectedNewInvoicePage as NewInvoicePage };