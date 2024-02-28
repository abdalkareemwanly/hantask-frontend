import { Link } from "react-router-dom";
import { TiSocialFacebook } from "react-icons/ti";
import { PiYoutubeLogo } from "react-icons/pi";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="py-12  bg-[#1c1c1c] text-white relative">
        <div className=" flex flex-col flex-wrap justify-between w-full gap-8 lg:flex-row lg:px-20 md:px-12 px-6">
          <div className="flex-[40%]">
            <div className="font-semibold text-xl mb-8">
              <img
                src="/src/images/logo-dark.png"
                className="w-48"
                alt="Logo"
              />
            </div>
            <div className="text-sm text-gray-300">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less.
            </div>
          </div>
          <div className="flex flex-[40%]">
            <div className="flex-[25%]">
              <div className="font-semibold text-xl mb-8">Community</div>
              <div className="flex flex-col gap-5 items-start text-gray-300">
                <Link className="flex gap-2 items-center">
                  <span>home</span>
                </Link>
              </div>
            </div>
            <div className="flex-[25%]">
              <div className="font-semibold text-xl mb-8">Category</div>
              <div className="flex flex-col gap-5 items-start text-gray-300">
                <Link className="flex gap-2 items-center">
                  <span>home</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="flex flex-col items-center md:items-start md:flex-row justify-between gap-8 lg:flex-row lg:px-20 md:px-12 px-6 py-6 bg-[#3e3e3e] text-white">
        <div>terms & conditions</div>
        <div className="flex gap-4 items-center">
          <TiSocialFacebook size={25} />
          <PiYoutubeLogo size={22} />
          <FaInstagram size={22} />
          <FaTwitter size={22} />
        </div>
      </div>
    </>
  );
};

export default Footer;
