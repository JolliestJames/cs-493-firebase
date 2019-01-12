import React, {Component} from 'react';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
// import * as ROUTES from '../../constants/routes';

class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      note_id: props.history.location.state.note_id
    }
  }

  render() {
    return (
      <div>{this.state.note_id}</div>
    )
  }
}

export default withRouter(withFirebase(Note))