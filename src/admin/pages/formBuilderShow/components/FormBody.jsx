import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FormBody = ({ setEditQuestionSelected, editQuestionSelected }) => {
  return (
    <div className="w-full">
      <div className="">
        <div className="mb-4">
          <label htmlFor="type" className="block my-2">
            Question Type
          </label>
          <select
            id="type"
            name="type"
            value={editQuestionSelected.type}
            onChange={(ev) =>
              setEditQuestionSelected((prev) => ({
                ...prev,
                type: ev.target.value,
              }))
            }
            className="input-box w-[60%] bg-blocks-color"
          >
            <option value="singlechoisdrop">Single choise</option>
            <option value="multiplechoise">Multiple choise</option>
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
            value={editQuestionSelected.content}
            onChange={(ev) =>
              setEditQuestionSelected((prev) => ({
                ...prev,
                content: ev.target.value,
              }))
            }
            className="input-box w-full bg-blocks-color"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default FormBody;
