import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, FormGroup, Form, Label, Input, Spinner } from "reactstrap";
import { invoiceActions } from "../actions";
import ModalForm from "../components/ModalForm";

class ViewInvoicePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    // this.props.dispatch(userActions.getAll());
    this.props.doFetchInvoiceHeader(this.props.match.params.id);
    console.log('this.props.match.params.id: ', this.props.match.params.id);
  }

  componentDidUpdate(prevProps){
    if(this.props !== prevProps){

      // if(this.props.invoices !== prevProps.invoices){
      //   console.log('this.props.invoices: ', this.props.invoices);
      //   if(this.props.invoices && this.props.invoices.invoicesHeader){
      //     this.setState({
      //       data: this.props.invoices.invoicesHeader,
      //       loading: false,
      //     });

      //   }
       
      // }
    }
    
  }

  render() {
    const { invoices } = this.props;
    console.log(' render > invoices: ', invoices);


      return (
        <div className="col-md-12">
          <h1>Detail Invoice Page</h1>
          <FormGroup>
            <span>Company Inc.</span>
          </FormGroup>
           
            <div>
            {invoices && invoices.invoiceHeader && invoices.invoiceHeader.map((row,index)=> 
            <Form>
            
              <FormGroup row>
                <Label for="exampleEmail" sm={2}>Customer Name</Label>
                <Col sm={6}>
                  <Input plaintext value={row.Customer.customer_name} />
                </Col>
                <Label for="exampleEmail" sm={2}>Invoice #</Label>
                <Col sm={2}>
                  <Input plaintext value={row.invoice_number} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleEmail" sm={2}>Customer Address</Label>
                <Col sm={6}>
                  <Input plaintext value={row.Customer.customer_address} />
                </Col>
                <Label for="exampleEmail" sm={2}>Invoice Date</Label>
                <Col sm={2}>
                  <Input plaintext value={row.invoice_date} />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleEmail" sm={2}>Customer Phone</Label>
                <Col sm={6}>
                  <Input plaintext value={row.Customer.customer_phone} />
                </Col>
              </FormGroup>
               
            </Form>
            )}
            </div>
           
          
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Customer Name</th>
                <th scope="col">Customer Phone</th>
                <th scope="col">Last Invoice ID</th>
                <th scope="col">Last Invoice Date</th>
                <th scope="col">Last Invoice Amount</th>
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
  const { invoices } = state;
  console.log('invoices: ', invoices);
  return {
    invoices,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    doFetchInvoiceHeader: (param) => dispatch(invoiceActions.getOneInvoiceHeader(param)),
  };
};

const connectedViewInvoicePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewInvoicePage);
export { connectedViewInvoicePage as ViewInvoicePage };
