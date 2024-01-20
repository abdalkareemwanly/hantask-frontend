import { toast } from "react-toastify";
import ReusableForm from "../../../../Components/ReusableForm";
import axiosClient from "../../../../axios-client";
import { useMutationHook } from "../../../../hooks/useMutationHook";
const postData = async (formData) => {
  const res = await axiosClient.post("/admin/country/import", formData);
  return res;
};
const ImportExcel = ({ getMethod, setIsModalOpen, apiLink }) => {
  let template = {
    title: "select a file to import",
    fields: [
      {
        name: "file",
        fileFor: "any",
        type: "file",
        acceptTypes:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
      },
    ],
  };
  const mutation = useMutationHook(postData, ["countries"]);

  const onSubmit = async (values) => {
    const toastId = toast.loading("please wait");
    const formData = new FormData();
    formData.append("file", values.file[0]);
    try {
      const country = await mutation.mutateAsync(formData);
      setIsModalOpen((prev) => !prev);
      toast.update(toastId, {
        type: "success",
        render: country.mes,
        closeOnClick: true,
        isLoading: false,
        autoClose: true,
        closeButton: true,
        pauseOnHover: false,
      });
    } catch (error) {
      toast.update(toastId, {
        type: "error",
        render: error.response.data.message,
        closeOnClick: true,
        isLoading: false,
        autoClose: true,
        closeButton: true,
        pauseOnHover: false,
      });
    }
  };

  return (
    <ReusableForm
      template={template}
      onSubmit={onSubmit}
      btnText={"import file"}
      addedStyles={"md:w-[400px]"}
    />
  );
};

export default ImportExcel;
