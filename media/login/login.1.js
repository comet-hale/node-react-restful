import React from 'react';
import { connect } from 'react-redux';
import actionCreator from '../redux/actions';
import FormErrors from './formErrors';
const mapDispatchToProps = dispatch => ({
  login: userData => dispatch(actionCreator.login(userData))
});

class AppLogIn extends React.Component {
  //static typescript()
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      formValid: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeState = this.changeState.bind(this);
  }
  componentDidUpdate() {
    console.log('user/form');
  }
  changeState(validState) {
    // console.log(validState);
    Object.keys(validState).map((stateName, i) => {
      if (this.state[stateName] !== validState[stateName]) {
        // this.setState({ [stateName]: validState[stateName] });
        console.log(this.state);
        // const { usernameValid, passwordValid } = this.state;
        if (this.state.usernameValid !== undefined && this.state.passwordValid !== undefined) {
          // console.log('user' + this.state.usernameValid);
          // console.log('pass' + this.state.passwordValid);
          // this.setState({ formValid: this.state.usernameValid && this.state.passwordValid });
        }
      }
    });
    console.log('form' + this.state.formValid);
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
    console.log(this.state['username']);
    const { username, password, formValid } = this.state;
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
              <FormValidator validInfo={{ username }} changeState={this.changeState} />
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
              <FormValidator2 validInfo={{ password }} changeState={this.changeState} />
            </div>
            <div className="form-button">
              <button
                type="submit"
                className="btn btn-lg btn-success btn-block"
                disabled={!formValid}
              >
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
