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
    const {content} = styles;

    return (
      <div style={content}>
        <form onSubmit={this.createNote}>
          <input
            name="title"
            value={title}
            type="text"
            onChange={this.onChange}
            placeholder="Title"
          />
          <input
            name="body"
            value={body}
            type="text"
            onChange={this.onChange}
            placeholder="Body"
          />
          <button type="submit">Create Note</button>
        </form>
      </div>
    );
  }
}

const styles = {
  content: {
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    width: '30rem',
    height: '60%',
    padding: '1rem',
    margin: '0 auto'
  }
}

export default withRouter(withFirebase(CreateNote));
