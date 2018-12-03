import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import actionCreator from '../redux/actions/file.actions';

const mapStateToProps = state => ({
  uploadedDatas: state.data
});
const mapDispatchToProps = dispatch => ({
  getFileLists: () => dispatch(actionCreator.getFileLists()),
  fileDownload: filePath => dispatch(actionCreator.fileDownload(filePath))
});

class DownLoad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileURL: ''
    };
    this.getFileURL = this.getFileURL.bind(this);
  }

  getFileURL(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    this.props.fileDownload({ value });
  }
  componentWillMount() {
    this.props.getFileLists();
  }

  render() {
    const { uploadedDatas } = this.props;
    // console.log(uploadedDatas);
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
                  <td>
                    <button onClick={this.getFileURL} value={item.filename} name="fileURL">
                      {item.filename}
                    </button>
                  </td>
                  <td>{moment(item.createdAt).format('YYYY/MM/DD HH:mm')}</td>
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
