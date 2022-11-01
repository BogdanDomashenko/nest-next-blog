import { CircularProgress } from "@mui/material";
import { FC } from "react";

export const Loader: FC = () => (
  <CircularProgress sx={{ position: "absolute", top: "50%", left: "50%" }} />
);
