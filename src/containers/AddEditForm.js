import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { invoiceActions } from '../actions';

class AddEditForm extends React.Component {
  state = {
    id: 0,
    invoice_number: '',
    invoice_date: '',
    customer_id: '',
    phone: '',
    location: '',
    hobby: ''
  }

  onChange = (e) => {
    console.log('e: ', e.target.value);
    this.setState({[e.target.name]: e.target.value})
  }

  submitFormAdd = e => {
    e.preventDefault()
    const param = {
      invoice_number: this.state.invoice_number,
      invoice_date: this.state.invoice_date,
      customer_id: Number(this.state.customer_id),
    }
    
    this.props.doAddInvoice(param);
    this.props.toggle();
    // fetch('http://localhost:3000/crud', {
    //   method: 'post',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     invoice_number: this.state.invoice_number,
    //     invoice_date: this.state.invoice_date,
    //     customer_id: this.state.customer_id,
    //     phone: this.state.phone,
    //     location: this.state.location,
    //     hobby: this.state.hobby
    //   })
    // })
    //   .then(response => response.json())
    //   .then(item => {
    //     if(Array.isArray(item)) {
    //       this.props.addItemToState(item[0])
    //       this.props.toggle()
    //     } else {
    //       console.log('failure')
    //     }
    //   })
    //   .catch(err => console.log(err))

    
  }

  submitFormEdit = e => {
    e.preventDefault()
    const param = {
      id: this.state.id,
      invoice_number: this.state.invoice_number,
      invoice_date: this.state.invoice_date,
      customer_id: Number(this.state.customer_id),
    }
    
    this.props.doEditInvoice(param);
    this.props.toggle();
    // fetch('http://localhost:3000/crud', {
    //   method: 'put',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     id: this.state.id,
    //     invoice_number: this.state.invoice_number,
    //     invoice_date: this.state.invoice_date,
    //     customer_id: this.state.customer_id,
    //     phone: this.state.phone,
    //     location: this.state.location,
    //     hobby: this.state.hobby
    //   })
    // })
    //   .then(response => response.json())
    //   .then(item => {
    //     if(Array.isArray(item)) {
    //       // console.log(item[0])
    //       this.props.updateState(item[0])
    //       this.props.toggle()
    //     } else {
    //       console.log('failure')
    //     }
    //   })
    //   .catch(err => console.log(err))
  }

  componentDidMount(){
    // if item exists, populate the state with proper data
    if(this.props.item){
      const { id, invoice_number, invoice_date, customer_id } = this.props.item
      this.setState({ id, invoice_number, invoice_date, customer_id })
    }

    this.props.doFetchListCustomers();
  }

  render() {

    const { invoices } = this.props;
    console.log('invoices: ', invoices);
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="invoice_number">Invoice Number</Label>
          <Input type="text" name="invoice_number" id="invoice_number" onChange={this.onChange.bind(this)} value={this.state.invoice_number === null ? '' : this.state.invoice_number} />
        </FormGroup>
        <FormGroup>
          <Label for="invoice_date">Invoice Date</Label>
          <Input type="date" name="invoice_date" id="invoice_date" onChange={this.onChange.bind(this)} value={this.state.invoice_date === null ? '' : this.state.invoice_date}  />
        </FormGroup>
        <FormGroup>
            <Label for="customer_id">Customer</Label>
            <Input type="select" 
            name="customer_id" 
            id="customer_id"
            onChange={this.onChange}
            value={this.state.customer_id === null ? '' : this.state.customer_id} 
            >
            {invoices.customer && invoices.customer.data.map((row, index) =>
                <option key={index} value={row.id}>{row.customer_name}</option>
            )}
            </Input>
        </FormGroup>
        {/* <Button>Submit</Button> */}
        <Button className="float-right button-margin-tb" onClick={this.toggle}>Submit</Button>
      </Form>
    );
  }
}

function mapStateToProps(state) {
    const { invoices } = state;
    // const { user } = authentication;
    return {
        invoices,
        // users,
        // home,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        doFetchListCustomers: () => dispatch(invoiceActions.getCustomerList()),
        doAddInvoice: (data) => dispatch(invoiceActions.addInvoice(data)),
        doEditInvoice: (data) => dispatch(invoiceActions.editInvoice(data)),
    }
}

const connectedAddEditForm = connect(mapStateToProps, mapDispatchToProps)(AddEditForm);
export { connectedAddEditForm as AddEditForm };