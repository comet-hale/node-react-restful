import React from 'react';
import { connect } from 'react-redux';
import actionCreator from '../redux/actions/user.actions';
import FormErrors from './formErrors';
const mapDispatchToProps = dispatch => ({
  accountUpdate: userData => dispatch(actionCreator.accountUpdate(userData))
});

class AppUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: localStorage.getItem('username'),
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      formErrors: { oldPassword: '', newPassword: '', confirmPassword: '' },
      oldPasswordValid: false,
      newPasswordValid: false,
      confirmPasswordValid: false,
      formValid: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateField = this.validateField.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  validateField(fieldName, value) {
    let { oldPasswordValid, newPasswordValid, confirmPasswordValid } = this.state;
    let fieldValidationErrors = this.state.formErrors;

    switch (fieldName) {
      case 'oldPassword':
        oldPasswordValid = value.length >= 6;
        fieldValidationErrors.oldPassword = oldPasswordValid ? '' : 'Password is too short';
        break;
      case 'newPassword':
        newPasswordValid = value.length >= 6;
        fieldValidationErrors.newPassword = newPasswordValid ? '' : 'Password is too short';
        break;
      case 'confirmPassword':
        const { newPassword } = this.state;
        confirmPasswordValid = value == newPassword ? true : false;
        fieldValidationErrors.confirmPassword = confirmPasswordValid
          ? ''
          : 'Password is different from new password';
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        oldPasswordValid: oldPasswordValid,
        newPasswordValid: newPasswordValid,
        confirmPasswordValid: confirmPasswordValid
      },
      this.validateForm
    );
  }
  validateForm() {
    const { oldPasswordValid, newPasswordValid, confirmPasswordValid } = this.state;
    this.setState({
      formValid: oldPasswordValid && newPasswordValid && confirmPasswordValid
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
    const { username, oldPassword, newPassword } = this.state;
    this.props.accountUpdate({ username, oldPassword, newPassword });
  }

  render() {
    const { oldPassword, newPassword, confirmPassword, formErrors, formValid } = this.state;
    return (
      <div className="row container">
        <div
          className="container col-lg-6 col-lg-offset-6 col-md-8 
        col-md-offset-4 col-sm-8 col-sm-offset-4 log-in"
        >
          <form className="form" onSubmit={this.handleSubmit}>
            <h2>Change password</h2>
            <div className="form-group">
              <label>Old password</label>
              <input
                type="password"
                className="form-control"
                name="oldPassword"
                value={oldPassword}
                onChange={this.handleChange}
              />
              <FormErrors formErrors={{ oldPassword: formErrors.oldPassword }} />
            </div>
            <div className="form-group">
              <label>New password</label>
              <input
                type="password"
                className="form-control"
                name="newPassword"
                value={newPassword}
                onChange={this.handleChange}
              />
              <FormErrors formErrors={{ newPassword: formErrors.newPassword }} />
            </div>
            <div className="form-group">
              <label>Confirm new password</label>
              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                value={confirmPassword}
                onChange={this.handleChange}
              />
              <FormErrors formErrors={{ confirmPassword: formErrors.confirmPassword }} />
            </div>
            <div className="form-button">
              <button type="submit" className="btn btn-success btn-block" disabled={!formValid}>
                Update password
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
)(AppUpdate);
