import { Grid, makeStyles } from "@material-ui/core";
import { Formik, FormikHelpers } from "formik";
import {
  AuthContainer,
  AuthFormField,
  AuthSubmitBtn,
  Link,
  PageHead,
} from "../../components";
import { validateEmail, validateName, validatePassword } from "../../utils";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
}));

const formikInitialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  allowExtraEmails: false,
};

const SignUpPage: React.FC = () => {
  const styles = useStyles();

  const handleValidate = (
    values: typeof formikInitialValues
  ): Partial<Record<keyof typeof formikInitialValues, string>> => {
    const errorMsgs = {
      firstName: validateName(values.firstName),
      lastName: validateName(values.lastName),
      email: validateEmail(values.email),
      password: validatePassword(values.password),
      allowExtraEmails: "",
    };

    return Object.entries(errorMsgs).reduce(
      (o, [key, val]) => (val ? { ...o, [key]: val } : o),
      {}
    );
  };

  const handleSubmit = (
    values: typeof formikInitialValues,
    { setSubmitting }: FormikHelpers<typeof formikInitialValues>
  ) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

  return (
    <>
      <PageHead title="Sign up" />
      <AuthContainer headerTitle="Sign up">
        <Formik
          initialValues={formikInitialValues}
          validate={handleValidate}
          onSubmit={handleSubmit}
        >
          {(formikProps) => (
            <form
              className={styles.form}
              onSubmit={formikProps.handleSubmit}
              noValidate
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <AuthFormField
                    {...formikProps}
                    name="firstName"
                    label="First name"
                    autoComplete="fname"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <AuthFormField
                    {...formikProps}
                    name="lastName"
                    label="Last name"
                    autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12}>
                  <AuthFormField
                    {...formikProps}
                    name="email"
                    label="E-mail address"
                    autoComplete="email"
                    defaultHelperText="We'll never share your email."
                  />
                </Grid>
                <Grid item xs={12}>
                  <AuthFormField
                    {...formikProps}
                    name="password"
                    label="Password"
                    autoComplete="current-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <AuthFormField
                    {...formikProps}
                    as="checkbox"
                    name="allowExtraEmails"
                    label="I want to receive inspiration, marketing promotions and updates via e-mail."
                  />
                </Grid>
              </Grid>

              <AuthSubmitBtn
                isSubmitting={formikProps.isSubmitting}
                defaultText="Sign up"
                submittingText="Signing up..."
              />

              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/auth/sign-in">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </AuthContainer>
    </>
  );
};

export default SignUpPage;
