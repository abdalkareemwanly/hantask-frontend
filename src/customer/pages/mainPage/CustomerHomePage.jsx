import { Link } from "react-router-dom";
import { Page } from "../../../Components/StyledComponents";
import StatisticsCard from "./components/StatisticsCard";
import { GiSandsOfTime } from "react-icons/gi";
import { FaListUl } from "react-icons/fa6";
import { FaRegCheckSquare } from "react-icons/fa";
import { HiClipboardList } from "react-icons/hi";
import RecentOrdersItem from "./components/RecentOrdersItem";
import TableData from "../../../Components/TableData";
import COLUMNS from "./data/columns";
import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";

const CustomerHomePage = () => {
  const [alldata, setData] = useState();

  useEffect(() => {
    getAdminNumber();
  }, []);

  const getAdminNumber = () => {
    axiosClient.get("/seller/dashboard").then((response) => {
      setData(response.data);
    });
  };
  console.log(alldata);

  const recentTickets = [
    {
      ticketId: 11,
      ticketName: "New Ticket",
      orderId: 1,
      priority: "high",
      status: "active",
      link: "#",
    },
    {
      ticketId: 11,
      ticketName: "New Ticket",
      orderId: 1,
      priority: "high",
      status: "active",
      link: "#",
    },
    {
      ticketId: 11,
      ticketName: "New Ticket",
      orderId: 1,
      priority: "high",
      status: "active",
      link: "#",
    },
    {
      ticketId: 11,
      ticketName: "New Ticket",
      orderId: 1,
      priority: "high",
      status: "active",
      link: "#",
    },
  ];

  const recentOrders = [
    {
      orderId: 11,
      orderLink: "#",
      sellerProfileLink: "#",
      sellerName: "Abdullah",
      orderName: "any order name here",
      orderDate: "21/12/2023",
      orderStatus: "Pending",
      bookingDateAndTime: "20/01/24 00.00.00",
      orderType: "Offline",
      orderAmount: 760,
    },
    {
      orderId: 11,
      orderLink: "#",
      sellerProfileLink: "#",
      sellerName: "Abdullah",
      orderName: "any order name here",
      orderDate: "21/12/2023",
      orderStatus: "Pending",
      bookingDateAndTime: "20/01/24 00.00.00",
      orderType: "Offline",
      orderAmount: 760,
    },
    {
      orderId: 11,
      orderLink: "#",
      sellerProfileLink: "#",
      sellerName: "Abdullah",
      orderName: "any order name here",
      orderDate: "21/12/2023",
      orderStatus: "Pending",
      bookingDateAndTime: "20/01/24 00.00.00",
      orderType: "Offline",
      orderAmount: 760,
    },
  ];

  return (
    <Page>
      <div>
        <div className="top-section grid grid-cols-1 gap-[20px] items-start">
          <div className="xl:col-span-1 col-span-2 grid grid-cols-2 grid-rows-2 gap-[20px]">
            <StatisticsCard
              iconColor={"blueColor"}
              title={"Order In Progress"}
              value={alldata?.order_progress}
              icon={<GiSandsOfTime />}
            />
            <StatisticsCard
              iconColor={"orangeColor"}
              title={"Order Pending"}
              value={alldata?.order_pending}
              icon={<FaListUl />}
            />
            <StatisticsCard
              iconColor={"greenColor"}
              title={"Order Completed"}
              value={alldata?.order_completed}
              icon={<FaRegCheckSquare />}
            />
            <StatisticsCard
              iconColor={"redColor"}
              title={"Total Order"}
              value={alldata?.totalOrders}
              icon={<HiClipboardList />}
            />
          </div>
        </div>
        <div className="top-section grid grid-cols-1 gap-[20px] items-start">
          <div className="recent-orders xl:col-span-2 col-span-5 bg-blocks-color p-[20px] rounded-[10px]">
            <div className=" flex justify-between border-b border-light-text  pb-[20px]">
              <h4 className="text-[24px] leading-[1.2] font-[600] text-primary-text">
                Recent Orders
              </h4>
            </div>
            <div className="pt-[20px] flex flex-col">
              {alldata?.lastTenComments.map((item, index) => {
                return <RecentOrdersItem key={index} item={item} />;
              })}
            </div>
          </div>
          {/* <div className="recent-ticket xl:col-span-3 col-span-5 bg-blocks-color p-[20px] rounded-[10px]">
            <div className=" flex justify-between border-b border-light-text  pb-[20px]">
              <h4 className="text-[24px] leading-[1.2] font-[600] text-primary-text">
                latest accepted orders updates
              </h4>
            </div>
            <TableData
              columns={COLUMNS}
              enableSearch={false}
              response={recentTickets}
              actualData={recentTickets}
              paginationBool={false}
              noDataMessage={"no recent tickets to show!"}
            />
          </div> */}
        </div>
      </div>
    </Page>
  );
};

export default CustomerHomePage;
