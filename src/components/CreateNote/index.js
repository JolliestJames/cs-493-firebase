import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

class CreateNote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      user_id: this.props.firebase.currentUser().uid,
      category_id: props.history.location.state.category_id,
      error: ''
    }
  }

  createNote = event => {
    const {title, body, user_id, category_id} = this.state;

    this.props.firebase
      .createNote(user_id, title, body, category_id)
      .then(result => {
        this.props.history.push(
          {
            pathname: ROUTES.VIEW_CATEGORY,
            state: { category_id: this.state.category_id }
          }
        );
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
    const {title, body, error} = this.state;

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
        {error && <p>{error.message}</p>}
      </div>
    );
  }
}

export default withRouter(withFirebase(CreateNote));
