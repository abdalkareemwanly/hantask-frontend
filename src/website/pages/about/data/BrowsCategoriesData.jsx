import { FaTruckMoving } from "react-icons/fa6";
import { TiScissors } from "react-icons/ti";
import { MdOutlineCleaningServices } from "react-icons/md";
import { MdElectricMeter } from "react-icons/md";
import { FaRegCopyright } from "react-icons/fa6";

const BROWS_CATEGORIES_DATA = {
  paragraph: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
  list: [
    {
      icon: <FaTruckMoving />,
      name: "Home Move",
      number: "2",
    },
    {
      icon: <TiScissors />,
      name: "Salon & Spa",
      number: "3",
    },
    {
      icon: <MdOutlineCleaningServices />,
      name: "Cleaning",
      number: "2",
    },
    {
      icon: <MdElectricMeter />,
      name: "Electronic",
      number: "3",
    },
    {
      icon: <FaRegCopyright />,
      name: "Digital Marketing",
      number: "3",
    },
  ],
};

export default BROWS_CATEGORIES_DATA;
