import { AnimatePresence, motion } from "framer-motion";
import { IoMdCloseCircle } from "react-icons/io";

const ModalContainer = ({ setIsModalOpen, component, type }) => {
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: "-500px" }}
        animate={{ y: "0" }}
        exit={{ y: "-500px" }}
        transition={{ duration: 0.5, type: "spring" }}
        style={{
          position: "fixed",
          translateX: "-50%",
          translateY: "-50%",
          top: "50%",
          left: "50%",
          margin: "32px 0",
          zIndex: "102",
        }}
        className="h-full overflow-hidden overflow-y-auto"
      >
        <div
          className={` ${
            type
              ? type === "site"
                ? "p-1 bg-gray-700"
                : "bg-gray-700 p-8"
              : "bg-background-color p-8"
          }  shadow-2xl rounded-lg component-shadow h-max  md:w-fit w-fit sm:w-[380px]`}
        >
          <div
            className="absolute top-5 right-5 cursor-pointer"
            onClick={handleCloseModal}
          >
            <IoMdCloseCircle size={40} />
          </div>
          {component}
        </div>
      </motion.div>

      <div
        onClick={handleCloseModal}
        className={`fixed cursor-pointer inset-0 ${
          type ? "bg-[#4e4e4ea9]" : "bg-[#000000a9]"
        }  w-full h-full z-[100]`}
      ></div>
    </AnimatePresence>
  );
};

export default ModalContainer;
