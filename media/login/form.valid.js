import React from 'react';

class FormValidator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formErrors: ''
    };

    this.validateField = this.validateField.bind(this);
  }

  validateField() {
    const { validInfo } = this.props;
    const { formErrors } = this.state;
    let validationErrors = '';
    Object.keys(validInfo).map((fieldName, i) => {
      // console.log(fieldName);
      // console.log(validInfo[fieldName]);
      if (fieldName !== '') {
        const value = validInfo[fieldName];
        console.log('---------' + value);
        console.log('---------' + validInfo[fieldName]);
        switch (fieldName) {
          // case 'emailAddress':
          //   emailAddressValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
          //   emailAddressValid = emailAddressValid ? true : null;
          //   fieldValidationErrors.emailAddress = emailAddressValid ? '' : ' is invalid';
          //   break;
          case 'username':
            console.log('username');
            validationErrors = value.length >= 6 ? '' : fieldName + ' is too short';
            if (value.length >= 6) {
              this.props.changeState({ usernameValid: true });
            } else {
              this.props.changeState({ usernameValid: false });
            }
            console.log('validationErrors');
            break;
          case 'password':
            console.log('password');
            validationErrors = value.length >= 6 ? '' : fieldName + ' is too short';
            if (value.length >= 6) {
              this.props.changeState({ passwordValid: true });
            } else {
              this.props.changeState({ passwordValid: false });
            }
            console.log('+++++++++++++++');
            break;
          default:
            break;
        }
        console.log(validationErrors);
        console.log(formErrors);
        if (validationErrors != formErrors) {
          console.log('*************');
          this.setState({ formErrors: validationErrors });
        }
      } else {
        console.log(error);
      }
    });
  }
  componentDidUpdate() {
    this.validateField();
  }
  render() {
    const { formErrors } = this.state;
    {
      if (formErrors.length > 0) {
        return <p>{formErrors}</p>;
      } else {
        return '';
      }
    }
  }
}
export default FormValidator;
