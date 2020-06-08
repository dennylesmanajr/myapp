import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { invoiceActions } from "../actions";
import ModalForm from "../components/ModalForm";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      deleteId: '',
    };
  }
  componentDidMount() {
    // this.props.dispatch(userActions.getAll());
    this.props.doFetchListInvoices();
  }

  toggle = () => {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  };

  handleModalDelete = (id) => {
      
      this.setState({
          deleteId: id,
      })
      this.toggle();
  }

  handleDelete(){
    this.props.doDeleteInvoice(this.state.deleteId);
    this.toggle();
  }

  render() {
    const { user, users, invoices } = this.props;

    return (
      <div className="col-md-12">
        {/* <h1>Hi {user.firstName}!</h1>
        <p>You're logged in with React & JWT!!</p>
        <h3>Users from secure api end point:</h3>
        {users.loading && <em>Loading users...</em>}
        {users.error && (
          <span className="text-danger">ERROR: {users.error}</span>
        )}
        {users.items && (
          <ul>
            {users.items.map((user, index) => (
              <li key={user.id}>{user.firstName + " " + user.lastName}</li>
            ))}
          </ul>
        )}
        <p>
          <Link to="/login">Logout</Link>
        </p> */}

        <h1>List Invoices</h1>
        <div className="col-md-3 float-right">
          <Link to="/new_invoice">
                        <button className="btn btn-primary float-right button-margin-tb">New</button>
                    </Link>
          {/* <ModalForm
            buttonLabel="Add Invoice"
            addItemToState={this.addItemToState}
          /> */}
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
            {invoices.items &&
              invoices.items.data.map((row, index) => (
                // <li key={user.id}>
                //     {user.firstName + ' ' + user.lastName}
                // </li>
                <tr key={index}>
                  
                  
                  <th scope="row"><Link to={`/invoice/${row.id}`}>{row.invoice_number}</Link></th>
                    
                  <td>
                    {moment(row.invoice_date).format(
                      process.env.REACT_APP_FORMAT_DATE
                    )}
                  </td>
                  <td>{row.Customer.customer_name}</td>
                  <td>{row.total_amount}</td>
                  <td>
                    <ModalForm
                      buttonLabel="Edit"
                      item={row}
                      updateState={this.props.updateState}
                    />
                    <button
                      className="btn btn-danger button-margin-side"
                      onClick={() => this.handleModalDelete(row.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Delete Invoice</ModalHeader>
          <ModalBody>
            Are you sure want to delete invoice with all the details ?
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.handleDelete()}>
              Yes
            </Button>{" "}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { users, authentication, invoices } = state;
  const { user } = authentication;
  return {
    user,
    users,
    invoices,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    doFetchListInvoices: () => dispatch(invoiceActions.getListInvoices()),
    doDeleteInvoice: (param) => dispatch(invoiceActions.deleteInvoice(param)),
  };
};

const connectedHomePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
export { connectedHomePage as HomePage };
