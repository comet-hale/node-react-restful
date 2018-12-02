import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import actionCreator from '../redux/actions/user.actions';

const mapStateToProps = state => ({ loginFlag: state.loginFlag });
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actionCreator.logout()),
  accountDelete: () => dispatch(actionCreator.accountDelete())
});
class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.confirmDelete = this.confirmDelete.bind(this);
  }
  confirmDelete() {
    if (confirm('Delete Account? This is extremely important.')) {
      this.props.accountDelete();
    } else {
    }
  }
  render() {
    const { loginFlag } = this.props;
    return (
      <div className="navbar navbar-inverse">
        <div className="container">
          <ul className="nav navbar-nav">
            <li>
              <Link className="first-pg-user-manage" to="/usermanage">
                <span className="glyphicon glyphicon-user" />
                UserManage
              </Link>
            </li>
          </ul>
          {loginFlag ? (
            <ul className="nav navbar-nav navbar-right">
              <li className="dropdown">
                <a className="dropdown-toggle" data-toggle="dropdown">
                  Files <span className="glyphicon glyphicon-menu-down" />
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="" to="/upload">
                      <span className="glyphicon glyphicon-cloud-upload" /> Up load
                    </Link>
                  </li>
                  <li>
                    <Link className="" to="/download">
                      <span className="glyphicon glyphicon-cloud-download" /> Down load
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="dropdown">
                <a className="dropdown-toggle" data-toggle="dropdown">
                  Account <span className="glyphicon glyphicon-menu-down" />
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a href="/" onClick={this.confirmDelete}>
                      <span className="glyphicon glyphicon-trash" /> Delete Account
                    </a>
                  </li>
                  <li>
                    <Link to="/update">
                      <span className="glyphicon glyphicon-refresh" /> Update Account
                    </Link>
                  </li>
                  <li class="divider" />
                  <li>
                    <a href="/" onClick={this.props.logout}>
                      <span className="glyphicon glyphicon-log-out" /> Sign Out
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          ) : (
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link to="/login">Log in</Link>
              </li>
              <li>
                <Link to="/signup">Sign up</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationBar);
