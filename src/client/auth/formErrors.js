import React from 'react';

class FormErrors extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { formErrors } = this.props;
    console.log(formErrors);
    return (
      <div className="form-error">
        {Object.keys(formErrors).map((fieldName, i) => {
          if (formErrors[fieldName].length > 0) {
            return (
              <p key={i}>
                {fieldName} {formErrors[fieldName]}
              </p>
            );
          } else {
          }
        })}
      </div>
    );
  }
}
export default FormErrors;
