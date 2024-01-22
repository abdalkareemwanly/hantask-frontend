import { useEffect, useState } from "react";
import Button from "./Button";
import {
  FaAngleLeft,
  FaAngleRight,
  FaAnglesLeft,
  FaAnglesRight,
} from "react-icons/fa6";

export const PaginationComponent = ({ data, setPage }) => {
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
        Icon={<FaAnglesLeft className="text-primary-text" />}
        onClickFun={() => rerunDataFunc(firstPage)}
      />
      <Button
        Icon={<FaAngleLeft className="text-primary-text" />}
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
        Icon={<FaAngleRight className="text-primary-text" />}
        onClickFun={() => rerunDataFunc(nextNum)}
      />
      <Button
        Icon={<FaAnglesRight className="text-primary-text" />}
        onClickFun={() => rerunDataFunc(lastPage)}
      />
    </div>
  );
};
