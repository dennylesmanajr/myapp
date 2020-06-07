import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { invoiceActions } from "../actions";
import ModalForm from "../components/ModalForm";

class ReportPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {
    // this.props.dispatch(userActions.getAll());
    this.props.doFetchListInvoicesReport();
  }

  render() {
    const { invoices } = this.props;

    return (
      <div className="col-md-12">
        <h1>Report Page</h1>
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
            {invoices.reportList &&
              invoices.reportList.data.map((row, index) => (
                // <li key={user.id}>
                //     {user.firstName + ' ' + user.lastName}
                // </li>
                <tr key={index}>
                 <td>{row.Customer.customer_name}</td>
                 <td>{row.Customer.customer_phone}</td>
                 <td>{row.invoice_number}</td>
                  {/* <th scope="row">{row.invoice_number}</th> */}
                  <td>
                    {moment(row.invoice_date).format(
                      process.env.REACT_APP_FORMAT_DATE
                    )}
                  </td>
                  <td>{row.total_amount}</td>
                </tr>
              ))}
          </tbody>
        </table>
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
    doFetchListInvoicesReport: () => dispatch(invoiceActions.getListInvoicesReport()),
  };
};

const connectedReportPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportPage);
export { connectedReportPage as ReportPage };
