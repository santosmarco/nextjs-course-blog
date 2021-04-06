import {
  Checkbox,
  FormControlLabel,
  TextField,
  TextFieldProps,
} from "@material-ui/core";
import { FormikProps } from "formik";

type AuthFormFieldProps = {
  name: string;
  label: string;
  type?: string;
  as?: "checkbox" | "input";
  defaultHelperText?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  margin?: TextFieldProps["margin"];
} & FormikProps<{
  [key: string]: string | boolean;
}>;

export const AuthFormField: React.FC<AuthFormFieldProps> = (props) => {
  const value = props.values[props.name];
  const error = props.errors[props.name];
  const touched = props.touched[props.name];

  const hasError = error && touched;

  if (props.as && props.as === "checkbox") {
    return (
      <FormControlLabel
        control={
          <Checkbox
            id={props.name}
            name={props.name}
            checked={!!value}
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            color="primary"
          />
        }
        label={props.label}
      />
    );
  }

  return (
    <TextField
      id={props.name}
      name={props.name}
      label={props.label}
      type={props.type}
      value={value}
      onChange={props.handleChange}
      onBlur={props.handleBlur}
      error={hasError}
      helperText={hasError ? error : props.defaultHelperText}
      autoComplete={props.autoComplete}
      autoFocus={props.autoFocus}
      margin={props.margin}
      variant="outlined"
      fullWidth
      required
    />
  );
};
