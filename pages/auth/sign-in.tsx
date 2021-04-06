import { Grid, makeStyles, Paper } from "@material-ui/core";
import { Formik, FormikHelpers } from "formik";
import {
  AuthContainer,
  AuthFormField,
  AuthSubmitBtn,
  Link,
  PageHead,
} from "../../components";
import { validateEmail, validateRequired } from "../../utils";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  signUpText: {
    textAlign: "right",
  },
}));

const formikInitialValues = {
  email: "",
  password: "",
  remember: true,
};

const SignInPage: React.FC = () => {
  const styles = useStyles();

  const handleValidate = (
    values: typeof formikInitialValues
  ): Partial<Record<keyof typeof formikInitialValues, string>> => {
    const errorMsgs = {
      email: validateEmail(values.email),
      password: validateRequired(values.password),
      remember: "",
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
      <PageHead title="Sign in" />
      <Grid container className={styles.root}>
        <Grid item xs={false} sm={4} md={7} className={styles.image} />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <AuthContainer headerTitle="Sign in">
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
                  <AuthFormField
                    {...formikProps}
                    name="email"
                    label="E-mail address"
                    autoComplete="email"
                    margin="normal"
                    autoFocus
                  />
                  <AuthFormField
                    {...formikProps}
                    name="password"
                    label="Password"
                    autoComplete="current-password"
                    margin="normal"
                  />
                  <AuthFormField
                    {...formikProps}
                    as="checkbox"
                    name="remember"
                    label="Remember me"
                  />

                  <AuthSubmitBtn
                    isSubmitting={formikProps.isSubmitting}
                    defaultText="Sign in"
                    submittingText="Signing in..."
                  />

                  <Grid container>
                    <Grid item xs={6}>
                      <Link href="/auth/forgot-password" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>

                    <Grid item xs={6} className={styles.signUpText}>
                      <Link href="/auth/sign-up" variant="body2">
                        Don't have an account? Sign up
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Formik>
          </AuthContainer>
        </Grid>
      </Grid>
    </>
  );
};

export default SignInPage;
