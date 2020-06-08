import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { invoiceActions } from '../actions';

class AddEditForm extends React.Component {

  constructor(props){
    super(props);
    console.log('this.props.headerParam: ', this.props.headerParam);
    this.state = {
      id: 0,
      invoice_id: this.props.headerParam.id,
      qty: 0,
      unit_price: 0,
      item_ref_id: '',
      amount: ''
    }

  }
  
  onChange = (e) => {
    console.log('e: ', e.target.value);
    this.setState({[e.target.name]: e.target.value})
  }

  submitFormAdd = e => {
    e.preventDefault()
    const param = {
      invoice_id: this.state.invoice_id,
      item_ref_id: this.state.item_ref_id,
      qty: Number(this.state.qty),
      amount: Number(this.state.amount),
    }
    
    this.props.doAddInvoiceDetail(param);
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
      id: this.state.invoice,
      invoice_number: this.state.invoice_number,
      invoice_date: this.state.invoice_date,
      customer_id: Number(this.state.customer_id),
    }
    
    this.props.doEditInvoiceDetail(param);
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
      const { id, invoice_id, qty, amount, item_ref_id } = this.props.item
      this.setState({ id, invoice_id, qty, amount, item_ref_id })
    }

    this.props.doFetchListItems();
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state !== prevState){
      console.log('prevState: ', prevState);
      console.log('this.state: ', this.state);

      if(this.state.item_ref_id !== prevState.item_ref_id){
        this.searchUnitPrice();
      }

      if(this.state.unit_price !== prevState.unit_price || this.state.qty !== prevState.qty){
        if(this.state.unit_price > 0 && this.state.qty > 0){
          const amount = Number(this.state.unit_price*this.state.qty).toFixed(2);
          console.log('amount: ', amount);
          this.setState({
            amount
          });
        }
      }


    }

  }

  searchUnitPrice(){
    if(this.props.items && this.props.items.items && this.props.items.items.data){
      const itemRow = this.props.items.items.data.filter((row) => row.id === Number(this.state.item_ref_id));
      if(itemRow && itemRow.length > 0){
        this.setState({
          unit_price: itemRow[0].unit_price,
        })
        return itemRow[0].unit_price;
      }
    }
    
    return '';
  }

  render() {
    console.log(this.state);
    const { items } = this.props;
    console.log('items: ', items);
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        {/* <FormGroup>
          <Label for="invoice_number">Invoice Number</Label>
          <Input type="text" name="invoice_number" id="invoice_number" onChange={this.onChange.bind(this)} value={this.state.invoice_number === null ? '' : this.state.invoice_number} />
        </FormGroup>
        <FormGroup>
          <Label for="invoice_date">Invoice Date</Label>
          <Input type="date" name="invoice_date" id="invoice_date" onChange={this.onChange.bind(this)} value={this.state.invoice_date === null ? '' : this.state.invoice_date}  />
        </FormGroup> */}
        <FormGroup>
            <Label for="item_ref_id">Items</Label>
            <Input type="select" 
            name="item_ref_id" 
            id="item_ref_id"
            onChange={this.onChange}
            value={this.state.item_ref_id === null ? '' : this.state.item_ref_id} 
            >
            <option key={0} value=''>Choose Item</option>
            {items.items && items.items.data.map((row, index) =>
                <option key={index+1} value={row.id}>{row.item_name}</option>
            )}
            </Input>
        </FormGroup>
        <FormGroup>
          <Label for="unit_price">Unit Price</Label>
          <Input type="number" readOnly name="unit_price" id="unit_price" value={this.state.unit_price}  />
        </FormGroup>
        <FormGroup>
          <Label for="qty">Quantity</Label>
          <Input type="number" name="qty" id="qty" onChange={this.onChange} value={this.state.invoice_date === null ? '' : this.state.invoice_date}  />
        </FormGroup>
        <FormGroup>
          <Label for="amount">Amount</Label>
          <Input type="text" pattern="[0-9]*" readOnly name="amount" id="amount" value={this.state.amount}  />
        </FormGroup>
        <Button className="float-right button-margin-tb" onClick={this.toggle}>Submit</Button>
      </Form>
    );
  }
}

function mapStateToProps(state) {
    const { items } = state;
    // const { user } = authentication;
    return {
      items,
        // users,
        // home,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        doFetchListItems: () => dispatch(invoiceActions.getListItems()),
        doAddInvoiceDetail: (data) => dispatch(invoiceActions.addInvoiceDetail(data)),
        doEditInvoiceDetail: (data) => dispatch(invoiceActions.editInvoiceDetail(data)),
    }
}

const connectedAddEditForm = connect(mapStateToProps, mapDispatchToProps)(AddEditForm);
export { connectedAddEditForm as AddEditForm };