import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import moment from "moment";
// import { homeActions } from '../actions';
import { invoiceActions } from "../actions";
import ModalForm from "../components/ModalForm";

class NewInvoicePage extends React.Component {
  state = {
    id: 0,
    invoice_number: "",
    invoice_date: "",
    customer_id: "",
    total_amount: "",
    location: "",
    hobby: "",
  };

  componentDidMount() {
    // this.props.dispatch(userActions.getAll());
    // this.props.doFetchListInvoices();
    if (this.props.item) {
      const {
        id,
        invoice_number,
        invoice_date,
        customer_id,
        total_amount,
      } = this.props.item;
      this.setState({
        id,
        invoice_number,
        invoice_date,
        customer_id,
        total_amount,
      });
    }

    this.props.doFetchListCustomers();
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitFormAdd = (e) => {
    e.preventDefault();
    const param = {
      invoice_number: this.state.invoice_number,
      invoice_date: this.state.invoice_date,
      customer_id: Number(this.state.customer_id),
      total_amount: Number(this.state.total_amount),
    };

    this.props.doAddInvoice(param);
  };

  submitFormEdit = (e) => {
    e.preventDefault();
    const param = {
      id: this.state.id,
      invoice_number: this.state.invoice_number,
      invoice_date: this.state.invoice_date,
      customer_id: Number(this.state.customer_id),
      total_amount: Number(this.state.total_amount),
    };

    this.props.doEditInvoice(param);
  };

  render() {
    const { invoices,customer } = this.props;

    return (
      <div className="col-md-12">
        <h1>New Invoice</h1>
        <Form
          onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}
          className="form-wrapper"
        >
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="invoice_number">Invoice Number</Label>
                <Input
                  type="text"
                  name="invoice_number"
                  id="invoice_number"
                  placeholder="Invoice Number"
                  onChange={this.onChange.bind(this)}
                  value={
                    this.state.invoice_number === null
                      ? ""
                      : this.state.invoice_number
                  }
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="invoice_date">Invoice Date</Label>
                <Input
                  type="date"
                  name="invoice_date"
                  id="invoice_date"
                  onChange={this.onChange.bind(this)}
                  value={
                    this.state.invoice_date === null
                      ? ""
                      : this.state.invoice_date
                  }
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="customer_id">Customer</Label>
                <Input
                  type="select"
                  name="customer_id"
                  id="customer_id"
                  onChange={this.onChange}
                  value={
                    this.state.customer_id === null
                      ? ""
                      : this.state.customer_id
                  }
                >
                  <option key={0} value=''>Choose Customer</option>
                  {customer.customer &&
                    customer.customer.data.map((row, index) => (
                      <option key={index} value={row.id}>
                        {row.customer_name}
                      </option>
                    ))}
                </Input>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="total_amount">Total Amount</Label>
                <Input
                  type="text"
                  name="total_amount"
                  id="total_amount"
                  disabled
                />
              </FormGroup>
            </Col>
          </Row>

          {/* <Button>Submit</Button> */}
          <Button className="float-right button-margin-side" type="submit">
            Save
          </Button>
        </Form>

        <h1>Detail Invoice</h1>
        {/* {this.props.invoices && 
            this.props.invoices.invoiceHeader && 
            this.props.invoices.invoiceHeader.data && 
            this.props.invoices.invoiceHeader.data.id &&  */}
            <FormGroup>
            <ModalForm
                buttonLabel="New"
                addItemToState={this.addItemToState}
                headerParam={invoices && invoices.invoiceHeader ? invoices.invoiceHeader.data:{}}
            />
            </FormGroup>
            {/* } */}

        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Item ID</th>
              <th scope="col">Item Name</th>
              <th scope="col">Qty</th>
              <th scope="col">Unit Price</th>
              <th scope="col">Amount</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* {invoices.reportList &&
                invoices.reportList.data.map((row, index) => (
                    // <li key={user.id}>
                    //     {user.firstName + ' ' + user.lastName}
                    // </li>
                    <tr key={index}>
                    <td>{row.Customer.customer_name}</td>
                    <td>{row.Customer.customer_phone}</td>
                    <td>{row.invoice_number}</td>
                    
                    <td>
                        {moment(row.invoice_date).format(
                        process.env.REACT_APP_FORMAT_DATE
                        )}
                    </td>
                    <td>{row.total_amount}</td>
                    </tr>
                ))} */}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { invoices, customer } = state;
  return {
    invoices,
    customer,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    // doFetchListInvoices: () => dispatch(homeActions.getListInvoices()),
    doFetchListCustomers: () => dispatch(invoiceActions.getCustomerList()),
    doAddInvoice: (data) => dispatch(invoiceActions.addInvoice(data)),
    doEditInvoice: (data) => dispatch(invoiceActions.editInvoice(data)),
  };
};

const connectedNewInvoicePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewInvoicePage);
export { connectedNewInvoicePage as NewInvoicePage };
