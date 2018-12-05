exports.validateField = (fieldName, value) => {
  switch (fieldName) {
    case 'emailAddress':
      const emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      return {
        valid: emailValid,
        error: emailValid ? '' : 'Email is invalid'
      };
    case 'username':
      return {
        valid: value.length >= 6,
        error: value.length >= 6 ? '' : 'The username must be at least 6 charaters.'
      };
    case 'password':
      return {
        valid: value.length >= 6,
        error: value.length >= 6 ? '' : 'The password must be at least 6 characters.'
      };
    default:
  }
};
