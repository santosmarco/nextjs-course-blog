import { Typography } from "@material-ui/core";
import { useContext } from "react";
import { AppInfoCtx } from "../context";
import { Link } from "./Link";

export const Copyright: React.FC = () => {
  const appInfo = useContext(AppInfoCtx);

  const currYear = new Date().getFullYear();

  return (
    <Typography variant="body2" color="textSecondary" align="center">
      Copyright ©{" "}
      <Link href="/" color="inherit">
        {appInfo.name}
      </Link>{" "}
      {currYear}.
    </Typography>
  );
};
