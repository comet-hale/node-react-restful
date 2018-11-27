import React from 'react';
import { connect } from 'react-redux';
import actionCreator from '../redux/actions';

const mapDispatchToProps = dispatch => ({
  fileUpload: () => dispatch(actionCreator.fileUpload())
});

class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }
  handleFileUpload() {}
  render() {
    return (
      <div className="user-manage container">
        <input type="file" onChange={this.handleFileUpload} />
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(FileUpload);
