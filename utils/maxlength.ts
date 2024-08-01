//! Validation for max Length
const maxLengthCheck = (object: any) => {
  if (object.target.value.length > object.target.maxLength) {
    object.target.value = object.target.value.slice(0, object.target.maxLength);
  }
};

export default maxLengthCheck;
