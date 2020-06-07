import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import moment from "moment";
// import { homeActions } from '../actions';
import { invoiceActions } from "../actions";

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
    if(this.props.item){
        const { id, invoice_number, invoice_date, customer_id, total_amount } = this.props.item
        this.setState({ id, invoice_number, invoice_date, customer_id, total_amount, })
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
      total_amount: Number(this.state.total_amount)
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
    const { invoices } = this.props;

    return (
      <div className="col-md-12">
        <h1>New Invoice</h1>
        <Form
          onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}
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
                  {invoices.customer &&
                    invoices.customer.data.map((row, index) => (
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
                  placeholder="Total Amount"
                />
              </FormGroup>
            </Col>
          </Row>

          
          {/* <Button>Submit</Button> */}
          <Button
            className="float-right button-margin-side"
            type="submit"
          >
            Save
          </Button>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { invoices } = state;
  return {
    invoices,
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
