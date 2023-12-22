import { useQuery } from "@tanstack/react-query";
import PageTitle from "../../../Components/PageTitle";
import { Page } from "../../../Components/StyledComponents";
import axiosClient from "../../../axios-client";

const Posts = () => {
  const getData = async () => {
    const res = await axiosClient.get("/admin/posts");
    return res.data.data;
  };
  const { data, error, isError, isFetching, status } = useQuery({
    queryKey: ["posts"],
    queryFn: getData,
  });

  if (error) return "error";

  return (
    <Page>
      <PageTitle text={"review all posts"} />
    </Page>
  );
};

export default Posts;
