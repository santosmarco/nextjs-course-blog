import {
  Avatar,
  Box,
  Container,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { Copyright } from "../../Copyright";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

type AuthContainerProps = {
  headerTitle: string;
  headerIcon?: JSX.Element;
};

export const AuthContainer: React.FC<AuthContainerProps> = ({
  headerTitle,
  headerIcon,
  children,
}) => {
  const styles = useStyles();

  return (
    <div className={styles.paper}>
      <Avatar className={styles.avatar}>
        {headerIcon || <LockOutlined />}
      </Avatar>

      <Typography component="h1" variant="h5">
        {headerTitle}
      </Typography>

      <Container component="main" maxWidth="xs">
        {children}
      </Container>

      <Box mt={5}>
        <Copyright />
      </Box>
    </div>
  );
};
