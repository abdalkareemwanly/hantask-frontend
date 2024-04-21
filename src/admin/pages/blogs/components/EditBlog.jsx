import { toast } from "react-toastify";
import ReusableForm from "../../../../Components/ReusableForm";
import { useMutationHook } from "../../../../hooks/useMutationHook";
import { useEffect, useState } from "react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import SunEditor from "suneditor-react";
import axiosClient from "../../../../axios-client";

const handleUpdate = async ({ dataId, formData }) => {
  const res = await axiosClient.post(`/admin/blogs/update/${dataId}`, formData);
  return res;
};

const EditBlog = ({ setIsModalOpen, data, page }) => {
  const [image, setImage] = useState(data.image);
  const [value, setValue] = useState(data?.description);
  console.log(value);
  function handleChange(content) {
    setValue(content);
  }
  let template = {
    title: "add new category",
    fields: [
      {
        name: "image",
        type: "file",
        styles: "w-[100%] items-center",
        fileFor: "image",
        imgStyle: "w-[200px] h-[120px] rounded-md",
      },
      {
        title: "blog title",
        name: "name",
        type: "text",
        value: data?.title,
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "md:w-[100%]",
      },
      {
        title: "blog descriptions",
        name: "description",
        type: "custom",
        customComponent: ({ setError, setValue, errors, clearErrors }) => {
          useEffect(() => {
            if (value === "<p><br></p>") {
              setError("textEditor", "description is required");
            } else {
              clearErrors("textEditor");
            }
          }, [value]);
          return (
            <>
              <label htmlFor="sample">description:</label>
              <SunEditor
                id="sample"
                defaultValue={value}
                onChange={handleChange}
                height="100"
                setAllPlugins={true}
                setOptions={{
                  buttonList: [
                    ["font", "fontSize", "formatBlock"],
                    [
                      "bold",
                      "underline",
                      "italic",
                      "strike",
                      "subscript",
                      "superscript",
                    ],
                    ["align", "horizontalRule", "list"],
                    ["fontColor", "hiliteColor"],
                    ["outdent", "indent"],
                    ["undo", "redo"],
                    ["removeFormat"],
                    ["outdent", "indent"],
                    ["fullScreen", "showBlocks"],
                  ],
                }}
              />
              {errors && errors["textEditor"] && (
                <span className="red-text">description is required</span>
              )}
            </>
          );
        },
        styles: "md:w-[100%]",
      },
    ],
  };

  const mutation = useMutationHook(handleUpdate, ["blogs", page]);

  const onSubmit = async (values) => {
    const id = toast.loading("please wait...");
    const formData = new FormData();
    formData.append("title", values.name);
    formData.append("description", value);
    if (/^image/.test(image?.type)) {
      formData.append("image", image);
    }
    const dataId = data?.id;
    try {
      const category = await mutation.mutateAsync({ dataId, formData });
      setIsModalOpen((prev) => !prev);
      toast.update(id, {
        type: "success",
        render: category.data?.message,
        closeOnClick: true,
        isLoading: false,
        autoClose: true,
        closeButton: true,
        pauseOnHover: false,
      });
    } catch (error) {
      toast.update(id, {
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

  const validate = () => {
    console.log("no");
  };

  return (
    <ReusableForm
      template={template}
      watchFields={["username", "fullname"]}
      onSubmit={onSubmit}
      validate={validate}
      btnWidth={"w-full"}
      btnText={"update"}
      addedStyles={"md:w-[600px] lg:w-[600px]"}
      image={image}
      setImage={setImage}
    />
  );
};

export default EditBlog;
