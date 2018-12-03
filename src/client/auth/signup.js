import React from 'react';
import { connect } from 'react-redux';
import actionCreator from '../redux/actions/user.actions';
import FormErrors from './formErrors';

const mapStateToProps = state => {
  return { loginFlag: state.loginFlag };
};
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
  }

  validateField(fieldName, value) {
    let { emailAddressValid, usernameValid, passwordValid } = this.state;
    let fieldValidationErrors = this.state.formErrors;

    switch (fieldName) {
      case 'emailAddress':
        emailAddressValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.emailAddress = emailAddressValid ? '' : 'Email is invalid';
        break;
      case 'username':
        usernameValid = value.length >= 6;
        fieldValidationErrors.username = usernameValid ? '' : 'Username is too short';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '' : 'Password is too short';
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
    const { emailAddressValid, usernameValid, passwordValid } = this.state;
    this.setState({
      formValid: emailAddressValid && usernameValid && passwordValid
    });
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const { emailAddress, username, password } = this.state;
    this.props.signup({ emailAddress, username, password });
  }
  componentWillReceiveProps() {
    this.props.history.push('/');
  }
  render() {
    const { username, password, emailAddress, formErrors, formValid } = this.state;
    return (
      <div className="row container">
        <div
          className="container col-lg-6 col-lg-offset-6
          col-sm-8 col-sm-offset-4 log-in"
        >
          <form className="form" onSubmit={this.handleSubmit}>
            <h2>Sign up</h2>
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
              <FormErrors formErrors={{ username: formErrors.username }} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="emailAddress"
                value={emailAddress}
                placeholder="you@example.com"
                onChange={this.handleChange}
              />
              <FormErrors formErrors={{ emailAddress: formErrors.emailAddress }} />
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
              <FormErrors formErrors={{ password: formErrors.password }} />
            </div>
            <div className="form-button">
              <button type="submit" className="btn btn-success btn-block" disabled={!formValid}>
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
  mapStateToProps,
  mapDispatchToProps
)(AppSignUp);
