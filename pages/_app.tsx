import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { useEffect } from "react";
import { PageHead } from "../components";
import "../styles/globals.css";
import { theme } from "../themes";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <PageHead>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </PageHead>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default App;
