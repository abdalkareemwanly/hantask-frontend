import FormAnswer from "./FormAnswer";
import FormBody from "./FormBody";
import FormFooter from "./FormFooter";

const EditFormData = ({ formbuilder, createFrom, row }) => {
  console.log(row);
  return (
    <div>
      <FormBody formbuilder={formbuilder} createFrom={createFrom} row={row}/>
      <FormAnswer formbuilder={formbuilder} createFrom={createFrom} />
      <FormFooter formbuilder={formbuilder} 
      // submitForm={submitForm} 
      />
    </div>
  );
};

export default EditFormData;
