import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

class CreateCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: '',
      user_id: this.props.firebase.currentUser().uid,
      error: ''
    }
  }

  createCategory = event => {
    const {category, user_id} = this.state;

    this.props.firebase
      .createCategory(user_id, category)
      .then(result => {
        this.props.history.push(ROUTES.CATEGORIES);
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
    const {category, error} = this.state;

    return (
      <div className="container">
        <form onSubmit={this.createCategory}>
          <div className="form-group">
            <input
              name="category"
              value={category}
              type="text"
              onChange={this.onChange}
              placeholder="Category Name"
              className="form-control"
            />
          </div>
          <button className="btn btn-primary" type="submit">Create Category</button>
        </form>
        {error && <p>{error.message}</p>}
      </div>
    );
  }
}

export default withRouter(withFirebase(CreateCategory));
