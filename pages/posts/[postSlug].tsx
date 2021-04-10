import { makeStyles, Paper, Typography } from "@material-ui/core";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { PageContainer, PageHead } from "../../components";
import { Post } from "../../types";
import { getPost, getPostFiles } from "../../utils";

const useStyles = makeStyles((theme) => ({
  paper: {
    borderRadius: 16,
  },
  coverImgContainer: {
    position: "relative",
    height: 200,
    [theme.breakpoints.up("md")]: {
      height: 500,
    },
  },
  coverImg: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  contentImgContainer: {
    textAlign: "center",
  },
  contentImg: {
    borderRadius: 12,
  },
  contentImgCaption: {
    marginTop: theme.spacing(0.5),
  },
  article: {
    [theme.breakpoints.up("xs")]: {
      padding: theme.spacing(2),
    },
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(5),
    },
  },
}));

type PostPageStaticProps = {
  postData: Post;
};

const PostPage: React.FC<PostPageStaticProps> = ({ postData: post }) => {
  const styles = useStyles();

  const handleRenderParagraph = (p: any) => {
    const { node } = p;
    if (node.children[0].type === "image") {
      const image = node.children[0];
      return (
        <div className={styles.contentImgContainer}>
          <Image
            src={`/images/posts/${post.slug}/${image.url}`}
            alt={image.alt}
            width={620}
            height={300}
            className={styles.contentImg}
          />
          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            className={styles.contentImgCaption}
          >
            <em>{image.alt}</em>
          </Typography>
        </div>
      );
    } else {
      return <p>{p.children}</p>;
    }
  };

  const handleRenderCode = (code: any) => {
    const { language, value } = code;
    return (
      <SyntaxHighlighter
        style={atomDark}
        language={language}
        children={value}
      />
    );
  };

  return (
    <>
      <PageHead title={post.title}>
        <meta name="description" content={post.excerpt} />
      </PageHead>
      <PageContainer title={post.title}>
        <Paper className={styles.paper}>
          <div className={styles.coverImgContainer}>
            <Image
              src={`/images/posts/${post.slug}/${post.coverImg}`}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              className={styles.coverImg}
            />
          </div>

          <article className={styles.article}>
            <ReactMarkdown
              renderers={{
                paragraph: handleRenderParagraph,
                code: handleRenderCode,
              }}
            >
              {post.content}
            </ReactMarkdown>
          </article>
        </Paper>
      </PageContainer>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const postFiles = getPostFiles();
  const paths = postFiles.map((fileName) => ({
    params: { postSlug: fileName.split(".")[0] },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<PostPageStaticProps> = async ({
  params: { postSlug },
}) => {
  const postData = getPost(Array.isArray(postSlug) ? postSlug[0] : postSlug);

  return {
    props: { postData },
  };
};

export default PostPage;
