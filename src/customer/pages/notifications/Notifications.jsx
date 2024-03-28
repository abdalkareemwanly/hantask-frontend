import { useState } from "react";
import { Page } from "../../../Components/StyledComponents";
import TableData from "../../../Components/TableData";
import COLUMNS from "./data/columns";
import { useStateContext } from "../../../contexts/ContextsProvider";

function Notifications(props) {
  const { notifications, setNotificationsPage } = useStateContext();
  return (
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
          response={notifications}
          actualData={notifications?.data?.data}
          setPage={setNotificationsPage}
          paginationBool={true}
          noDataMessage={"no recent tickets to show!"}
        />
      </div>
    </Page>
  );
}

export default Notifications;
