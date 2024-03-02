import React, { useState } from "react";
import FormHeader from "./components/FormHeader";
import FormCategory from "./components/FormCategory";
import FormBody from "./components/FormBody";
import FormAnswer from "./components/FormAnswer";
import FormFooter from "./components/FormFooter";
import axiosClient from "../../../axios-client";
import { toast } from "react-toastify";

export default function FormBuilder() {
  const [selectedButton, setSelectedButton] = useState(null);
  const [formbuilder, setFormBuilder] = useState(null);
  const [form, setForm] = useState({
    category_id: null,
    subcategory_id: null,
    child_category_id: null,
    content: "",
    type: "",
    answer: [],
  });

  const createFrom = (title, value) => {
    console.log(value.answer);
    setFormBuilder(title);
    if (value.cat && selectedButton === "Category") {
      setForm({
        ...form,
        category_id: value.cat,
        subcategory_id: null,
        child_category_id: null,
      });
    } else if (value.cat && selectedButton === "Sub Category") {
      setForm({
        ...form,
        category_id: null,
        subcategory_id: value.cat,
        child_category_id: null,
      });
    } else if (value.cat) {
      setForm({
        ...form,
        category_id: null,
        subcategory_id: null,
        child_category_id: value.cat,
      });
    } else if (value.type) {
      setForm({
        ...form,
        type: value.type,
      });
    } else if (value.content) {
      setForm({
        ...form,
        content: value.content,
      });
    } else if (value.answer) {
      setForm({
        ...form,
        answer: value.answer,
      });
    }
  };

  const handleButtonClick = (button) => {
    setSelectedButton(button);
    setFormBuilder(null);
  };

  const submitForm = () => {
    const id = toast.loading("please wait...");
    axiosClient
      .post("admin/question/store", form) // Use POST to create a new Form Exam
      .then((res) => {
        if (res.data.success == true) {
          setFormBuilder(null);
          toast.update(id, {
            type: "success",
            render: res.data.mes,
            closeOnClick: true,
            isLoading: false,
            autoClose: true,
            closeButton: true,
            pauseOnHover: false,
          });
        } else {
          toast.update(id, {
            type: "error",
            render: res.data.mes,
            closeOnClick: true,
            isLoading: false,
            autoClose: true,
            closeButton: true,
            pauseOnHover: false,
          });
        }
      });
    console.log(form);
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex flex-col bg-blocks-color items-center w-[80%] py-8 px-12 gap-y-6">
        <div className="flex flex-row w-full">
          Choose the category level to which you want to link the form
        </div>
        <FormHeader
          handleButtonClick={handleButtonClick}
          selectedButton={selectedButton}
        />
        <div className="flex flex-col gap-2 w-full bg-background-color">
          <FormCategory formcategory={selectedButton} createFrom={createFrom} />
          <FormBody formbuilder={formbuilder} createFrom={createFrom} />
          <FormAnswer formbuilder={formbuilder} createFrom={createFrom} />
          <FormFooter formbuilder={formbuilder} submitForm={submitForm} />
        </div>
      </div>
    </div>
  );
}
