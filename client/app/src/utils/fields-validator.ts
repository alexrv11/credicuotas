export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

export const validatePositiveNumber = (number: string) => {
  return String(number).match(/^[0-9]+$/) || number.length === 0;
};

export const validateAlphaNumeric = (text: string) => {
  return String(text).match(/^[ñíóáéú a-zA-Z 0-9]+$/g) || text.length === 0;
};

export const validatePhone = (phone: string) => {
  return String(phone).match(/^\d{8}$/g) || phone.length === 0;
};
