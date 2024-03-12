import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FormBody = ({ createFrom, formbuilder }) => {
  const [formData, setFormData] = useState({
    type: "",
    content: "",
  });

  return formbuilder === "question" || formbuilder === "answer" ? (
    <AnimatePresence>
      <motion.div
        key="step4"
        className="px-4 py-2 w-full"
        initial={{ opacity: 0, y: "110%" }}
        animate={{ opacity: 1, y: "0" }}
        exit={{ opacity: 0, y: "-110%" }}
        transition={{ duration: 0.9, ease: "backInOut" }}
      >
        <div className=" bg-blocks-color rounded-lg">
          <div className="mb-4">
            <label htmlFor="type" className="block my-2">
              Question Type
            </label>
            <select
              id="type"
              name="type"
              onChange={(ev) => createFrom("answer", { type: ev.target.value })}
              className="input-box w-[60%] bg-background-color"
            >
              <option value="singlechoisradio">Single Chois Radio</option>
              <option value="singlechoisdrop">Single Chois Drop</option>
              <option value="multiplechoise">Multiple Choise</option>
              <option value="write">Write</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block my-2">
              Question
            </label>
            <textarea
              id="content"
              name="content"
              onChange={(ev) =>
                createFrom("answer", { content: ev.target.value })
              }
              className="input-box w-full bg-background-color"
            ></textarea>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  ) : null;
};

export default FormBody;
