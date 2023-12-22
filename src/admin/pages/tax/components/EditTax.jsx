import { toast } from "react-toastify";
import ReusableForm from "../../../../Components/ReusableForm";
import axiosClient from "../../../../axios-client";

export const EditTax = ({ data, getTax, setIsModalOpen, countries }) => {
  const country = countries.find((obj) => obj.country === data.country);
  let template = {
    title: "add new category",
    fields: [
      {
        title: "tax amount",
        name: "tax",
        type: "text",
        value: data.tax,
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "md:w-[100%]",
      },
      {
        title: "code",
        name: "country_id",
        type: "select",
        value: country.id,
        options: [...countries],
        optionText: "country",
        optionValue: "id",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "md:w-[100%]",
      },
    ],
  };

  const onSubmit = async (values) => {
    const id = toast.loading("please wait...");
    const formData = new FormData();
    formData.append("tax", values.tax);
    formData.append("country_id", values.country_id);
    axiosClient
      .post(`/admin/taxe/update/${data.id}`, formData)
      .then((res) => {
        if (res.data.success == false) {
          toast.update(id, {
            type: "error",
            render: res.data.message,
            closeOnClick: true,
            isLoading: false,
            autoClose: true,
            closeButton: true,
            pauseOnHover: false,
          });
        } else {
          getTax();
          setIsModalOpen((prev) => !prev);
          toast.update(id, {
            type: "success",
            render: res.data.mes,
            closeOnClick: true,
            isLoading: false,
            autoClose: true,
            closeButton: true,
            pauseOnHover: false,
          });
        }
      })
      .catch((err) => {
        toast.update(id, {
          type: "success",
          render: err.response.data.mes,
          closeOnClick: true,
          isLoading: false,
          autoClose: true,
          closeButton: true,
          pauseOnHover: false,
        });
      });
  };

  const validate = () => {
    console.log("no");
  };

  return (
    <>
      <ReusableForm
        template={template}
        watchFields={["username", "fullname"]}
        onSubmit={onSubmit}
        validate={validate}
        btnWidth={"w-full text-white"}
        btnText={"submit"}
        addedStyles={"md:w-[400px]"}
      />
    </>
  );
};
