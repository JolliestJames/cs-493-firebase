import React, {Component} from 'react';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      note_id: props.history.location.state.note_id,
      error: ''
    }

    this.props.firebase.getNote(this.state.note_id)
      .once('value').then(snapshot => {
        this.setState({
          title: snapshot.val().title,
          body: snapshot.val().body
        })
      })
  }

  deleteNote = event => {
    const {note_id} = this.state;

    this.props.firebase.deleteNote(note_id)
      .then(result => {
        this.props.history.push(ROUTES.NOTES);
      })
      .catch(error => {
        this.setState({error});
      })

    event.preventDefault();
  }

  updateNote = event => {
    const {note_id, title, body} = this.state;
    this.props.firebase
      .updateNote(note_id, title, body)
      .then(result => {
        this.props.history.push(ROUTES.NOTES);
      })
      .catch(error => {this.setState({error})});

    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {title, body, error} = this.state
    const {container, note_title, note_content, delete_button} = styles

    return (
      <div className="container">
        <form onSubmit={this.updateNote}>
          <div className="form-group">
            <label>Title: </label>
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
          <label>Body: </label>
            <textarea
              name="body"
              value={body}
              onChange={this.onChange}
              placeholder="Body"
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary">Update Note</button>
        </form>
        <br/>
        <button className="btn btn-danger" onClick={this.deleteNote} type="submit">Delete Note</button>
        {error && <p>{error.message}</p>}
      </div>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    backgroundColor: '#DDDDDD',
    width: '30rem',
    height: '60%',
    padding: '1rem',
    margin: '0 auto'
  },
  note_title: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'o auto'
  },
  note_content: {
    justifyContent: 'center',
    backgroundColor: '#FFFFCC',
    border: 'none',
    borderRadius: '0.05rem',
    padding: '1rem',
    margin: '0.5rem'
  }
}

export default withRouter(withFirebase(Note))