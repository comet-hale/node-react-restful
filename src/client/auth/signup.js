import React from 'react';
import { connect } from 'react-redux';
import actionCreator from '../redux/actions';
import FormErrors from './formErrors';

const mapDispatchToProps = dispatch => ({
  signup: userData => dispatch(actionCreator.signup(userData))
});

class AppSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailAddress: '',
      username: '',
      password: '',
      formErrors: { emailAddress: '', username: '', password: '' },
      emailAddressValid: false,
      usernameValid: false,
      passwordValid: false,
      formValid: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateField = this.validateField.bind(this);
    this.validateForm = this.validateForm.bind(this);
    // this.errorClass = this.errorClass;
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailAddressValid = this.state.emailAddressValid;
    let usernameValid = this.state.usernameValid;
    let passwordValid = this.state.passwordValid;

    switch (fieldName) {
      case 'emailAddress':
        emailAddressValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.emailAddress = emailAddressValid ? '' : ' is invalid';
        break;
      case 'username':
        usernameValid = value.length >= 6;
        fieldValidationErrors.username = usernameValid ? '' : ' is too short';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '' : ' is too short';
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailAddressValid: emailAddressValid,
        usernameValid: usernameValid,
        passwordValid: passwordValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid:
        this.state.emailAddressValid && this.state.usernameValid && this.state.passwordValid
    });
  }

  // errorClass(error) {
  //   return error.length === 0 ? '' : 'has-error';
  // }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
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
            {/* <div className="panel panel-default">
              <FormErrors formErrors={this.state.formErrors} />
            </div> */}
            <h2>Sign up</h2>
            <div
              className="form-group"
              // className={`form-group
              // ${this.errorClass(this.state.formErrors.username)}`}
            >
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
            <div
              className="form-group"
              // className={`form-group
              // ${this.errorClass(this.state.formErrors.emailAddress)}`}
            >
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="emailAddress"
                value={emailAddress}
                placeholder="you@example.com"
                onChange={this.handleChange}
              />
            </div>
            <div
              className="form-group"
              // className={`form-group
              // ${this.errorClass(this.state.formErrors.password)}`}
            >
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
              <button
                type="submit"
                className="btn btn-success btn-block"
                disabled={!this.state.formValid}
              >
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
