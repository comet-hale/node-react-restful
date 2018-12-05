import React from 'react';
import { connect } from 'react-redux';
import actionCreator from '../redux/actions/user.actions';
import validate from './validate';

const mapDispatchToProps = dispatch => ({
  accountUpdate: userData => dispatch(actionCreator.accountUpdate(userData))
});

class AppUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      formErrors: { oldPassword: '', newPassword: '', confirmPassword: '' },
      formValid: { oldPassword: false, newPassword: false, confirmPassword: false }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    const { newPassword } = this.state;
    let formErrors = this.state.formErrors;
    let formValid = this.state.formValid;
    if (name === 'confirmPassword') {
      formValid.confirmPassword = newPassword === value ? true : false;
      formErrors.confirmPassword = newPassword === value ? '' : 'Password is not the same.';
    } else {
      const { valid, error } = validate.validateField('password', value);
      formValid[name] = valid;
      formErrors[name] = error;
    }
    this.setState({
      formErrors: formErrors,
      formValid: formValid
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { history } = this.props;
    const { oldPassword, newPassword } = this.state;
    this.props.accountUpdate({ history, oldPassword, newPassword });
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
              <div className="form-error">
                <p>{formErrors.oldPassword}</p>
              </div>
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
              <div className="form-error">
                <p>{formErrors.newPassword}</p>
              </div>
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
              <div className="form-error">
                <p>{formErrors.confirmPassword}</p>
              </div>
            </div>
            <div className="form-button">
              <button
                type="submit"
                className="btn btn-success btn-block"
                disabled={
                  !(formValid.oldPassword && formValid.newPassword && formValid.confirmPassword)
                }
              >
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
