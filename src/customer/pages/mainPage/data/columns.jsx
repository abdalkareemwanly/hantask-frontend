import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const COLUMNS = [
  {
    name: "Ticket Name/ID",
    width: "30%",
    selector: (row) => {
      return (
        <Link to={row.link} className="flex flex-col">
          <span className="text-primary-text">{row.ticketName}</span>
          <span className="text-blueColor">{row.ticketId}</span>
        </Link>
      );
    },
  },
  {
    name: "Order ID",
    selector: (row) => row.orderId,
  },
  {
    name: "Priority",
    selector: (row) => {
      return (
        <Link to={"#"} className="flex justyify-center items-center bg-blueColorAlpha text-blueColorAlpha rounded-[30px] py-[5px] px-[15px] border border-blueColorAlpha" style={{ "--tw-bg-opacity": ".15" }}>
          {row.priority}
        </Link>
      );
    },
  },
  {
    name: "Status",
    selector: (row) => {
      return (
        <Link to={"#"} className="flex justyify-center items-center bg-blueColorAlpha text-blueColorAlpha rounded-[30px] py-[5px] px-[15px] border border-blueColorAlpha" style={{ "--tw-bg-opacity": ".15" }}>
          {row.status}
        </Link>
      );
    },
  },
  {
    name: "Action",
    cell: (row) => {
      return (
        <Link to={row.link} className="w-[40px] h-[40px] rounded-full border border-light-text flex justify-center items-center hover:bg-orangeColor text-light-text hover:text-primary-text duration-[500ms] cursor-pointer">
          <FaEye />
        </Link>
      );
    },
  },
];

export default COLUMNS;
