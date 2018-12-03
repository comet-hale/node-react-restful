import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import actionCreator from '../redux/actions/file.actions';

const mapStateToProps = state => ({
  uploadedDatas: state.data
});
const mapDispatchToProps = dispatch => ({
  getFileLists: () => dispatch(actionCreator.getFileLists()),
  fileDownload: filePath => dispatch(actionCreator.fileDownload(filePath)),
  fileUpload: uploadParams => dispatch(actionCreator.fileUpload(uploadParams))
});

class DownLoad extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fileURL: '' };

    this.getFileURL = this.getFileURL.bind(this);
    this.handleUploadFile = this.handleUploadFile.bind(this);
  }

  handleUploadFile(e) {
    e.preventDefault();
    const data = new FormData();
    data.append('avatar', this.uploadInput.files[0]);
    this.props.fileUpload(data);
  }

  getFileURL(e) {
    const { value } = e.target;
    this.props.fileDownload({ value });
  }
  componentWillMount() {
    this.props.getFileLists();
  }

  render() {
    const { uploadedDatas } = this.props;
    return (
      <div className="user-manage container">
        <div className="container">
          <form onSubmit={this.handleUploadFile}>
            <div>
              <input
                ref={ref => {
                  this.uploadInput = ref;
                }}
                type="file"
              />
            </div>
            <div>
              <button>Upload</button>
            </div>
          </form>
        </div>
        <div>
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
                      <button
                        className="btn btn-lg btn-success btn-block"
                        onClick={this.getFileURL}
                        value={item.filename}
                        name="fileURL"
                      >
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
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DownLoad);
