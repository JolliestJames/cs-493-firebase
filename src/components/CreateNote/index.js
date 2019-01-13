import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

class CreateNote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: ''
    }
  }

  createNote = event => {
    const {title, body} = this.state;

    this.props.firebase
      .createNote(title, body)
      .then(result => {
        this.props.history.push(ROUTES.NOTES);
      })
      .catch(error => {
        this.setState({ error });
      })

    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {title, body} = this.state;

    return (
      <div className="container">
        <form onSubmit={this.createNote}>
          <div className="form-group">
            <input
              name="title"
              value={title}
              type="text"
              onChange={this.onChange}
              placeholder="Title"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              name="body"
              value={body}
              type="text"
              onChange={this.onChange}
              placeholder="Body"
              className="form-control"
            />
          </div>
          <button className="btn btn-primary" type="submit">Create Note</button>
        </form>
      </div>
    );
  }
}

export default withRouter(withFirebase(CreateNote));
