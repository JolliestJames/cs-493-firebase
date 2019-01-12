import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

class Notes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: ''
    }
  }

  createNote = event => {
    this.props.history.push(ROUTES.CREATE_NOTE);

    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.createNote}>
          <button>Create Note</button>
        </form>
      </div>
    );
  }
}

export default withRouter(withFirebase(Notes));
