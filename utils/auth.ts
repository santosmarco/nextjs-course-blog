import validator from "validator";

export const validateRequired = (value: string) => {
  if (!value) {
    return "Required.";
  }
  return "";
};

export const validateEmail = (email: string) => {
  let error = "";

  if (!email) {
    error = "Required.";
  } else if (!validator.isEmail(email)) {
    error = "Invalid e-mail address.";
  }

  return error;
};

export const validatePassword = (password: string) => {
  const strongPasswordConfig: Parameters<
    typeof validator["isStrongPassword"]
  >[1] = {
    minLength: 12,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0,
  };

  const countLowercase = (str: string) => {
    return str
      .split("")
      .reduce(
        (acc, char) =>
          validator.isLowercase(char) && !validator.isInt(char) ? acc + 1 : acc,
        0
      );
  };

  const countUppercase = (str: string) => {
    return str
      .split("")
      .reduce(
        (acc, char) =>
          validator.isUppercase(char) && !validator.isInt(char) ? acc + 1 : acc,
        0
      );
  };

  const countDigits = (str: string) => {
    return str
      .split("")
      .reduce((acc, char) => (validator.isInt(char) ? acc + 1 : acc), 0);
  };

  let error = "";

  if (!password) {
    error = "Required.";
  } else if (!validator.isStrongPassword(password, strongPasswordConfig)) {
    error = `Too weak – your password must be at least ${
      strongPasswordConfig.minLength
    } characters long (has ${password.length}), contain at least ${
      strongPasswordConfig.minLowercase
    } lowercase letter${
      strongPasswordConfig.minLowercase > 1 ? "s" : ""
    } (has ${countLowercase(password)}), 1 uppercase letter${
      strongPasswordConfig.minUppercase > 1 ? "s" : ""
    } (has ${countUppercase(password)}) and ${
      strongPasswordConfig.minNumbers === 1
        ? "a"
        : strongPasswordConfig.minNumbers
    } digit${strongPasswordConfig.minNumbers > 1 ? "s" : ""} (has ${countDigits(
      password
    )}).`;
  }

  return error;
};

export const validateName = (name: string) => {
  let error = "";

  if (!name) {
    error = "Required.";
  } else if (name.length < 4) {
    error = "Too short.";
  }

  return error;
};
