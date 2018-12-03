import React from 'react';
import { connect } from 'react-redux';
import actionCreator from '../redux/actions/file.actions';

const mapDispatchToProps = dispatch => ({
  fileUpload: uploadParams => dispatch(actionCreator.fileUpload(uploadParams))
});

class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fileURL: '' };
    this.handleUploadFile = this.handleUploadFile.bind(this);
  }

  handleUploadFile(e) {
    e.preventDefault();
    const data = new FormData();
    data.append('avatar', this.uploadInput.files[0]);
    this.props.fileUpload(data);
  }

  render() {
    return (
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
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(FileUpload);
// export default FileUpload;
