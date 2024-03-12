import { useEffect, useState } from "react";
import FormHeader from "./components/FormHeader";
import FormCategory from "./components/FormCategory";
import axiosClient from "../../../axios-client";
import { toast } from "react-toastify";
import FormTableQuestions from "./components/FormTableQuestions";
import ModalContainer from "./../../../Components/ModalContainer";
import EditFormData from "./components/EditFormData";
const getQuestionsById = async (id, idType) => {
  const res = await axiosClient.post(`/admin/question/show`, { [idType]: id });
  return res;
};
export default function FormBuilderShow() {
  const [selectedButton, setSelectedButton] = useState(null);
  const [formbuilder, setFormBuilder] = useState(null);
  const [catQuestions, setCatQuestions] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [editQuestionSelected, setEditQuestionSelected] = useState();
  const [form, setForm] = useState({
    category_id: null,
    subcategory_id: null,
    child_category_id: null,
    content: "",
    type: "",
    answer: [],
  });

  useEffect(() => {
    const getData = async () => {
      if (form.category_id !== null) {
        const questions = await getQuestionsById(
          form.category_id,
          "category_id"
        );
        setCatQuestions(questions);
      } else if (form.subcategory_id) {
        const questions = getQuestionsById(
          form.subcategory_id,
          "subcategory_id"
        );
        setCatQuestions(questions);
      } else if (form.child_category_id) {
        const questions = getQuestionsById(
          form.child_category_id,
          "child_category_id"
        );
        setCatQuestions(questions);
      }
    };
    getData();
  }, [form.category_id, form.subcategory_id, form.child_category_id]);

  const createFrom = (title, value) => {
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
  };

  return (
    <div className="h-full">
      {editModal && (
        <ModalContainer
          setIsModalOpen={setEditModal}
          component={
            <EditFormData
              setEditQuestionSelected={setEditQuestionSelected}
              editQuestionSelected={editQuestionSelected}
              formbuilder={formbuilder}
              submitForm={submitForm}
            />
          }
        />
      )}
      <div className="flex gap-4 flex-wrap sm:flex-row flex-col py-8 ">
        <div className="flex flex-1 flex-col gap-4 items-center p-4 component-shadow rounded-md bg-blocks-color h-[300px]">
          <div className="flex flex-row w-full">
            first let's choose a category type
          </div>
          <FormHeader
            handleButtonClick={handleButtonClick}
            selectedButton={selectedButton}
          />
        </div>
        <div className="flex flex-[3] flex-col gap-2 w-full component-shadow rounded-md  bg-blocks-color">
          <FormCategory formcategory={selectedButton} createFrom={createFrom} />
          <FormTableQuestions
            setEditQuestionSelected={setEditQuestionSelected}
            setEditModal={setEditModal}
            data={catQuestions}
            formbuilder={formbuilder}
          />
        </div>
      </div>
    </div>
  );
}
