import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineWorkOutline } from "react-icons/md";
import { IoCalendar } from "react-icons/io5";
import { IoMailOpenOutline } from "react-icons/io5";

const APPLY_JOB_STEPS = [
  {
    icon: <IoMailOpenOutline />,
    name: "Booking Information",
  },
  {
    icon: <IoCalendar />,
    name: "Date",
  },
  {
    icon: <FaCheckCircle />,
    name: "Confirmation",
  },
];

export default APPLY_JOB_STEPS;
