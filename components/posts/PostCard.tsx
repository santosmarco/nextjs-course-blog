import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Star } from "@material-ui/icons";
import moment from "moment";
import { useRouter } from "next/router";
import { Post } from "../../types";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 200,
  },
  featuredIcon: {
    color:
      theme.palette.type === "dark"
        ? theme.palette.primary["light"]
        : theme.palette.primary["dark"],
  },
}));

type PostCardProps = {
  data: Post;
};

export const PostCard: React.FC<PostCardProps> = ({ data }) => {
  const router = useRouter();

  const styles = useStyles();

  const formattedDate = moment(data.postedAt).format("MMM D, YYYY");

  const handleReadMore = () => {
    router.push(`/posts/${data.slug}`);
  };

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            src="/images/marco-avatar.png"
            alt={data.author}
            aria-label={`author: ${data.author}`}
          />
        }
        title={data.title}
        subheader={formattedDate}
        action={
          data.featured && (
            <IconButton disabled>
              <Star className={styles.featuredIcon} />
            </IconButton>
          )
        }
      />

      <CardMedia
        className={styles.media}
        image={`/images/posts/${data.slug}/${data.coverImg}`}
        title={data.title}
      />

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {data.excerpt}
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small" color="primary" onClick={handleReadMore}>
          Read more
        </Button>
      </CardActions>
    </Card>
  );
};
