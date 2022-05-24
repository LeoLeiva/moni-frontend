import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
      hiddenButton: true
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;

    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }

    const activeItem = { ...this.state.activeItem, [name]: value };

    this.setState({ activeItem });
  };

  documentChange = (e) => {
    let { name, value } = e.target;

    // if (e.target.type === "checkbox") {
    //   value = e.target.checked;
    // }
    // const headers = {
    //   'credential': 'ZGpzOTAzaWZuc2Zpb25kZnNubm5u'
    // };

    const axios = require("axios");
    axios.get(`https://api.moni.com.ar/api/v4/scoring/pre-score/${value}`)
      .then(response => {
        const status = response.data.status
        if (status && status === "approve") {
          document.getElementById('checking').innerHTML = "Aprobado para pedir credito";
          this.setState({ hiddenButton: false});
        } else if (status && status === "rejected") {
          document.getElementById('checking').innerHTML = "No podemos otorgarte un credito";
          this.setState({ hiddenButton: true});
        } else {
          document.getElementById('checking').innerHTML = "";
          this.setState({ hiddenButton: true});
        }
      })
      .catch((err) => console.log(err));

    const activeItem = { ...this.state.activeItem, [name]: value };

    this.setState({
      activeItem,
    });
  };

  render() {
    const { toggle, onSave } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Formulario de pedido</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="todo-title">Nombre</Label>
              <Input
                type="text"
                id="todo-title"
                name="first_name"
                value={this.state.activeItem.first_name}
                onChange={this.handleChange}
                placeholder="Nombre"
              />
            </FormGroup>
            <FormGroup>
              <Label for="todo-description">Apellido</Label>
              <Input
                type="text"
                id="todo-description"
                name="last_name"
                value={this.state.activeItem.last_name}
                onChange={this.handleChange}
                placeholder="Apellido"
              />
            </FormGroup>
            <FormGroup>
              <Label for="todo-description">Genero</Label>
              <Input
                type="text"
                id="todo-description"
                name="gender"
                value={this.state.activeItem.gender}
                onChange={this.handleChange}
                placeholder="Genero"
              />
            </FormGroup>
            <FormGroup>
              <Label for="todo-description">E-mail</Label>
              <Input
                type="email"
                id="todo-description"
                name="email"
                value={this.state.activeItem.email}
                onChange={this.handleChange}
                placeholder="Mail"
              />
            </FormGroup>
            <FormGroup>
              <Label for="todo-description">Documento</Label>
              <Input
                type="text"
                id="todo-description"
                name="document_number"
                value={this.state.activeItem.document_number}
                onChange={this.documentChange}
                placeholder="Documento"
              />
            </FormGroup>
            <FormGroup>
              <Label for="todo-description">Monto</Label>
              <Input
                type="text"
                id="todo-description"
                name="amount"
                value={this.state.activeItem.amount}
                onChange={this.handleChange}
                placeholder="Monto"
              />
            </FormGroup>
            <FormGroup check>
              <Label id="checking" for="todo-description"></Label>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            id="button-save"
            color="success"
            disabled={this.state.hiddenButton}
            onClick={() => onSave(this.state.activeItem)}
          >
            Pedir prestamo
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
