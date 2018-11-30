import React from 'react';
import { connect } from 'react-redux';
import actionCreator from '../redux/actions';

const mapDispatchToProps = dispatch => ({
  fileUpload: () => dispatch(actionCreator.fileUpload())
});

class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { description: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleUploadFile = this.handleUploadFile.bind(this);
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handleUpload(e) {
    const data = new FormData();
    data.append('file', e.target.files[0]);
  }

  render() {
    return (
      <div className="container">
        <h2>File upload</h2>
        <form onSubmit={this.handleUpload}>
          <div>
            <input
              type="text"
              className="form-control"
              name="description"
              value={description}
              onChange={this.handleChange}
            />
          </div>
          <input type="file" onChange={this.handleUploadFile} />
          <div>
            <button type="submit" className="btn btn-lg btn-success btn-block">
              Upload
            </button>
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
