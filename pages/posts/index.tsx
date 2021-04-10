import { GetStaticProps } from "next";
import { PageContainer, PageHead, PostsGrid } from "../../components";
import { Post } from "../../types";
import { getAllPosts } from "../../utils";

type AllPostsPageStaticProps = {
  posts: Post[];
};

const AllPostsPage: React.FC<AllPostsPageStaticProps> = ({ posts }) => {
  return (
    <>
      <PageHead title="Posts" />
      <PageContainer title="All Posts">
        <PostsGrid items={posts} />
      </PageContainer>
    </>
  );
};

export const getStaticProps: GetStaticProps<AllPostsPageStaticProps> = async () => {
  const posts = getAllPosts();

  return {
    props: {
      posts,
    },
  };
};

export default AllPostsPage;
