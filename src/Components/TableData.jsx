import React from "react";
import { DataTableStyled } from "./StyledComponents";
import { useTWThemeContext } from "../admin/Components/ThemeProvider";
import {
  FaAngleLeft,
  FaAngleRight,
  FaAnglesLeft,
  FaAnglesRight,
} from "react-icons/fa6";

const TableData = ({ columns, data, paginationBool, selectableRows }) => {
  const { theme } = useTWThemeContext();

  // ? example about columns and data arrays:
  //   const columns = [
  //     {
  //       name: "Title",
  //       selector: (row) => row.title,
  //       sortable: true,
  //     },
  //     {
  //       name: "Year",
  //       selector: (row) => row.year,
  //     },
  //     {
  //       name: "Actions",
  //       cell: (row) => {
  //         return (
  //           <div className="flex gap-x-2 gap-y-1 items-center w-full flex-wrap">
  //             <Button
  //               isLink={true}
  //               goto={`../Chat Users/${row.id}`}
  //               Icon={<AiFillEye size={20} />}
  //               color={"bg-redBtn"}
  //               // width={"100%"}
  //               title={"hello"}
  //               onClickFun={() => console.log(row)}
  //             />
  //             <Button
  //               isLink={true}
  //               goto={`../Chat Users/${row.id}`}
  //               Icon={<AiFillEye size={20} />}
  //               color={"bg-blueBtn"}
  //               // width={"100%"}
  //               title={"hello"}
  //               onClickFun={() => console.log(row)}
  //             />
  //             <Button
  //               isLink={true}
  //               goto={`../Chat Users/${row.id}`}
  //               Icon={<AiFillEye size={20} />}
  //               color={"bg-greenBtn"}
  //               // width={"100%"}
  //               title={"hello"}
  //               onClickFun={() => console.log(row)}
  //             />
  //           </div>
  //         );
  //       },
  //     },
  //   ];

  //   const data = [
  //     {
  //       id: 1,
  //       title: "a",
  //       year: "1988",
  //     },
  //     {
  //       id: 2,
  //       title: "b",
  //       year: "1984",
  //     },
  //     {
  //       id: 3,
  //       title: "c",
  //       year: "1988",
  //     },
  //     {
  //       id: 4,
  //       title: "d",
  //       year: "1984",
  //     },
  //     {
  //       id: 5,
  //       title: "e",
  //       year: "1988",
  //     },
  //     {
  //       id: 6,
  //       title: "f",
  //       year: "1984",
  //     },
  //     {
  //       id: 7,
  //       title: "g",
  //       year: "1988",
  //     },
  //     {
  //       id: 8,
  //       title: "h",
  //       year: "1984",
  //     },
  //     {
  //       id: 9,
  //       title: "i",
  //       year: "1988",
  //     },
  //     {
  //       id: 10,
  //       title: "o",
  //       year: "1984",
  //     },
  //   ];

  return (
    <DataTableStyled
      $mode={theme}
      columns={columns}
      data={data}
      selectableRows={selectableRows}
      pagination={paginationBool}
      paginationIconNext={<FaAngleRight />}
      paginationIconPrevious={<FaAngleLeft />}
      paginationIconFirstPage={<FaAnglesLeft />}
      paginationIconLastPage={<FaAnglesRight />}
    />
  );
};

export default TableData;
