import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
const COLUMNS = [
  {
    name: "No",
    selector: (row) => row.id,
  },
  {
    name: "Title",
    width: "60%",
    selector: (row) => {
      return (
        <Link to={row.link} className="flex items-end gap-[5px]">
          <IoMdCheckmarkCircleOutline /> {row.title}
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
