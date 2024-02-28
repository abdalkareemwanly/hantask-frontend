import { useState } from "react";
import { Page } from "../../../Components/StyledComponents";
import TableData from "../../../Components/TableData";
import COLUMNS from "./data/columns";
import axiosClient from "./../../../axios-client";
import { useQueryHook } from "./../../../hooks/useQueryHook";
import Loader from "./../../../Components/Loader";

const getNotifications = async (page) => {
  const res = await axiosClient.get(`/seller/notifications?page=${page}`);
  return res;
};

function ServiceProviderNotifications() {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQueryHook(["notifications", page], () =>
    getNotifications(page)
  );

  return isLoading ? (
    <Loader />
  ) : (
    <Page>
      <div className="recent-ticket xl:col-span-3 col-span-5 bg-blocks-color p-[20px] rounded-[10px]">
        <div className=" flex justify-between border-b border-light-text  pb-[20px]">
          <h4 className="text-[24px] leading-[1.2] font-[600] text-primary-text">
            All Notification
          </h4>
        </div>
        <TableData
          columns={COLUMNS}
          enableSearch={false}
          response={data}
          actualData={data?.data?.data}
          setPage={setPage}
          paginationBool={true}
          noDataMessage={"no notifications to show!"}
        />
      </div>
    </Page>
  );
}

export default ServiceProviderNotifications;
