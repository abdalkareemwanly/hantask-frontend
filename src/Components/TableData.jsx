import { useEffect, useState } from "react";
import { DataTableStyled } from "./StyledComponents";
import { useTWThemeContext } from "../admin/Components/ThemeProvider";
import {
  FaAngleLeft,
  FaAngleRight,
  FaAnglesLeft,
  FaAnglesRight,
} from "react-icons/fa6";
import Button from "./Button";

const PaginationComponent = ({ data, setPage }) => {
  const { currentPage, lastPage } = data?.data || {};

  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    prevNum: null,
    nextNum: null,
    firstPage: 1,
  });

  useEffect(() => {
    if (currentPage) {
      setPagination((prevPagination) => ({
        ...prevPagination,
        currentPage,
        lastPage,
        prevNum: Math.max(1, currentPage - 1),
        nextNum: Math.min(lastPage, currentPage + 1),
      }));
    }
  }, [currentPage, lastPage]);

  const rerunDataFunc = async (pageNumber) => {
    setPage(pageNumber);
  };

  const { firstPage, prevNum, nextNum } = pagination;

  return (
    <div className="bg-blocks-color border-t p-4 flex items-center justify-center">
      <Button
        Icon={<FaAnglesLeft />}
        onClickFun={() => rerunDataFunc(firstPage)}
      />
      <Button
        Icon={<FaAngleLeft />}
        onClickFun={() => rerunDataFunc(prevNum)}
      />

      <div className="flex gap-2">
        {firstPage !== currentPage && (
          <span
            className="cursor-pointer"
            onClick={() => rerunDataFunc(firstPage)}
          >
            {firstPage}
          </span>
        )}
        {prevNum > firstPage + 1 && <span>...</span>}

        {prevNum > 0 && prevNum !== firstPage && (
          <span
            className="cursor-pointer"
            onClick={() => rerunDataFunc(prevNum)}
          >
            {prevNum}
          </span>
        )}
        <span className="cursor-pointer">{currentPage}</span>
        {nextNum < lastPage && (
          <span
            className="cursor-pointer"
            onClick={() => rerunDataFunc(nextNum)}
          >
            {nextNum}
          </span>
        )}
        {nextNum < lastPage - 1 && <span>...</span>}
        {lastPage !== currentPage && (
          <span
            className="cursor-pointer"
            onClick={() => rerunDataFunc(lastPage)}
          >
            {lastPage}
          </span>
        )}
      </div>

      <Button
        Icon={<FaAngleRight />}
        onClickFun={() => rerunDataFunc(nextNum)}
      />
      <Button
        Icon={<FaAnglesRight />}
        onClickFun={() => rerunDataFunc(lastPage)}
      />
    </div>
  );
};

const TableData = ({
  columns,
  response,
  paginationBool,
  selectableRows,
  noDataMessage,
  setPage,
  enableSearch,
  actualData,
  setSearchTerm,
}) => {
  const { theme } = useTWThemeContext();

  const onSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    setSearchTerm(e.target.search.value);
  };

  return (
    <>
      <div className="flex justify-end">
        {enableSearch && (
          <form onSubmit={onSubmit} className="flex gap-1 my-4">
            <input
              type="text"
              name="search"
              placeholder="search by name"
              // onChange={(e) => setSearchTerm(e.target.value)}
              className="input-box"
            />
            <button
              className={`flex justify-between gap-1 items-center cursor-pointer px-3 py-2 bg-greenColor rounded-[4px] text-white`}
            >
              saerch
            </button>
          </form>
        )}
      </div>
      <DataTableStyled
        $mode={theme}
        columns={columns}
        data={actualData}
        selectableRows={selectableRows}
        pagination={paginationBool}
        paginationComponent={() => (
          <PaginationComponent data={response} setPage={setPage} />
        )}
        noDataComponent={
          <div className="text-primary-text">{noDataMessage}</div>
        }
      />
    </>
  );
};

export default TableData;

// sample for usage:
{
  /*

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

const {
    data: users,
    isPlaceholderData,
    queryClient,
  } = useQueryHook(
    ["users", page, searchTerm],
    () => getData(page, searchTerm),
    "paginate",
    page
  );
// Prefetch the next page!
  useEffect(() => {
    setTimeout(() => {
      if (!isPlaceholderData) {
        queryClient.prefetchQuery({
          queryKey: ["users", page + 1, searchTerm],
          queryFn: () => getData(page + 1),
          staleTime: 60 * 60 * 1000,
        });
      }
    }, 500);
  }, [users, isPlaceholderData, page, queryClient]);

  const changeStatusMutation = useMutationHook(changeStatusFunc, [
    "users",
    page,
  ]);
  const deleteMutation = useMutationHook(deleteFunc, ["users", page]);

   <div className="my-4">
  <TableData
    columns={columns} //array for the columns i want 
    enableSearch={true} //true or false to enable search functionality
    response={users} // the response i get from the request to get pagination properties from api
    actualData={users?.data.data} //the data i want to display in the table
    setPage={setPage} //change the page for pagination functionality
    paginationBool={true} //true or false to enable pagination in the table
    noDataMessage={"no users to show!"} //if there no data 
    setSearchTerm={setSearchTerm} //the search term state that the search functionality depends on
  />
</div>; 
*/
}
