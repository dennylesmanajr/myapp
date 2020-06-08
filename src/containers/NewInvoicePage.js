import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { Button, Form, FormGroup, Label, Input, Row, Col, FormFeedback } from "reactstrap";
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
    editMode: false,
  };

  componentDidMount() {
    
    if(this.props.location.pathname.includes('edit')){
      
      this.props.doFetchInvoiceHeader(this.props.match.params.invoice_id)
      this.props.doFetchListInvoicesDetail({
        invoice_id: this.props.match.params.invoice_id,
      });
    }
    // this.props.dispatch(userActions.getAll());
    // this.props.doFetchListInvoices();

    this.props.doFetchListCustomers();
  }

  componentDidUpdate(prevProps){
    if (this.props !== prevProps) {
      if(this.props.invoices !== prevProps.invoices){
        if(this.props.invoices && this.props.invoices.invoiceHeader){
          

            this.props.invoices.invoiceHeader.map((row,index) => {
              
              this.setState({
                id : row.id,
                invoice_number: row.invoice_number,
                invoice_date: row.invoice_date,
                customer_id: row.customer_id,
                total_amount: row.total_amount,
              });
              return null;

            })
        }
      }
    }
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
    

    return (
      <div className="col-md-12">
        <h1>{this.props.location.pathname.includes('edit')?`Edit Invoice ${this.state.invoice_number}`:'New Invoice'}</h1>
        <Form
          onSubmit={this.props.location.pathname.includes('edit') ? this.submitFormEdit : this.submitFormAdd}
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
                headerParam={invoices && invoices.invoiceHeader ? invoices.invoiceHeader[0]:{}}
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
    doFetchInvoiceHeader: (param) =>
      dispatch(invoiceActions.getOneInvoiceHeader(param)),
    doFetchListInvoicesDetail: (param) =>
      dispatch(invoiceActions.getListInvoicesDetail(param)),
  };
};

const connectedNewInvoicePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewInvoicePage);
export { connectedNewInvoicePage as NewInvoicePage };
