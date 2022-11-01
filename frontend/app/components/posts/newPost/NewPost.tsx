import { Button, Grid, TextField } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { Api } from "../../../common/api";
import { CreatePost } from "../../../common/types/post.types";

export const NewPost: FC = () => {
  const { register, handleSubmit, reset } = useForm();

  const queryClient = useQueryClient();

  const { mutate: createPost } = useMutation(
    (data: CreatePost) => Api().post.create(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const onSubmit = (data: CreatePost) => {
    reset();
    createPost(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container gap={1}>
        <TextField label="Title" sx={{ width: "20%" }} {...register("title")} />
        <TextField label="Text" sx={{ width: "70%" }} {...register("text")} />
        <Button sx={{ width: "5%" }} type="submit">
          Add
        </Button>
      </Grid>
    </form>
  );
};
