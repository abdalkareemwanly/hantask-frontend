import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

const Footer = () => {
  return (
    <footer className="py-12  bg-[#F9FAFB] relative">
      <div className=" flex flex-col flex-wrap justify-between w-full gap-8 lg:flex-row lg:px-20 md:px-12 px-6">
        <div className="flex-1">
          <div className="font-semibold text-xl mb-8">
            <img src="/src/images/logo-light.png" className="w-48" alt="Logo" />
          </div>
          <div>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less.
          </div>
        </div>
        <div className="flex-1">
          <div className="font-semibold text-xl mb-8">Community</div>
          <div className="flex flex-col gap-5 items-start">
            <Link className="flex gap-2 items-center">
              <IoIosArrowForward />
              <span>home</span>
            </Link>
          </div>
        </div>
        <div className="flex-1">
          <div className="font-semibold text-xl mb-8">Category</div>
          <div className="flex flex-col gap-5 items-start">
            <Link className="flex gap-2 items-center">
              <IoIosArrowForward />
              <span>home</span>
            </Link>
          </div>
        </div>
        <div className="flex-1">
          <div className="font-semibold text-xl mb-8">Contact Info</div>
          <div className="flex flex-col gap-5 items-start">
            <Link className="flex gap-2 items-center">
              <IoIosArrowForward />
              <span>home</span>
            </Link>
          </div>
        </div>
      </div>
      <hr className="border my-4" />
      <div className="flex flex-col items-center md:items-start md:flex-row justify-between gap-8 lg:flex-row lg:px-20 md:px-12 px-6">
        <div>terms & conditions</div>
        <div>terms & conditions</div>
        <div>terms & conditions</div>
      </div>
    </footer>
  );
};

export default Footer;
