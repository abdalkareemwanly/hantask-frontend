import { useEffect, useReducer, useState } from "react";
import { Page } from "../../../Components/StyledComponents";
import TableData from "../../../Components/TableData";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import ModalContainer from "../../../Components/ModalContainer";
import { useQueryHook } from "../../../hooks/useQueryHook";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import axiosClient from "../../../axios-client";
import Filter from "../../../Components/Filter";
import Loader from "../../../Components/Loader";

const getData = async (page = 1) => {
  const res = await axiosClient.get(`admin/reports?page=${page}`);
  return res;
};
function AdminReports(props) {
  const [page, setPage] = useState(1);
  const [openDescriptionModal, setOpenDescriptionModal] = useState(false);
  const [description, setDescription] = useState("");

  const COLUMNS = [
    {
      name: "Order ID",
      width: "13.3%",
      selector: (row) => row.orderId,
    },
    {
      name: "Report ID",
      width: "13.3%",
      selector: (row) => row.id,
    },
    {
      name: "Report Details",
      width: "27%",
      cell: (row) => {
        return (
          <div className="flex flex-col text-primary-text gap-[5px]">
            <div>
              <strong>Report From: </strong>
              {row.report_from.name}
            </div>
            <div>
              <strong>Report To: </strong>
              {row.report_to.name}
            </div>
            <div>
              <strong>Report Date: </strong>
              {row.created_at.slice(0, 10)}
            </div>
            <div className="flex gap-[3px]">
              <strong>Description: </strong>
              <span
                onClick={() => {
                  setOpenDescriptionModal(true);
                  setDescription(row.report);
                }}
                className="py-[5px] px-[10px] rounded-[6px] flex justify-center items-center bg-greenColor text-primary-text duration-[500ms] cursor-pointer"
              >
                <FaEye />
              </span>
            </div>
          </div>
        );
      },
    },
    {
      name: "Seller Details",
      width: "27%",
      selector: (row) => {
        return (
          <div className="flex flex-col text-primary-text gap-[5px]">
            <div>
              <strong>Name: </strong>
              {row.report_to.name}
            </div>
            <div>
              <strong>Email: </strong>
              {row.report_to.email}
            </div>
            <div>
              <strong>Phone: </strong>
              {row.report_to.phone}
            </div>
          </div>
        );
      },
    },
    {
      name: "Report ID",
      width: "19.3%",
      cell: (row) => {
        return (
          <Link
            to={`/customer/chat/${row.id}`}
            className="bg-greenColor text-primary-text p-[10px] rounded-[6px] cursor-pointer flex justify-center items-end gap-[5px]"
          >
            <div className="w-[max-content]">Chat To Admin</div>
            <IoChatbubbleEllipsesOutline />
          </Link>
        );
      },
    },
  ];

  const {
    data: reports,
    queryClient,
    isLoading,
  } = useQueryHook(["reports", page], () => getData(page), "paginate", page);

  useEffect(() => {
    setTimeout(() => {
      queryClient.prefetchQuery({
        queryKey: ["reports", page + 1],
        queryFn: () => getData(page + 1),
        staleTime: 60 * 60 * 1000,
      });
    }, 500);
  }, [reports, page, queryClient]);

  const fields = {
    age: {
      value: 42,
      type: "text",
      placeholder: "type anything",
      title: "age",
    },
    name: {
      value: 42,
      type: "number",
      placeholder: "type anything",
      title: "name",
    },
    id: {
      value: 42,
      type: "number",
      placeholder: "type anything",
      title: "id",
    },
  };

  function reducer(state, action) {
    let res = {};
    Object.keys(state).map((element) => {
      if (action.type == `change_${element}`)
        res = {
          ...state,
          [element]: { ...state[element], value: action.newValue },
        };
    });

    return res;
  }

  function handleSearch() {
    console.log(state);
  }

  const [state, dispatch] = useReducer(reducer, fields);
  if (isLoading) return <Loader />;

  return (
    <>
      <Page>
        {console.log("reports is", reports)}
        <div className="flex flex-col gap-[30px]">
          {/* <Filter
            state={state}
            dispatch={dispatch}
            handleSearch={handleSearch}
          /> */}
          <div className="recent-ticket xl:col-span-3 col-span-5 bg-blocks-color p-[20px] rounded-[10px]">
            <div className=" flex justify-between border-b border-light-text  pb-[20px]">
              <h4 className="text-[24px] leading-[1.2] font-[600] text-primary-text">
                All Reports
              </h4>
            </div>
            <TableData
              columns={COLUMNS}
              enableSearch={false}
              response={reports}
              actualData={reports?.data?.data}
              setPage={setPage}
              paginationBool={true}
              noDataMessage={"no reports to show!"}
            />
          </div>
        </div>
        {openDescriptionModal && (
          <ModalContainer
            isModalOpen={openDescriptionModal}
            setIsModalOpen={setOpenDescriptionModal}
            component={
              <div className="min-w-[30vw]">
                <div className=" flex justify-between border-b border-light-text  pb-[20px]">
                  <h5 className="text-[24px] leading-[1.2] font-[600] text-primary-text">
                    Report Details
                  </h5>
                </div>
                <div className="mt-[20px]">{description}</div>
              </div>
            }
          />
        )}
      </Page>
    </>
  );
}

export default AdminReports;
