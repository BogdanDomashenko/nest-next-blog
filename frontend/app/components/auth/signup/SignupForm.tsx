import { useForm } from "react-hook-form";
import { Container, Grid, TextField, Button, Typography } from "@mui/material";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../common/api";
import { FC, useEffect, useState } from "react";
import { errorToField, getErrorMessage } from "../../../common/utils";
import {
  useErrorMessage,
  useYupValidationResolver,
} from "../../../common/hooks";
import { signupSchema } from "./signup.schema";
import { Loader } from "../../ui";
import { useRouter } from "next/router";

type SignupValues = {
  email: string;
  username: string;
  password: string;
};

export const SignupForm: FC = () => {
  const router = useRouter();

  const resolver = useYupValidationResolver(signupSchema);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupValues>({ resolver });

  const {
    mutate: signin,
    error,
    isLoading,
    reset,
  } = useMutation((data: SignupValues) => api.post("/auth/signup", data), {
    onSuccess: () => {
      router.push("/auth/signin");
    },
  });

  const errorMessage = useErrorMessage(error);

  const onSubmit = (data: SignupValues) => {
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
            type="email"
            label="Email"
            {...register("email")}
            {...errorToField(errors, "email")}
          />
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
            <Link href="/auth/signin">
              <Button type="submit" variant="outlined">
                Sign in
              </Button>
            </Link>
            <Button type="submit" variant="outlined">
              Sign up
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
