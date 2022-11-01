import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { NextPageContext } from "next";
import { FC } from "react";
import { Api } from "../app/common/api";
import { Post } from "../app/common/types/post.types";
import { Posts } from "../app/components/posts";
import { Loader } from "../app/components/ui";
import { queryClient } from "../app/providers/MainProvider";

const Home: FC = () => {
  const { data, isLoading } = useQuery<Post[]>(["posts"], () =>
    Api().post.list()
  );

  if (isLoading) {
    return <Loader />;
  }

  return <>{data && <Posts list={data} />}</>;
};

export default Home;

export async function getServerSideProps(context: NextPageContext) {
  try {
    await queryClient.prefetchQuery(["posts"], () => Api(context).post.list());
  } catch (err) {}

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
