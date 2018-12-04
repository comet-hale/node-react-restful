import React from 'react';
import { connect } from 'react-redux';
import validate from './validate';
import actionCreator from '../redux/actions/user.actions';

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
      formValid: { emailAddress: false, username: false, password: false }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      const { valid, error } = validate.validateField(name, value);
      let formErrors = this.state.formErrors;
      let formValid = this.state.formValid;
      formValid[name] = valid;
      formErrors[name] = error;
      this.setState({
        formErrors: formErrors,
        formValid: formValid
      });
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
              <div className="form-error">
                <p>{formErrors.username}</p>
              </div>
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
              <div className="form-error">
                <p>{formErrors.emailAddress}</p>
              </div>
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
              <div className="form-error">
                <p>{formErrors.password}</p>
              </div>
            </div>
            <div className="form-button">
              <button
                type="submit"
                className="btn btn-success btn-block"
                disabled={!(formValid.username && formValid.emailAddress && formValid.password)}
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
  mapStateToProps,
  mapDispatchToProps
)(AppSignUp);
