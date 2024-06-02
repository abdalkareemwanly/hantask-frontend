import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export const useQueryHook = (queryKey, getDataFun, queryType) => {
  const queryClient = useQueryClient();

  const normalQuery = {
    queryKey: queryKey,
    queryFn: getDataFun,
    refetchOnWindowFocus: false,
  };

  const paginateQuery = {
    queryKey: queryKey,
    queryFn: getDataFun,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
    staleTime: 6000 * 5,
  };

  const {
    data,
    error,
    isError,
    isFetching,
    isLoading,
    isRefetching,
    status,
    isSuccess,
    isPlaceholderData,
    refetch,
  } = useQuery(queryType === "normal" ? normalQuery : paginateQuery);

  return {
    data,
    error,
    isError,
    isFetching,
    status,
    isLoading,
    queryClient,
    isRefetching,
    isPlaceholderData,
    refetch,
    isSuccess,
  };
};
