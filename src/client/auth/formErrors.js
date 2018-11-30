import React from 'react';

class FormErrors extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { formErrors } = this.props;
    return (
      <div className="form-error">
        {Object.keys(formErrors).map((fieldName, i) => {
          if (formErrors[fieldName].length > 0) {
            return <p key={i}>{formErrors[fieldName]}</p>;
          } else {
          }
        })}
      </div>
    );
  }
}
export default FormErrors;
