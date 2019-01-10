import React, { Component } from 'react';
import { withFirebase } from '../Firebase';

class HomeBase extends Component {
  render() {
    const {container, content} = styles;

    return (
      <div style={container}>
        <div style={content}>
          {this.props.firebase.currentUser() ? this.props.firebase.currentUser().email : 'No one is logged in.'}
        </div>
      </div>
    );
  }
}

const styles = {
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    width: '60%',
    height: '10rem',
    padding: '1rem',
    margin: '0 auto'
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    width: '80%',
    height: '15rem',
    padding: '1rem',
    margin: '0 auto'
  }
}

const Home = withFirebase(HomeBase);

export default Home;