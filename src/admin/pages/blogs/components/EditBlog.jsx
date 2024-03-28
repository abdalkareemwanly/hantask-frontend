import { toast } from "react-toastify";
import ReusableForm from "../../../../Components/ReusableForm";
import { useMutationHook } from "../../../../hooks/useMutationHook";
import { useEffect, useState } from "react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import SunEditor from "suneditor-react";
const EditBlog = ({ postData, setIsAddModalOpen, data }) => {
  const [image, setImage] = useState();
  const [value, setValue] = useState("<p>hello world</p>");
  function handleChange(content) {
    setValue(content);
  }
  console.log(value);
  let template = {
    title: "add new category",
    fields: [
      {
        name: "image",
        type: "file",
        styles: "w-[100%] items-center",
        fileFor: "image",
        imgStyle: "w-[200px] h-[120px] rounded-md",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
      },
      {
        title: "blog title",
        name: "name",
        type: "text",
        validationProps: {
          required: {
            value: true,
            message: "this field is required",
          },
        },
        styles: "md:w-[100%]",
      },
      {
        title: "blog title",
        name: "name",
        type: "custom",
        customComponent: ({ setError, setValue, errors, clearErrors }) => {
          console.log(errors);
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

  const mutation = useMutationHook(postData, ["categories"]);

  const onSubmit = async (values) => {
    const id = toast.loading("please wait...");
    const category = {
      ...values,
      image,
    };
    const formData = new FormData();
    formData.append("name", category.name);
    formData.append("description", category.description);
    formData.append("image", category.image);
    // formData.append("mobile_icon", category.mobile_icon);
    try {
      const category = await mutation.mutateAsync(formData);
      setIsAddModalOpen((prev) => !prev);
      toast.update(id, {
        type: "success",
        render: category.mes,
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
      btnText={"add"}
      addedStyles={"md:w-[600px] lg:w-[600px]"}
      image={image}
      setImage={setImage}
    />
  );
};

export default EditBlog;
