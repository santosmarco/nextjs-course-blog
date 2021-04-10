import validator from "validator";

type ContactFormValues = {
  name: string;
  email: string;
  message: string;
};

export const validateContactForm = (
  values: ContactFormValues
): Partial<ContactFormValues> => {
  const { name, email, message } = values;
  const errors: Partial<ContactFormValues> = {};

  if (!name) {
    errors.name = "Required.";
  }
  if (!validator.isEmail(email)) {
    errors.email = "Invalid e-mail address.";
  }
  if (message.length <= 20) {
    errors.message = "Message too short.";
  }

  return errors;
};
