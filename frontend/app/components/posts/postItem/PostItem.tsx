import { FC } from "react";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { Post } from "../../../common/types/post.types";
import { grey } from "@mui/material/colors";

interface Props extends Post {}

export const PostItem: FC<Post> = ({
  id,
  title,
  text,
  createdAt,
  updatedAt,
  author,
}) => {
  const createdDate = new Date(createdAt).toLocaleDateString();
  const createdTime = new Date(createdAt).toLocaleTimeString();

  return (
    <Card sx={{ backgroundColor: grey[50] }}>
      <Grid container flexDirection="column" gap={2} padding={2}>
        <Typography variant="h4">{title}</Typography>
        <Typography variant="body1">{text}</Typography>
        <Grid container justifyContent="space-between" marginTop={1}>
          <Typography variant="body1">{author.username}</Typography>
          <Typography variant="body1">{`${createdDate} ${createdTime}`}</Typography>
        </Grid>
      </Grid>
    </Card>
  );
};
