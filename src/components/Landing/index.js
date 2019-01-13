import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

class LandingBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }
  }

  signUp = event => {
    const { email, password } = this.state;

    this.props.firebase
      .createUser(email, password)
      .then(authUser => {
        this.setState({ email: '', password: '' });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  signIn = event => {
    const { email, password } = this.state;

    this.props.firebase
      .signInUser(email, password)
      .then(authUser => {
        this.setState({ email: '', password: '' });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  }

  googleSignIn = event => {
    event.preventDefault();

    var provider = this.props.firebase.googleProvider;

    this.props.firebase
      .providerSignIn(provider)
      .then(authUser => {
        this.setState({ email: '', password: '' });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {email, password, error} = this.state;
    const {content, googleButton} = styles;

    return (
      <div>
        <div style={content}>
          <input
            name="email"
            value={email}
            type="text"
            onChange={this.onChange}
            placeholder="Email"
          />
          <input
            name="password"
            value={password}
            type="password"
            onChange={this.onChange}
            placeholder="Password"
          />
        </div>
        <div style={content}>
          <form onSubmit={this.signIn}>
            <button type="submit">Sign In</button>
          </form>
          <form onSubmit={this.signUp}>
            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div style={content}>
          <form onSubmit={this.googleSignIn}>
            <button style={googleButton} type="submit">Sign In With Google</button>
          </form>
        </div>
        {error && <p>{error.message}</p>}
      </div>
    );
  }
}

const Landing = withRouter(withFirebase(LandingBase));

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
  googleButton: {
    backgroundColor: '#55CCFF',
    border: 'none',
    borderRadius: '0.2rem',
    padding: '1rem',
    margin: '0.5rem'
  }
}

export default Landing;
