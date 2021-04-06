import { CssBaseline, ThemeProvider } from "@material-ui/core";
import {
  AccountCircleRounded,
  EmailRounded,
  FormatListBulletedRounded,
  HomeRounded,
  NightsStayRounded,
  WbSunnyRounded,
} from "@material-ui/icons";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { useEffect, useState } from "react";
import { Nav, PageHead } from "../components";
import "../styles/globals.css";
import { themes } from "../themes";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [selectedTheme, setSelectedTheme] = useState<keyof typeof themes>(
    "light"
  );

  const handleSwitchTheme = () => {
    setSelectedTheme((currTheme) => (currTheme === "dark" ? "light" : "dark"));
  };

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

      <ThemeProvider theme={themes[selectedTheme]}>
        <CssBaseline />
        <Nav
          items={[
            {
              label: "Home",
              href: "/",
              icon: <HomeRounded />,
              hideOnNavbar: true,
            },
            {
              label: "Posts",
              href: "/posts",
              icon: <FormatListBulletedRounded />,
              hideIconOnNavbar: true,
            },
            {
              label: "Contact",
              href: "/contact",
              icon: <EmailRounded />,
              hideIconOnNavbar: true,
            },
            {
              label: "Sign in",
              href: "/auth/sign-in",
              icon: <AccountCircleRounded />,
              hideLabelOnNavbar: true,
            },
            {
              label: "Switch theme",
              onClick: handleSwitchTheme,
              icon:
                selectedTheme === "light" ? (
                  <WbSunnyRounded />
                ) : (
                  <NightsStayRounded />
                ),
              hideLabelOnNavbar: true,
            },
          ]}
        />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default App;
