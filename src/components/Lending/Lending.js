import React, { Component } from "react";
import axios from "axios";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

class Lending extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewActives: false,
      todoList: [],
      modal: false,
      activeItem: {
        client: "",
        amount: "",
        status: "",
      },
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("http://127.0.0.1:8000/api/lending/")
      .then((res) => this.setState({ todoList: res.data }))
      .catch((err) => console.log(err));
    };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

//   handleSubmit = (item) => {
//     this.toggle();

//     // if (item.document_number) {
//     //   // const headers = {'X-CSRFTOKEN': Token};
//     //   const headers = {"Authorization": "Token b737735a17f4df57e54a46bbeb73e2e996be7631"};
//     //   axios
//     //     .put(`http://127.0.0.1:8000/api/client/${item.document_number}/`, item, {headers: headers})
//     //     .then((res) => this.refreshList());
//     //   return;
//     // }
//     axios
//       .post("http://127.0.0.1:8000/api/client/create/", item)
//       .then((res) => this.refreshList());
//   };

//   handleDelete = (item) => {
//     axios
//       .delete(`http://127.0.0.1:8000/api/client/${item.document_number}/`)
//       .then((res) => this.refreshList());
//   };

//   editItem = (item) => {
//     this.setState({ activeItem: item, modal: !this.state.modal });
//   };

//   displayCompleted = (status) => {
//     if (status) {
//       return this.setState({ viewActives: true });
//     }

//     return this.setState({ viewActives: false });
//   };

  renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewActives ? "nav-link active" : "nav-link"}
        >
          Activos
        </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewActives ? "nav-link" : "nav-link active"}
        >
          Inactivos
        </span>
      </div>
    );
  };

  renderItems = () => {
    const { viewActives } = this.state;
    const newItems = this.state.todoList.filter(
      (item) => item.is_active === viewActives
    );

    return newItems.map((item) => (
      <li
        key={item.document_number}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            this.state.viewActives ? "completed-todo" : ""
          }`}
          title={item.first_name}
        >
          {item.first_name}
        </span>
        <span>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => this.editItem(item)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => this.handleDelete(item)}
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };

  render() {
    return (
      <main className="container">
        <h1 className="text-white text-uppercase text-center my-4">Prestamos YA</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              {this.renderTabList()}
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default Lending;
