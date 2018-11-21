import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return { userDatas: state.data };
};

class UserManager extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { userDatas } = this.props;
    return (
      <div className="usermanage container">
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

export default connect(mapStateToProps)(UserManager);
