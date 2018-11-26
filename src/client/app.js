import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import LogIn from './auth/login';
import SignUp from './auth/signup';
import Update from './auth/update';
import Home from './components/home';
import UserManager from './components/user_manage';
import PrivateRoute from './privateroute';
import NavigationBar from './navigationBar';

const mapStateToProps = state => {
  return { loginFlag: state.loginFlag };
};

class AppRouter extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { loginFlag } = this.props;
    return (
      <div className="first-pg container-fluid">
        <NavigationBar />
        <Switch>
          <Route
            path="/login"
            render={props => (loginFlag ? <Redirect to="/" /> : <LogIn {...props} />)}
          />
          <Route
            path="/signup"
            render={props => (loginFlag ? <Redirect to="/" /> : <SignUp {...props} />)}
          />
          <PrivateRoute path="/update" component={Update} userInfo={loginFlag} />
          <PrivateRoute path="/usermanage" component={UserManager} userInfo={loginFlag} />
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(AppRouter));
