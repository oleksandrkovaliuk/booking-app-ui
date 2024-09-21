export const EmailValidation = (email: string) => {
  const regularExpression = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  return regularExpression.test(email);
};

export const PasswordValidation = (password: string) => {
  const regularExpression = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return regularExpression.test(password);
};
