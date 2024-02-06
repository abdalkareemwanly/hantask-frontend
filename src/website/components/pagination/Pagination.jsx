import {
  FaAngleLeft,
  FaAngleRight,
  FaAnglesLeft,
  FaAnglesRight,
} from "react-icons/fa6";
import Button from "../../../Components/Button";
import { useEffect, useState } from "react";
import { MdNavigateNext } from "react-icons/md";

const Pagination = ({ data, setPage }) => {
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
    <div className="p-4 flex items-center justify-center  text-2xl">
      <Button
        Icon={<FaAnglesLeft className="border p-2 rounded-md" size={40} />}
        onClickFun={() => rerunDataFunc(firstPage)}
        iconColor={"black"}
      />
      <Button
        Icon={<FaAngleLeft className="border p-2 rounded-md" size={40} />}
        onClickFun={() => rerunDataFunc(prevNum)}
        iconColor={"black"}
      />

      <div className="flex gap-2">
        {firstPage !== currentPage && (
          <span
            className="cursor-pointer  p-2"
            onClick={() => rerunDataFunc(firstPage)}
          >
            {firstPage}
          </span>
        )}
        {prevNum > firstPage + 1 && <span>...</span>}

        {prevNum > 0 && prevNum !== firstPage && (
          <span
            className="cursor-pointer  p-2"
            onClick={() => rerunDataFunc(prevNum)}
          >
            {prevNum}
          </span>
        )}
        <span className={`text-orangeColor font-semibold p-2`}>
          {currentPage}
        </span>
        {nextNum < lastPage && (
          <span
            className="cursor-pointer  p-2"
            onClick={() => rerunDataFunc(nextNum)}
          >
            {nextNum}
          </span>
        )}
        {nextNum < lastPage - 1 && <span>...</span>}
        {lastPage !== currentPage && (
          <span
            className="cursor-pointer  p-2"
            onClick={() => rerunDataFunc(lastPage)}
          >
            {lastPage}
          </span>
        )}
      </div>

      <Button
        Icon={<FaAngleRight className="border p-2 rounded-md" size={40} />}
        onClickFun={() => rerunDataFunc(nextNum)}
        iconColor={"black"}
      />
      <Button
        Icon={<FaAnglesRight className="border p-2 rounded-md" size={40} />}
        onClickFun={() => rerunDataFunc(lastPage)}
        iconColor={"black"}
      />
    </div>
  );
};

export default Pagination;
