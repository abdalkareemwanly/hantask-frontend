import { useEffect, useState } from "react";
import axiosClient from "../../../../axios-client";
import { motion, AnimatePresence } from "framer-motion";
import { useGlobalDataContext } from "../../../../contexts/GlobalDataContext";
import ReusableForm from "../../../../Components/ReusableForm";

const FormCategory = ({ formcategory, createFrom }) => {
  const [categoryForm, setCategoryForm] = useState(null);
  const [selectedValue, setSelectedValue] = useState();
  const { categories, subCategories, childCategories } = useGlobalDataContext();
  const [template, setTemplate] = useState();

  useEffect(() => {
    if (formcategory === "Category") {
      setCategoryForm(categories);
    } else if (formcategory === "Sub Category") {
      setCategoryForm(subCategories);
    } else if (formcategory === "Child Category") {
      setCategoryForm(childCategories);
    }
  }, [formcategory]);

  useEffect(() => {
    if (categoryForm) {
      setTemplate({
        title: "",
        fields: [
          {
            name: "categoryId",
            type: "select",
            options: categoryForm,
            optionText: "name",
            optionValue: "id",
            searchKey: "name",
            onFieldChange: (option) => {
              console.log(option);
              createFrom("question", { cat: option });
              setSelectedValue(option);
            },
          },
        ],
      });
    }
  }, [categoryForm]);

  console.log(categoryForm);

  return (
    <div className="z-[100]">
      {formcategory && (
        <AnimatePresence>
          <motion.div
            key="step4"
            className="flex justify-between items-start border-b-2 border-blocks-color px-4 py-4 min-h-[150px]"
            initial={{ opacity: 0, y: "110%" }}
            animate={{ opacity: 1, y: "0" }}
            exit={{ opacity: 0, y: "-110%" }}
            transition={{ duration: 0.9, ease: "backInOut" }}
          >
            <span className="my-7">{formcategory}</span>
            {template && formcategory && (
              <ReusableForm
                template={template}
                // onSubmit={onSubmit}
                // validate={validate}
                btnWidth={"hidden"}
                // btnText={"add"}
                addedStyles={"md:w-[400px] lg:w-[400px]"}
              />
            )}
            {/* <select
              className="input-box w-1/2 bg-background-color"
              value={selectedValue}
              onChange={(ev) => {
                if (ev.target.value != 0) {
                  createFrom("question", { cat: ev.target.value });
                } else {
                  createFrom("asd", { cat: null });
                }
                setSelectedValue(ev.target.value);
              }}
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
            </select> */}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};
export default FormCategory;
