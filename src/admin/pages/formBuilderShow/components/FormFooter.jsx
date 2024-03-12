import React, { useState } from "react";
import { BiAddToQueue } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../../../Components/Button";

export default function FormFooter({ formbuilder, submitForm }) {
  return formbuilder === "answer" ? (
    <AnimatePresence>
      <motion.div
        key="step4"
        className="px-4 py-2 w-full"
        initial={{ opacity: 0, y: "110%" }}
        animate={{ opacity: 1, y: "0" }}
        exit={{ opacity: 0, y: "-110%" }}
        transition={{ duration: 0.9, ease: "backInOut" }}
      >
        <div className="flex flex-col gap-4  bg-blocks-color rounded-lg  mb-4">
          <Button
            isLink={false}
            color={"bg-greenColor w-[40%]"}
            title={"Saved Form"}
            onClickFun={() => submitForm()}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  ) : null;
}
