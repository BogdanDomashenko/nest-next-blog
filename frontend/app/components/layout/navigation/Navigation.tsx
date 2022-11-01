import { Box, Button, List, ListItem } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { Api, api } from "../../../common/api";
import { navigationItems } from "./navigation.data";

type Props = {
  isAuthorized: boolean;
};

export const Navigation: FC<Props> = ({ isAuthorized }) => {
  const router = useRouter();

  const handleLogoutClick = async () => {
    await Api().user.logout();
    router.push("/auth/signin");
  };

  return (
    <Box sx={{ backgroundColor: blue[400] }} justifyContent="flex-end">
      <List>
        <ListItem sx={{ justifyContent: "flex-end" }}>
          {navigationItems?.map((item, index) =>
            !item.mustBeAuthorized ||
            (item.mustBeAuthorized && isAuthorized) ? (
              <Link key={index} href={item.redirect}>
                <Button sx={{ color: "white" }}>{item.name}</Button>
              </Link>
            ) : (
              ""
            )
          )}
          {isAuthorized && (
            <Button sx={{ color: "white" }} onClick={handleLogoutClick}>
              Logout
            </Button>
          )}
        </ListItem>
      </List>
    </Box>
  );
};
