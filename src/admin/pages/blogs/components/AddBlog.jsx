import { useEffect, useState } from "react";
import { useMutationHook } from "../../../../hooks/useMutationHook";
import { toast } from "react-toastify";
import ReusableForm from "../../../../Components/ReusableForm";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import SunEditor from "suneditor-react";
import axiosClient from "../../../../axios-client";

const postData = async (formData) => {
  const res = await axiosClient.post("/admin/blogs/store", formData);
  return res;
};

const AddBlog = ({ setIsAddModalOpen }) => {
  const [image, setImage] = useState();
  const [value, setValue] = useState("<p>type your blog content here</p>");
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
        name: "title",
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
        title: "description",
        name: "description",
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
        type: "custom",
        customComponent: ({ setError, setValue, errors, clearErrors }) => {
          console.log(errors);
          useEffect(() => {
            if (value === "<p><br></p>") {
              setError("textEditor", "content is required");
            } else {
              clearErrors("textEditor");
            }
          }, [value]);
          return (
            <>
              <label htmlFor="sample">content:</label>
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
                <span className="red-text">content is required</span>
              )}
            </>
          );
        },
        styles: "md:w-[100%]",
      },
    ],
  };

  const mutation = useMutationHook(postData, ["blogs"]);

  const onSubmit = async (values) => {
    const id = toast.loading("please wait...");

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("meta_description", values.description);
    formData.append("description", value);
    formData.append("image", image);
    try {
      const blog = await mutation.mutateAsync(formData);
      toast.update(id, {
        type: "success",
        render: blog.data.message,
        closeOnClick: true,
        isLoading: false,
        autoClose: true,
        closeButton: true,
        pauseOnHover: false,
      });
      setIsAddModalOpen((prev) => !prev);
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

export default AddBlog;
