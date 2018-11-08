import React from "react";
import { connect } from "react-redux";
import { logout } from "../redux/actions/index";
const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

class AppLogOut extends React.Component {
  constructor(props) {
    super(props);
    this.props.logout();
  }
  render(){
     return <h1></h1>
  }
}

const LogOut = connect(null, mapDispatchToProps)(AppLogOut);
export default LogOut;