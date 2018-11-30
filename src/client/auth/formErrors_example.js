import React from 'react';

class FormErrors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formErrors: { emailAddress: '', username: '', password: '' },
      emailAddressValid: false,
      usernameValid: false,
      passwordValid: false
    };

    this.validateField = this.validateField.bind(this);
  }

  validateField() {
    const { inputInfo } = this.props;
    const fieldName = inputInfo.changedState;
    let emailAddressValid = this.state.emailAddressValid;
    let usernameValid = this.state.usernameValid;
    let passwordValid = this.state.passwordValid;
    let fieldValidationErrors = this.state.formErrors;
    if (fieldName !== '') {
      const value = inputInfo[fieldName];
      switch (fieldName) {
        case 'emailAddress':
          emailAddressValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
          emailAddressValid = emailAddressValid ? true : null;
          fieldValidationErrors.emailAddress = emailAddressValid ? '' : ' is invalid';
          break;
        case 'username':
          usernameValid = value.length >= 6;
          fieldValidationErrors.username = usernameValid ? '' : ' is too short';
          break;
        case 'password':
          passwordValid = value.length >= 6;
          fieldValidationErrors.password = passwordValid ? '' : ' is too short';
          break;
        default:
          break;
      }
    }
    console.log(emailAddressValid);
    console.log(usernameValid);
    console.log(passwordValid);
    let formValid = emailAddressValid && usernameValid && passwordValid;
    console.log(formValid);
  }

  // validateForm() {
  //   const { emailAddressValid, usernameValid, passwordValid } = this.state;
  //   this.setState({
  //     formValid: emailAddressValid && usernameValid && passwordValid
  //   });
  // }
  render() {
    this.validateField();
    const { formErrors } = this.state;
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
