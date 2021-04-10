import { Container, Divider, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(8, 3),
  },
  divider: {
    marginBottom: theme.spacing(5),
  },
}));

type PageContainerProps = {
  title: string;
};

export const PageContainer: React.FC<PageContainerProps> = ({
  title,
  children,
}) => {
  const styles = useStyles();

  return (
    <Container className={styles.container}>
      <header>
        <Typography variant="h3">{title}</Typography>
      </header>
      <Divider className={styles.divider} />
      <main>{children}</main>
    </Container>
  );
};
