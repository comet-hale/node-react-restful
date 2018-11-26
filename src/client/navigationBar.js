import React from 'react';
import { Link } from 'react-router-dom';

function NavigationBar({ ...rest }) {
  const loginFalg = rest.userInfo;
  console.log(loginFalg);
  return (
    <div className="navbar navbar-inverse">
      <div className="container-fluid">
        <ul className="nav navbar-nav">
          <li>
            <Link className="first-pg-user-manage" to="/usermanage">
              <span className="glyphicon glyphicon-user" />
              UserManage
            </Link>
          </li>
        </ul>
        {loginFalg ? (
          <ul className="nav navbar-nav navbar-right">
            <li className="dropdown">
              <a className="dropdown-toggle" data-toggle="dropdown">
                Account <span className="glyphicon glyphicon-menu-down" />
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/">
                    <span className="glyphicon glyphicon-trash" /> Delete Account
                  </Link>
                </li>
                <li>
                  <Link to="/update">
                    <span className="glyphicon glyphicon-refresh" /> Update Account
                  </Link>
                </li>
                <li class="divider" />
                <li>
                  <a href="/">
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

export default NavigationBar;
