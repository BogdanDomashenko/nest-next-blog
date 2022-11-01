import { Container, Grid, Typography } from "@mui/material";
import { FC } from "react";
import { Post } from "../../common/types/post.types";
import { NewPost } from "./newPost/NewPost";
import { PostItem } from "./postItem/PostItem";

type Props = {
  list: Post[];
};

export const Posts: FC<Props> = ({ list }) => {
  return (
    <Container>
      <Grid container gap={1.5} marginTop={3} flexDirection="column">
        <NewPost />
        <Grid container flexDirection="column" marginTop={2} gap={3}>
          {list.length ? (
            list.map((post) => (
              <PostItem
                key={post.id}
                id={post.id}
                title={post.title}
                text={post.text}
                author={post.author}
                createdAt={post.createdAt}
                updatedAt={post.updatedAt}
              />
            ))
          ) : (
            <Typography variant="h5">There is not posts</Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};
