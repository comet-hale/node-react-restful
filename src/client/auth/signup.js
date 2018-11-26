import React from 'react';
import { connect } from 'react-redux';
import { signup } from '../redux/actions';

const mapDispatchToProps = dispatch => ({
  signup: userData => dispatch(signup(userData))
});

class AppSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailAddress: '',
      username: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { emailAddress, username, password } = this.state;
    if (username && password) {
      this.props.signup({ emailAddress, username, password });
    }
    this.setState({ emailAddress: '', username: '', password: '' });
  }

  render() {
    const { username, password, emailAddress } = this.state;
    return (
      <div className="row container">
        <div
          className="container col-lg-6 col-lg-offset-6  
          col-sm-8 col-sm-offset-4 log-in"
        >
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={username}
                placeholder="Pick a username"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                className="form-control"
                name="emailAddress"
                value={emailAddress}
                placeholder="you@example.com"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={password}
                placeholder="Create a password"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-button">
              <button type="submit" className="btn btn-success btn-block">
                Sign up for FirstSite
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(AppSignUp);
