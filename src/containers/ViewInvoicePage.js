import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {Decimal} from "decimal.js";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  FormGroup,
  Form,
  Label,
  Input,
  Spinner,
} from "reactstrap";
import { invoiceActions } from "../actions";
import ModalForm from "../components/ModalForm";

class ViewInvoicePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subTotal: 0,
      tax: 0,
      total: 0,
    };
  }
  componentDidMount() {
    // this.props.dispatch(userActions.getAll());
    this.props.doFetchInvoiceHeader(this.props.match.params.id);
    this.props.doFetchListInvoicesDetail({
      invoice_id: this.props.match.params.id,
    });
    
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if(this.props.invoicesDetail !== prevProps.invoicesDetail){
        
        if(this.props.invoicesDetail.invoiceDetailList && this.props.invoicesDetail.invoiceDetailList.data){
          var subTotal = 0;
          var total = 0;
          var tax = 0;
          this.props.invoicesDetail.invoiceDetailList.data.map((row,index) => 
            subTotal+=Math.round(row.amount)
              
            );
            console.log('subTotal: ', subTotal);
            // subTotal = subTotal;
            tax = (subTotal*10/100);
            console.log('tax: ', tax);
            total = (subTotal+tax)
            console.log('total: ', total);

            this.setState({
              subTotal: subTotal,
              tax,
              total,
            })
          }
      }
    }
  }

  render() {
    const { invoices, invoicesDetail } = this.props;

    return (
      <div className="col-md-12">
        <h1>Detail Invoice Page</h1>
        <FormGroup>
          <span>Company Inc.</span>
        </FormGroup>

        <div>
          {invoices &&
            invoices.invoiceHeader &&
            invoices.invoiceHeader.map((row, index) => (
              <Form>
                <FormGroup row>
                  <Label for="exampleEmail" sm={2}>
                    Customer Name
                  </Label>
                  <Col sm={6}>
                    <Input plaintext value={row.Customer.customer_name} />
                  </Col>
                  <Label for="exampleEmail" sm={2}>
                    Invoice #
                  </Label>
                  <Col sm={2}>
                    <Input plaintext value={row.invoice_number} />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleEmail" sm={2}>
                    Customer Address
                  </Label>
                  <Col sm={6}>
                    <Input plaintext value={row.Customer.customer_address} />
                  </Col>
                  <Label for="exampleEmail" sm={2}>
                    Invoice Date
                  </Label>
                  <Col sm={2}>
                    <Input plaintext value={row.invoice_date} />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleEmail" sm={2}>
                    Customer Phone
                  </Label>
                  <Col sm={6}>
                    <Input plaintext value={row.Customer.customer_phone} />
                  </Col>
                </FormGroup>
              </Form>
            ))}
        </div>

        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Item ID</th>
              <th scope="col">Item Name</th>
              <th scope="col">Qty</th>
              <th scope="col">Unit Price</th>
              <th scope="col">Amount</th>
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
                </tr>
              ))}
              <tr key="subtotal">
                <td></td>
                <td>Sub Total</td>
                <td></td>
                <td></td>
                <td>{this.state.subTotal}</td>
              </tr>
              <tr key="tax">
                <td></td>
                <td>Tax (10%)</td>
                <td></td>
                <td></td>
                <td>{this.state.tax}</td>
              </tr>
              <tr key="total">
                <td></td>
                <td>Total</td>
                <td></td>
                <td></td>
                <td>{this.state.total}</td>
              </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { invoices, invoicesDetail } = state;
  
  return {
    invoices,
    invoicesDetail,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    doFetchInvoiceHeader: (param) =>
      dispatch(invoiceActions.getOneInvoiceHeader(param)),
    doFetchListInvoicesDetail: (param) =>
      dispatch(invoiceActions.getListInvoicesDetail(param)),
  };
};

const connectedViewInvoicePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewInvoicePage);
export { connectedViewInvoicePage as ViewInvoicePage };
