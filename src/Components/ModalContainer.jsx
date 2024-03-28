import { AnimatePresence, motion } from "framer-motion";
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
          zIndex: "10000",
        }}
      >
        <div
          className={`p-8 ${
            type ? "bg-gray-700" : "bg-background-color"
          }  shadow-2xl rounded-lg component-shadow md:w-fit w-fit sm:w-[350px]`}
        >
          {component}
        </div>
      </motion.div>

      <div
        onClick={handleCloseModal}
        className={`fixed inset-0 ${
          type ? "bg-[#4e4e4ea9]" : "bg-[#000000a9]"
        }  w-full h-full z-[100]`}
      ></div>
    </AnimatePresence>
  );
};

export default ModalContainer;
