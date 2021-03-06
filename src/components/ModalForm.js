import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import {AddEditForm} from '../containers/AddEditForm'

class ModalForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false
    }
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  render() {
      const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>

      const label = this.props.buttonLabel
      const disabled = this.props.buttonDisabled

      let button = ''
      let title = ''

      if(label === 'Edit'){
        button = <Button
                  color="primary"
                  className="button-margin-side"
                  onClick={this.toggle}
                  // style={{float: "left", marginRight:"10px"}}
                  >{label}
                </Button>
        title = 'Edit Item'
      } else {
        button = <Button
                  color="primary"
                  className="float-right button-margin-tb"
                  onClick={this.toggle}
                  // style={{float: "left", marginRight:"10px"}}
                  >{label}
                </Button>
        title = 'Add New Item'
      }


      return (
      <div>
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle} close={closeBtn}>{title}</ModalHeader>
          <ModalBody>
            <AddEditForm
              addItemToState={this.props.addItemToState}
              updateState={this.props.updateState}
              toggle={this.toggle}
              item={this.props.item}
              headerParam={this.props.headerParam}
              />
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default ModalForm