import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

class Notes extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      title: '',
      body: '',
      notes: []
    }
  }

  createNote = event => {
    this.props.history.push(ROUTES.CREATE_NOTE);

    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  viewNote(note_id, event) {
    this.props.history.push(
      {
        pathname: ROUTES.VIEW_NOTE,
        state: { note_id: note_id }
      }
    );

    event.preventDefault();
  }

  render() {
    const {notes} = this.state;
    const {notes_div} = styles;

    this.props.firebase.getNotes().once('value').then(snapshot => {
      this.setState({
        notes: snapshot
      });
    });

    var notes_data = []
    
    notes.forEach(note => {
      notes_data.push({
        id: note.key,
        title: note.val().title,
        body: note.val().body
      })
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

export default withRouter(withFirebase(Notes));
