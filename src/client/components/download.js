import React from 'react';
import { connect } from 'react-redux';
import actionCreator from '../redux/actions/file.actions';

const mapStateToProps = state => ({
  uploadedDatas: state.data
});
const mapDispatchToProps = dispatch => ({
  getFileLists: () => dispatch(actionCreator.getFileLists())
});

class DownLoad extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getFileLists();
  }

  render() {
    const { uploadedDatas } = this.props;
    return (
      <div className="user-manage container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>URL of Files</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {uploadedDatas.map((item, key) => {
              return (
                <tr key={key}>
                  <td>{item.filename}</td>
                  <td>{item.createdAt}</td>
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
)(DownLoad);
