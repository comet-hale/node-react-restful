import React from "react";
import {connect} from "react-redux";
import {BrowserRouter as Router, Route, Link, Redirect, Switch} from "react-router-dom";
import LogIn from "./auth/login";
import LogOut from "./auth/logout";
import SignUp from "./auth/signup";
import Home from "./components/home";
import UserManager from "./components/user_manage";
import PrivateRoute from "./components/privateroute";

const mapStateToProps = state => {
  return {loginFlag: state.resData[0].loginFlag};
};

class AppRouter extends React.Component {
  render() {
    const {loginFlag} = this.props;
    return (
      <Router>
        <div className="firstPg">
          <div className="container">
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link to={loginFlag ? "/logout" : "/login"}><button className=
                "btn btn-success btn-lg btn-block">{loginFlag ? 'log out' : 
                'log in'}</button></Link></li>
              <li>
                <Link to="/signup"><button className="btn btn-success btn-lg 
                btn-block">Signup</button></Link></li>
              <li>
                <Link to="/usermanage"><button className="btn btn-success 
                btn-block btn-lg">UserManage</button></Link></li>
            </ul>
          </div>
          <Switch>
            <Route path="/login" render={props => loginFlag ?
              (<Redirect to="/usermanage"/>) : (<LogIn {...props}/>)}/>
            <Route path="/logout" component={LogOut}/>
            <Route path="/signup" component={SignUp}/>
            <PrivateRoute path="/usermanage" component={UserManager} 
              userInfo={loginFlag}/>
            <Route exact path="/" component={Home}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

const App = connect(mapStateToProps)(AppRouter);
export default App;