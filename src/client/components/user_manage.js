import React from 'react';
import { connect } from 'react-redux';
import { userManage } from '../redux/actions';
const mapStateToProps = state => ({
  userDatas: state.data
});
const mapDispatchToProps = dispatch => ({
  userManage: () => dispatch(userManage())
});

class UserManager extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.userManage();
  }
  componentWillUnmount() {}
  render() {
    const { userDatas } = this.props;
    return (
      <div className="user-manage container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Email</th>
              <th>Username</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {userDatas.map((item, key) => {
              return (
                <tr key={key}>
                  <td>{item.emailAddress}</td>
                  <td>{item.username}</td>
                  <td>{item.password}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserManager);
