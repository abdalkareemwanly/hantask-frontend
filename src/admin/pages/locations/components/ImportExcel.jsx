import { toast } from "react-toastify";
import ReusableForm from "../../../../Components/ReusableForm";
import axiosClient from "../../../../axios-client";
import { useMutationHook } from "../../../../hooks/useMutationHook";
import { useGlobalDataContext } from "../../../../contexts/GlobalDataContext";
const postData = async ({ importFor, formData }) => {
  if (importFor === "areas") {
    const res = await axiosClient.post("/admin/area/import", formData);
    return res;
  } else if (importFor === "countries") {
    const res = await axiosClient.post("/admin/country/import", formData);
    return res;
  } else {
    const res = await axiosClient.post("/admin/city/import", formData);
    return res;
  }
};

const ImportExcel = ({ getMethod, setIsModalOpen, apiLink, importFor }) => {
  const { countries, setSelectedCountry, filteredCities, cities } =
    useGlobalDataContext();
  let template =
    importFor == "areas"
      ? {
          title: "select a file to import",
          fields: [
            {
              title: "choose the country",
              name: "country_id",
              type: "select",
              onFieldChange: (
                option,
                setValue,
                setSelectedOptions,
                selectIndex
              ) => {
                console.log(option);
                setSelectedCountry({ id: option });
                setValue && setValue("service_city_id", null);
                setSelectedOptions &&
                  setSelectedOptions((prev) =>
                    prev.map((ele, i) => (i === selectIndex + 1 ? [] : ele))
                  );
              },
              validationProps: {
                required: {
                  value: true,
                  message: "this field is required",
                },
              },
              options: [...countries],
              optionText: "country",
              optionValue: "id",
              searchKey: "country",
            },
            {
              title: "choose city",
              name: "service_city_id",
              options: [...filteredCities],
              type: "select",
              validationProps: {
                required: {
                  value: true,
                  message: "this field is required",
                },
              },
              optionText: "service_city",
              searchKey: "service_city",
              optionValue: "id",
            },
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
        }
      : importFor == "countries"
      ? {
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
        }
      : importFor == "cities" && {
          title: "select a file to import",
          fields: [
            {
              title: "choose country",
              name: "country_id",
              type: "select",

              options: [...countries],
              optionText: "country",
              optionValue: "id",
              searchKey: "country",
            },
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
    const toastId = toast.loading("submitting, please wait...");
    const formData = new FormData();
    if (values.country_id) {
      formData.append("country_id", values.country_id[0]?.id);
    }
    formData.append("file", values.file[0]);
    try {
      const country = await mutation.mutateAsync({ importFor, formData });
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
