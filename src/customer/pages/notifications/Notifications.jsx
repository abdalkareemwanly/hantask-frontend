import { useState } from "react";
import { Page } from "../../../Components/StyledComponents";
import TableData from "../../../Components/TableData";
import COLUMNS from "./data/columns";

function Notifications(props) {
  try {
    const notifications = [
      {
        id: 1,
        title: "asd sdfs sdf ",
        link: "#",
      },
      {
        id: 1,
        title: "asd sdfs sdf ",
        link: "#",
      },
      {
        id: 1,
        title: "asd sdfs sdf ",
        link: "#",
      },
      {
        id: 1,
        title: "asd sdfs sdf ",
        link: "#",
      },
      {
        id: 1,
        title: "asd sdfs sdf ",
        link: "#",
      },
    ];

    const [page, setPage] = useState(1);

    return (
      <>
        <Page>
          <div className="recent-ticket xl:col-span-3 col-span-5 bg-blocks-color p-[20px] rounded-[10px]">
            <div className=" flex justify-between border-b border-light-text  pb-[20px]">
              <h4 className="text-[24px] leading-[1.2] font-[600] text-primary-text">All Notification</h4>
            </div>
            <TableData columns={COLUMNS} enableSearch={false} response={notifications} actualData={notifications} setPage={setPage} paginationBool={true} noDataMessage={"no recent tickets to show!"} />
          </div>
        </Page>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default Notifications;
