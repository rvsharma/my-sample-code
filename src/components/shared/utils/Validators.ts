export const validateEmail = (email: string): any => {
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //eslint-disable-line

  return reg.test(email);
};

export const validateDomainEmail = (email: string): any => {
  return email.split('@')[1]?.toLowerCase() === process.env.REACT_APP_DOMAIN?.toLowerCase();
};
