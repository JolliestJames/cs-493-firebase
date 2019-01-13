import React, {Component} from 'react';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
// import * as ROUTES from '../../constants/routes';

class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      note_id: props.history.location.state.note_id
    }
  }

  updateNote = event => {
    const {note_id, title, body} = this.state;

    this.props.firebase
      .updateNote(note_id, title, body)
      .then(result => {})
      .catch(error => {this.setState({error})});

    event.preventDefault();
  } 

  render() {
    const {content, body} = styles

    this.props.firebase.getNote(this.state.note_id)
      .once('value').then(snapshot => {
        console.log(snapshot.val().title);
        this.setState({
          title: snapshot.val().title,
          body: snapshot.val().body
        })
      })

    return (
      <div style={content}>
        {this.state.title}
        <div style={body}>
          {this.state.body}
        </div>
      </div>
    )
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
  },
  body: {
    backgroundColor: '#55CCFF',
    border: 'none',
    borderRadius: '0.2rem',
    padding: '1rem',
    margin: '0.5rem'
  }
}

export default withRouter(withFirebase(Note))