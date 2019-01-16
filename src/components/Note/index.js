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
      image_url: '',
      error: ''
    }

    this.props.firebase.getNote(this.state.note_id)
      .once('value').then(snapshot => {
        this.setState({
          title: snapshot.val().title,
          body: snapshot.val().body
        })
      })

    this.fileInput = React.createRef();
    this.getImage()
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

  uploadFile = event => {
    const {note_id} = this.state;
    const file = this.fileInput.current.files[0]

    this.props.firebase.imageRef(note_id).put(file)
      .then(result => {
        this.getImage()
      })
      .catch(error => {
        console.log(error);
      })

    event.preventDefault();
  }

  deleteFile = event => {
    const {note_id} = this.state;

    this.props.firebase.imageRef(note_id).delete()
      .then(result => {
        this.setState({image_url: ''})
      })
      .catch(error => {
        console.log(error);
      })

    event.preventDefault();
  }

  getImage() {
    const {note_id} = this.state;

    this.props.firebase.imageRef(note_id).getDownloadURL()
      .then(url => {
        this.setState({image_url: url})
      })
      .catch(error => {
        console.log(error)
        this.setState({image_url: ''})
      })
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {title, body, file, error} = this.state

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
          <label>Files:</label>
          <div className="form-group">
            <img alt="" src={this.state.image_url} className="img-fluid"/>
            <br/><br/>
            <input
              type="file"
              ref={this.fileInput}
              name="file"
              value={file}
              className="form-control-file border"
              onChange={this.uploadFile}
            />
            <br/>
            <button
              onClick={this.deleteFile}
              className="btn btn-warning">Delete File
            </button><br/>
          </div>
          <button type="submit" className="btn btn-primary">Update Note</button>
          <br/><br/>
        </form>
        <button className="btn btn-danger" onClick={this.deleteNote} type="submit">
          Delete Note
        </button><br/><br/>
        {error && <p>{error.message}</p>}
      </div>
    )
  }
}

export default withRouter(withFirebase(Note))
