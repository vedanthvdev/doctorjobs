function passwordValidation(password, conPassword) {
  let error = {};
  if (password !== conPassword || conPassword === "") {
    error = "";
  }

  return error;
}

export default passwordValidation;
