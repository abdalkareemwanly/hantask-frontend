import { AnimatePresence, motion } from "framer-motion";

const FormTableQuestions = ({ formbuilder, createFrom }) => {
  return (
    <AnimatePresence>
      {(formbuilder === "question" || formbuilder === "answer") && (
        <motion.div
          key="step4"
          className="px-4 py-2 w-full"
          initial={{ opacity: 0, x: "10%" }}
          animate={{ opacity: 1, x: "0" }}
          exit={{ opacity: 0, x: "-10%" }}
          transition={{ duration: 0.9, ease: "backOut" }}
        >
          اثممخ
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FormTableQuestions;
