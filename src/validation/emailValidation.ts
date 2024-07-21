export const EmailValidation = (email: string) => {
  const regularExpression = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  return regularExpression.test(email);
};
