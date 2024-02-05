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

const SerProHomePage = () => {
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
        <div className="top-section grid grid-cols-2 gap-[20px] items-start">
          <div className="xl:col-span-1 col-span-2 grid grid-cols-2 grid-rows-2 gap-[20px]">
            <StatisticsCard
              iconColor={"blueColor"}
              title={"Order In Progress"}
              value={"40"}
              icon={<GiSandsOfTime />}
            />
            <StatisticsCard
              iconColor={"orangeColor"}
              title={"Order Pending"}
              value={"31"}
              icon={<FaListUl />}
            />
            <StatisticsCard
              iconColor={"greenColor"}
              title={"Order Completed"}
              value={"567"}
              icon={<FaRegCheckSquare />}
            />
            <StatisticsCard
              iconColor={"redColor"}
              title={"Total Order"}
              value={"782"}
              icon={<HiClipboardList />}
            />
          </div>
          <div className="xl:col-span-1 col-span-2 bg-blocks-color p-[20px] rounded-[10px]">
            <div className=" flex justify-between border-b border-light-text  pb-[20px]">
              <h4 className="text-[24px] leading-[1.2] font-[600] text-primary-text">
                Notifications
              </h4>
              <Link
                to={"/customer/notifications"}
                className="text-blueColor hover:text-orangeColor duration-[500ms]"
              >
                View all
              </Link>
            </div>
            <div className="pt-[20px] ">
              <span className="flex justify-center items-center">
                no notificatoin
              </span>
            </div>
          </div>
        </div>
        <div className="top-section grid grid-cols-5 gap-[20px] items-start">
          <div className="recent-orders xl:col-span-2 col-span-5 bg-blocks-color p-[20px] rounded-[10px]">
            <div className=" flex justify-between border-b border-light-text  pb-[20px]">
              <h4 className="text-[24px] leading-[1.2] font-[600] text-primary-text">
                Recent Orders
              </h4>
            </div>
            <div className="pt-[20px] flex flex-col">
              {recentOrders.map((item, index) => {
                return <RecentOrdersItem key={index} item={item} />;
              })}
            </div>
          </div>
          <div className="recent-ticket xl:col-span-3 col-span-5 bg-blocks-color p-[20px] rounded-[10px]">
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
          </div>
        </div>
      </div>
    </Page>
  );
};

export default SerProHomePage;
