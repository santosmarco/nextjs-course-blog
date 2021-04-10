import { Grid } from "@material-ui/core";
import { Post } from "../../types";
import { PostCard } from "./PostCard";

type PostsGridProps = {
  items: Post[];
};

export const PostsGrid: React.FC<PostsGridProps> = ({ items }) => {
  return (
    <Grid container spacing={3}>
      {items.map((post) => (
        <Grid item xs={12} md={6} lg={4} xl={3} key={post.slug}>
          <PostCard data={post} />
        </Grid>
      ))}
    </Grid>
  );
};
