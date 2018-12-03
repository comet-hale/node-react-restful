import React from 'react';
import { connect } from 'react-redux';
import actionCreator from '../redux/actions/user.actions';
import FormErrors from './formErrors';

const mapStateToProps = state => {
  return { loginFlag: state.loginFlag };
};
const mapDispatchToProps = dispatch => ({
  login: userData => dispatch(actionCreator.login(userData))
});

class AppLogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      formErrors: { username: '', password: '' },
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
    let { usernameValid, passwordValid } = this.state;
    let fieldValidationErrors = this.state.formErrors;

    switch (fieldName) {
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
        usernameValid: usernameValid,
        passwordValid: passwordValid
      },
      this.validateForm
    );
  }
  validateForm() {
    const { usernameValid, passwordValid } = this.state;
    this.setState({
      formValid: usernameValid && passwordValid
    });
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  }

  handleSubmit(e) {
    e.preventDefault(); //default prevent get method action
    const { username, password } = this.state;
    this.props.login({ username, password });
  }
  componentWillReceiveProps() {
    this.props.history.push('/');
  }
  render() {
    const { username, password, formErrors, formValid } = this.state;
    return (
      <div className="row container">
        <div
          className="container col-lg-4 col-lg-offset-8 
          col-sm-6 col-sm-offset-6 log-in"
        >
          <form className="form" onSubmit={this.handleSubmit}>
            <h2>Sign in to FirstSite</h2>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                value={username}
                onChange={this.handleChange}
              />
              <FormErrors formErrors={{ username: formErrors.username }} />
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
              <FormErrors formErrors={{ username: formErrors.password }} />
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
  mapStateToProps,
  mapDispatchToProps
)(AppLogIn);
