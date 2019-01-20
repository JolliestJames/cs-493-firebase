import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

class Categories extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      title: '',
      body: '',
      categories: [],
      user_id: this.props.firebase.currentUser().uid,
    }
  }

  createCategory = event => {
    this.props.history.push(ROUTES.CREATE_CATEGORY);

    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  viewCategory(category_id, event) {
    this.props.history.push(
      {
        pathname: ROUTES.VIEW_CATEGORY,
        state: { category_id: category_id }
      }
    );

    event.preventDefault();
  }

  render() {
    const {categories} = this.state;
    const {notes_div} = styles;

    this.props.firebase.getCategories(this.state.user_id)
      .once('value').then(snapshot => {
        this.setState({
          categories: snapshot
        })
      })

    var categories_data = []
    
    categories.forEach(category => {
      categories_data.push({
        id: category.key,
        name: category.val().name
      })
    });

    return (
      <div className="container">
        <h1 style={notes_div}>Note Categories</h1>
        {
          categories_data.map(category => 
            <div key={category.id} style={notes_div} className="container">
              <span className="btn btn-link" onClick={this.viewCategory.bind(this, category.id)}>
                {category.name}
              </span>
              <br/><br/>
            </div>
          )
        }
        <form onSubmit={this.createCategory} className="">
          <button className="btn btn-primary">Create Category</button>
        </form>
      </div>
    );
  }
}

const styles = {
  notes_div: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}

export default withRouter(withFirebase(Categories));
