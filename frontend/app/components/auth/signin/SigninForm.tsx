import { FC } from "react";
import { useForm } from "react-hook-form";
import { Container, Grid, TextField, Button, Typography } from "@mui/material";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import {
  useErrorMessage,
  useYupValidationResolver,
} from "../../../common/hooks";
import { signinSchema } from "./signin.schema";
import { Loader } from "../../ui";
import { errorToField } from "../../../common/utils";
import { useRouter } from "next/router";
import { SigninValues } from "../../../common/types/user.types";
import { Api } from "../../../common/api";

export const SigninForm: FC = () => {
  const router = useRouter();

  const resolver = useYupValidationResolver(signinSchema);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninValues>({ resolver });

  const {
    mutate: signin,
    error,
    isLoading,
    reset,
  } = useMutation((data: SigninValues) => Api().user.signin(data), {
    onSuccess: () => {
      router.push("/");
    },
  });

  const errorMessage = useErrorMessage(error);

  const onSubmit = (data: SigninValues) => {
    reset();
    signin(data);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container maxWidth="xs" sx={{ marginTop: "20px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container flexDirection="column" gap={1.5}>
          <TextField
            type="text"
            label="Username"
            {...register("username")}
            {...errorToField(errors, "username")}
          />
          <TextField
            type="password"
            label="Password"
            {...register("password")}
            {...errorToField(errors, "password")}
          />
          <Grid item sx={{ display: "flex" }} justifyContent="flex-end" gap={1}>
            <Link href="/auth/signup">
              <Button variant="outlined">Sign up</Button>
            </Link>
            <Button type="submit" variant="outlined">
              Sign in
            </Button>
          </Grid>
          {errorMessage && (
            <Grid item>
              <Typography>{errorMessage}</Typography>
            </Grid>
          )}
        </Grid>
      </form>
    </Container>
  );
};
