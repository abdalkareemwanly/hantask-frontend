import { AnimatePresence, motion } from "framer-motion";
const ModalContainer = ({ setIsModalOpen, component }) => {
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
          top: "25px",
          left: "50%",
          zIndex: "100",
        }}
      >
        <div className="p-8 bg-background-color rounded-lg component-shadow md:w-fit w-[350px]">
          {component}
        </div>
      </motion.div>
      <div
        onClick={handleCloseModal}
        className="fixed inset-0 bg-[#000000a9] w-full h-full z-[20]"
      ></div>
    </AnimatePresence>
  );
};

export default ModalContainer;
