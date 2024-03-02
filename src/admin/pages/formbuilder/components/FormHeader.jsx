import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../../../Components/Button";

const FormHeader = ({handleButtonClick, selectedButton}) => {

  return (
    <>
      <div className="flex flex-row w-full gap-6">
        <AnimatePresence>
          {selectedButton !== "Category" && (
            <motion.div
              key="step1"
              className="w-1/3"
              initial={{ opacity: 0, x: "-110%" }}
              animate={{ opacity: 1, x: "0" }}
              exit={{ opacity: 0, x: "-110%" }}
              transition={{ duration: 0.6, ease: "backInOut" }}
            >
              <Button
                isLink={false}
                color={"bg-greenColor"}
                title={"Category"}
                onClickFun={() => handleButtonClick("Category")}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {selectedButton !== "Sub Category" && (
          <motion.div
            key="step2"
            className="w-1/3"
            initial={{ opacity: 0, x: "-110%" }}
            animate={{ opacity: 1, x: "0" }}
            exit={{ opacity: 0, x: "-110%" }}
            transition={{ duration: 0.9, ease: "backInOut" }}
          >
            <Button
              isLink={false}
              color={"bg-redColor w-full"}
              title={"Sub Category"}
              onClickFun={() => handleButtonClick("Sub Category")}
            />
          </motion.div>
        )}

        {selectedButton !== "Child Category" && (
          <motion.div
            key="step3"
            className="w-1/3"
            initial={{ opacity: 0, x: "-110%" }}
            animate={{ opacity: 1, x: "0" }}
            exit={{ opacity: 0, x: "-110%" }}
            transition={{ duration: 1.2, ease: "backInOut" }}
          >
            <Button
              isLink={false}
              color={"bg-orangeColor w-full"}
              title={"Child Category"}
              onClickFun={() => handleButtonClick("Child Category")}
            />
          </motion.div>
        )}
      </div>
    </>
  );
};

export default FormHeader;
