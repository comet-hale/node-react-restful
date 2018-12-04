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
        error: value.length >= 6 ? '' : 'Username is too short'
      };
    case 'password':
      return {
        valid: value.length >= 6,
        error: value.length >= 6 ? '' : 'Password is too short'
      };
    default:
  }
};
