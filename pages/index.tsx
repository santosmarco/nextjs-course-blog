import { Avatar, Container, makeStyles, Typography } from "@material-ui/core";
import { GetStaticProps } from "next";
import { PageContainer, PostsGrid } from "../components";
import { Post } from "../types";
import { getFeaturedPosts } from "../utils/posts";

const useStyles = makeStyles((theme) => ({
  hero: {
    backgroundColor: theme.palette.primary[theme.palette.type],
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(8, 3),
  },
  heroContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    width: "100%",
    maxWidth: 300,
    height: "auto",
    marginBottom: theme.spacing(8),
    border: `5px solid ${
      theme.palette.type === "light"
        ? theme.palette.primary.dark
        : theme.palette.primary.light
    }`,
  },
}));

type HomeStaticProps = {
  featuredPosts: Post[];
};

const Home: React.FC<HomeStaticProps> = ({ featuredPosts }) => {
  const styles = useStyles();

  return (
    <>
      <div className={styles.hero}>
        <Container className={styles.heroContainer}>
          <Avatar src="/images/marco-avatar.png" className={styles.avatar} />
          <Typography variant="h2" align="center" gutterBottom>
            Hi, I'm Marco
          </Typography>
          <Typography variant="body1" align="center">
            And welcome to my blog about coding!
          </Typography>
        </Container>
      </div>

      <PageContainer title="Featured">
        <PostsGrid items={featuredPosts} />
      </PageContainer>
    </>
  );
};

export const getStaticProps: GetStaticProps<HomeStaticProps> = async () => {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      featuredPosts,
    },
  };
};

export default Home;
