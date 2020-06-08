import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { Button, Form, FormGroup, Label, Input, Row, Col, FormFeedback } from "reactstrap";
import moment from "moment";
// import { homeActions } from '../actions';
import { invoiceActions } from "../actions";
import ModalForm from "../components/ModalForm";

class EditInvoicePage extends React.Component {
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
    const { invoices,customer, invoicesDetail } = this.props;
    console.log('invoicesDetail: ', invoicesDetail);

    return (
      <div className="col-md-12">
        <h1>Edit Invoice</h1>
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
                  required
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
                  required
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
                  required
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
             {invoicesDetail.invoiceDetailList &&
                invoicesDetail.invoiceDetailList.data.map((row, index) => (
                    // <li key={user.id}>
                    //     {user.firstName + ' ' + user.lastName}
                    // </li>
                    <tr key={index}>
                      <td>{row.Item.item_id}</td>
                    <td>{row.Item.item_name}</td>
                    <td>{row.qty}</td>
                    <td>{row.Item.unit_price}</td>
                    <td>{row.amount}</td>
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
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { invoices, customer, invoicesDetail } = state;
  return {
    invoices,
    customer,
    invoicesDetail,
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

const connectedEditInvoicePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditInvoicePage);
export { connectedEditInvoicePage as EditInvoicePage };