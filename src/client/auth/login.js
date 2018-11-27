import React from 'react';
import { connect } from 'react-redux';
import actionCreator from '../redux/actions';

const mapDispatchToProps = dispatch => ({
  login: userData => dispatch(actionCreator.login(userData))
});

class AppLogIn extends React.Component {
  //static typescript()
  constructor(props) {
    super(props);
    this.state = {
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
    e.preventDefault(); //default prevent get method action: url=/?,
    //so not to reload the page in server
    const { username, password } = this.state;
    if (username && password) {
      this.props.login({ username, password });
      this.setState({ username: '', password: '' });
    }
  }

  render() {
    const { username, password } = this.state;
    return (
      <div className="row container">
        <div
          className="container col-lg-4 col-lg-offset-8 
          col-sm-6 col-sm-offset-6 log-in"
        >
          <form className="form" onSubmit={this.handleSubmit}>
            <h2>Sign in to FirstSite</h2>
            <div className="form-group">
              <label>Username or email address</label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={username}
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
                onChange={this.handleChange}
              />
            </div>
            <div className="form-button">
              <button type="submit" className="btn btn-lg btn-success btn-block">
                Sign in
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
)(AppLogIn);
