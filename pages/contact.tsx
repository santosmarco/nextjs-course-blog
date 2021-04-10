import {
  Button,
  CircularProgress,
  Grid,
  Snackbar,
  TextField,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Formik, FormikHelpers } from "formik";
import { useState } from "react";
import { PageContainer, PageHead } from "../components";
import { validateContactForm } from "../utils/contact";

type ContactValues = {
  name: string;
  email: string;
  message: string;
};

type SnackbarState = {
  open: boolean;
  content: string;
  type?: "success" | "info" | "error";
  formMessageId?: string;
};

const contactInitialValues: ContactValues = {
  name: "",
  email: "",
  message: "",
};

const ContactPage: React.FC = () => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    content: "",
  });

  const clearSnackbar = () => {
    setSnackbar({ open: false, content: "" });
  };

  const showSnackbar = (
    data: Required<Pick<SnackbarState, "type" | "content">> &
      Pick<SnackbarState, "formMessageId">
  ) => {
    setSnackbar({ open: true, ...data });
  };

  const handleFormikValidate = (values: ContactValues) => {
    return validateContactForm(values);
  };

  const handleFormikSubmit = async (
    values: ContactValues,
    { setErrors, setSubmitting }: FormikHelpers<ContactValues>
  ) => {
    setSubmitting(true);
    showSnackbar({
      type: "info",
      content: "Sending message...",
    });

    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();

    if (data.errors) {
      console.error("ERROR >", data);
      showSnackbar({ type: "error", content: "Unable to send message." });
      setErrors(data);
    } else {
      showSnackbar({
        type: "success",
        content: "Message sent successfully!",
        formMessageId: data.id,
      });
    }

    setSubmitting(false);
  };

  return (
    <>
      <PageHead title="Contact">
        <meta name="description" content="Contact Marco Santos" />
      </PageHead>
      <PageContainer title="Contact">
        <Formik
          initialValues={contactInitialValues}
          validate={handleFormikValidate}
          onSubmit={handleFormikSubmit}
        >
          {({
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit} noValidate>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="name"
                    label="Full name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                    autoComplete="name"
                    autoFocus
                    fullWidth
                    required
                    disabled={isSubmitting}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="email"
                    label="E-mail address"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && !!errors.email}
                    helperText={
                      (touched.email && errors.email) ||
                      "We'll never share your e-mail address."
                    }
                    autoComplete="email"
                    fullWidth
                    required
                    disabled={isSubmitting}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="message"
                    label="Your message"
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.message && !!errors.message}
                    helperText={
                      (touched.message && errors.message) ||
                      (values.message.length < 20 &&
                        `${20 - values.message.length} characters remaining.`)
                    }
                    variant="outlined"
                    multiline
                    rows={6}
                    fullWidth
                    required
                    disabled={isSubmitting}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                  >
                    {isSubmitting ? (
                      <>
                        <CircularProgress
                          size="1em"
                          style={{ marginRight: 10 }}
                        />{" "}
                        Submitting...
                      </>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </PageContainer>
      <Snackbar
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        open={snackbar.open}
        onClose={clearSnackbar}
        autoHideDuration={2000}
      >
        <Alert elevation={6} variant="filled" severity={snackbar.type}>
          {snackbar.content}
          {snackbar.formMessageId && <em> ID: {snackbar.formMessageId}</em>}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ContactPage;
