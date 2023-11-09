import { AnimatePresence, motion } from "framer-motion";
const EditUserModal = ({ setIsModalOpen, component }) => {
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
          position: "absolute",
          translateX: "-50%",
          top: "25px",
          left: "50%",
          zIndex: "100",
        }}
      >
        {component}
      </motion.div>
      <div
        onClick={handleCloseModal}
        className="fixed inset-0 bg-[#000000a9] w-full h-full z-[20]"
      ></div>
    </AnimatePresence>
  );
};

export default EditUserModal;
