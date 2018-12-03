import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import PrivateRoute from './privateroute';
import NavigationBar from './navigationBar';
import LogIn from '../auth/login';
import SignUp from '../auth/signup';
import Update from '../auth/update';
import Home from '../components/home';
import UserManager from '../components/user.manage';
// import Upload from '../components/upload';
import FileLoader from '../components/file.load';

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
      <div className="container-fluid first-pg">
        <NavigationBar />
        <Switch>
          <Route path="/login" component={LogIn} />
          <Route path="/signup" component={SignUp} />
          {/* <Route path="/upload" component={Upload} /> */}
          <Route path="/fileload" component={FileLoader} />
          <PrivateRoute path="/update" component={Update} userInfo={loginFlag} />
          <PrivateRoute path="/usermanage" component={UserManager} userInfo={loginFlag} />
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(AppRouter));
