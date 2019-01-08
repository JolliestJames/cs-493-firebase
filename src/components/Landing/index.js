import React, { Component } from 'react';
import { withFirebase } from '../Firebase';

class LandingBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .createUser(email, password)
      .then(authUser => {
        this.setState({ email: '', password: '' });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {email, password} = this.state;

    return (
      <div>
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
        <form>
          <button type="submit">Sign In</button>
        </form>
        <form onSubmit={this.onSubmit}>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
}

const Landing = withFirebase(LandingBase);

export default Landing;
