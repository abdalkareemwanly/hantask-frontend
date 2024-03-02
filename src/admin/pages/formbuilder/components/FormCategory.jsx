import React, { useEffect, useState } from "react";
import axiosClient from "../../../../axios-client";
import { motion, AnimatePresence } from "framer-motion";

const FormCategory = ({ formcategory, createFrom }) => {
  const [categoryForm, setCategoryForm] = useState(null);

  useEffect(() => {
    getData();
  }, [formcategory]);

  const getData = async () => {
    if (formcategory === "Category") {
      const res = await axiosClient.get(`admin/categories/all`);
      setCategoryForm(res.data.data);
    } else if (formcategory === "Sub Category") {
      const res = await axiosClient.get(`admin/subCategories/all`);
      setCategoryForm(res.data.data);
    } else if (formcategory === "Child Category") {
      const res = await axiosClient.get(`admin/childs/all`);
      setCategoryForm(res.data.data);
    }
  };

  return (
    <div>
      {formcategory && (
        <AnimatePresence>
          <motion.div
            key="step4"
            className="flex justify-between items-center border-b-2 border-blocks-color px-4 py-4"
            initial={{ opacity: 0, y: "110%" }}
            animate={{ opacity: 1, y: "0" }}
            exit={{ opacity: 0, y: "-110%" }}
            transition={{ duration: 0.9, ease: "backInOut" }}
          >
            {formcategory}
            <select
              className="input-box w-1/2"
              value={0}
              onChange={(ev) => createFrom("question", {cat: ev.target.value})}
            >
              <option selected value={0}>
                Select Your Option
              </option>
              {categoryForm &&
                categoryForm.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};
export default FormCategory;
