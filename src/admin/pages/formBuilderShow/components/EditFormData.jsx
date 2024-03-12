import Button from "../../../../Components/Button";
import FormAnswer from "./FormAnswer";
import FormBody from "./FormBody";

const EditFormData = ({
  formbuilder,
  createFrom,
  submitForm,
  editQuestionSelected,
  setEditQuestionSelected,
}) => {
  console.log(editQuestionSelected);
  return (
    <div className="w-[700px]">
      <h2 className="text-2xl font-semibold">form builder editor</h2>
      <FormBody
        editQuestionSelected={editQuestionSelected}
        setEditQuestionSelected={setEditQuestionSelected}
        formbuilder={formbuilder}
        createFrom={createFrom}
      />
      <FormAnswer
        editQuestionSelected={editQuestionSelected}
        setEditQuestionSelected={setEditQuestionSelected}
        formbuilder={formbuilder}
        createFrom={createFrom}
      />
      <div className="mt-4">
        <Button
          isLink={false}
          color={"bg-greenColor w-[40%]"}
          title={"Saved Form"}
          onClickFun={() => submitForm()}
        />
      </div>
    </div>
  );
};

export default EditFormData;
