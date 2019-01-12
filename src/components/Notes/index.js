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
    console.log(note_id)

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
    const {notes_div, content} = styles;

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
      <div style={content}>
        <h1 style={notes_div}>Notes</h1>
        { 
          notes_data.map(note => 
            <div key={note.id} style={notes_div}>
              <label>Title: </label>
              <span onClick={this.viewNote.bind(this, note.id)}>
                {note.title}
              </span>
              <br/><br/>
            </div>
          )
        }
        <form onSubmit={this.createNote}>
          <button>Create Note</button>
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
  },
  content: {
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    width: '30rem',
    height: '60%',
    padding: '1rem',
    margin: '0 auto'
  }
}

export default withRouter(withFirebase(Notes));
