import React from 'react';
import { connect } from 'react-redux';
import { Route, Link, Redirect, Switch, withRouter } from 'react-router-dom';
import LogIn from './auth/login';
import SignUp from './auth/signup';
import Update from './auth/update';
import Home from './components/home';
import UserManager from './components/user_manage';
import PrivateRoute from './components/privateroute';
import { logout, userManage, accountDelete, accountUpdate } from './redux/actions';

const mapStateToProps = state => {
  return { loginFlag: state.loginFlag };
};
const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    userManage: () => dispatch(userManage()),
    accountDelete: () => dispatch(accountDelete()),
    accountUpdate: () => dispatch(accountUpdate())
  };
};
class AppRouter extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { loginFlag } = this.props;
    return (
      <div className="firstPg container-fluid">
        <div className="navbar navbar-inverse">
          <div className="container-fluid">
            <ul className="nav navbar-nav">
              <li>
                {
                  <Link to="/usermanage" onClick={() => loginFlag && this.props.userManage()}>
                    <div className="firstPg-UserManage">
                      <span className="glyphicon glyphicon-user" />
                      UserManage
                    </div>
                  </Link>
                }
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li>
                {loginFlag ? (
                  <Link to="/" onClick={this.props.logout} />
                ) : (
                  <Link to="/login">Log in</Link>
                )}
              </li>
              <li>
                {loginFlag ? (
                  <Link to="/" onClick={this.props.logout} />
                ) : (
                  <Link to="/signup">Sign up</Link>
                )}
              </li>
              <li className="dropdown">
                <a className="dropdown-toggle" data-toggle="dropdown">
                  Account <span className="glyphicon glyphicon-menu-down" />
                </a>
                <ul className="dropdown-menu">
                  <li>
                    {
                      <Link to="/" onClick={() => loginFlag && this.props.accountDelete()}>
                        Delete Account <span className="glyphicon glyphicon-trash" />
                      </Link>
                    }
                  </li>
                  <li>
                    <Link to="/update">
                      Update Account <span className="glyphicon glyphicon-refresh" />
                    </Link>
                  </li>
                  <li class="divider" />
                  {loginFlag ? (
                    <li onClick={this.props.logout}>
                      <Link to="">
                        Sign Out <span className="glyphicon glyphicon-log-out" />
                      </Link>
                    </li>
                  ) : (
                    <li>
                      <Link to="/signup">
                        Sign up <span className="glyphicon glyphicon-log-in" />
                      </Link>
                    </li>
                  )}
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <Switch>
          <Route
            path="/login"
            render={props => (loginFlag ? <Redirect to="/" /> : <LogIn {...props} />)}
          />
          <Route
            path="/signup"
            render={props => (loginFlag ? <Redirect to="/" /> : <SignUp {...props} />)}
          />
          <Route
            path="/update"
            render={props => (loginFlag ? <Update {...props} /> : <Redirect to="/" />)}
          />
          <PrivateRoute path="/usermanage" component={UserManager} userInfo={loginFlag} />
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AppRouter)
);
