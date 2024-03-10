import FormAnswer from "./FormAnswer";
import FormBody from "./FormBody";
import FormFooter from "./FormFooter";

const EditFormData = () => {
  return (
    <div>
      <FormBody formbuilder={formbuilder} createFrom={createFrom} />
      <FormAnswer formbuilder={formbuilder} createFrom={createFrom} />
      <FormFooter formbuilder={formbuilder} submitForm={submitForm} />
    </div>
  );
};

export default EditFormData;
