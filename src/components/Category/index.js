import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

class Category extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      title: '',
      body: '',
      notes: [],
      user_id: this.props.firebase.currentUser().uid,
      category_id: props.history.location.state.category_id
    }
  }

  createNote = event => {
    this.props.history.push(
      {
        pathname: ROUTES.CREATE_NOTE,
        state: { category_id: this.state.category_id }
      }
    );

    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  viewNote(note_id, event) {
    this.props.history.push(
      {
        pathname: ROUTES.VIEW_NOTE,
        state: { note_id: note_id, category_id: this.state.category_id }
      }
    );

    event.preventDefault();
  }

  render() {
    const {notes, user_id} = this.state;
    const {notes_div} = styles;

    this.props.firebase.getNotes(user_id).once('value').then(snapshot => {
      this.setState({
        notes: snapshot
      });
    });

    var notes_data = []
    
    notes.forEach(note => {
      if (this.state.category_id === note.val().category_id) {
        notes_data.push({
          id: note.key,
          title: note.val().title,
          body: note.val().body,
          category_id: note.val().category_id
        })
      }
    });

    return (
      <div className="container">
        <h1 style={notes_div}>Notes</h1>
        {
          notes_data.map(note => 
            <div key={note.id} style={notes_div} className="container">
              <span className="btn btn-link" onClick={this.viewNote.bind(this, note.id)}>
                {note.title}
              </span>
              <br/><br/>
            </div>
          )
        }
        <form onSubmit={this.createNote} className="">
          <button className="btn btn-primary">Create Note</button>
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

export default withRouter(withFirebase(Category));
