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
      <Typography variant="h3">{title}</Typography>
      <Divider className={styles.divider} />
      {children}
    </Container>
  );
};
