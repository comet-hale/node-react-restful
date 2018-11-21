import React from 'react';
import { connect } from 'react-redux';
import { accountUpdate } from '../redux/actions';

const mapDispatchToProps = dispatch => {
  return {
    accountUpdate: userData => dispatch(accountUpdate(userData))
  };
};

class AppUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailAddress: localStorage.getItem('emailAddress'),
      username: localStorage.getItem('username'),
      oldPassword: localStorage.getItem('password'),
      oldInputPassword: '',
      confirmPassword: '',
      newPassword: ''
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
    const { emailAddress, username, newPassword } = this.state;
    if (newPassword == confirmPassword) {
      this.props.accountUpdate({ emailAddress, username, newPassword });
    }
    this.setState({ oldInputPassword: '', newPassword: '', confirmPassword: '' });
  }

  render() {
    const { oldInputPassword, newPassword, confirmPassword } = this.state;
    return (
      <div className="row container">
        <div
          className="container col-lg-6 col-lg-offset-6 col-md-8 
        col-md-offset-4 col-sm-8 col-sm-offset-4 signup"
        >
          <h1>Please update!</h1>
          <hr />
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Please enter the old password</label>
              <input
                type="password"
                className="form-control"
                name="oldInputPassword"
                value={oldInputPassword}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label>Please enter the new password</label>
              <input
                type="password"
                className="form-control"
                name="newPassword"
                value={newPassword}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label>Please confirm the password</label>
              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                value={confirmPassword}
                onChange={this.handleChange}
              />
            </div>
            <br />
            <button type="submit" className="btn btn-success btn-block">
              Update
            </button>
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
