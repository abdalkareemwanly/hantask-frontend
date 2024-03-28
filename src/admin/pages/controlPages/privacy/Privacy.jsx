import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import SunEditor from "suneditor-react";
import { Page } from "../../../../Components/StyledComponents";
import PageTitle from "../../../../Components/PageTitle";
import { useEffect, useState } from "react";
import Button from "../../../../Components/Button";
import axiosClient from "../../../../axios-client";
import Loader from "./../../../../Components/Loader";

const Privacy = () => {
  const [value, setValue] = useState("<p>hello world</p>");
  const [loading, setLoading] = useState(true);
  const [pageUpdate, setPageUpdate] = useState(false);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await axiosClient.post("/admin/pageContent/showbytitle", {
        title: "privacy",
      });
      setValue(res.data?.content);
      setLoading(false);
    };
    getData();
  }, [pageUpdate]);
  function handleChange(content) {
    setValue(content);
  }

  const handleSubmit = async () => {
    const data = {
      title: "privacy",
      content: value,
    };

    const res = await axiosClient.post("/admin/pageContent/update", data);
    setPageUpdate(!pageUpdate);
  };
  return loading ? (
    <Loader />
  ) : (
    <Page>
      <PageTitle text={"manage privacy page"} />
      <div className="my-4">
        <SunEditor
          id="sample"
          defaultValue={value}
          onChange={handleChange}
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
              ["align", "horizontalRule", "list", "table"],
              ["fontColor", "hiliteColor"],
              ["outdent", "indent"],
              ["undo", "redo"],
              ["removeFormat"],
              ["outdent", "indent"],
              ["link", "image"],
              ["preview", "print"],
              ["fullScreen", "showBlocks", "codeView"],
            ],
          }}
        />
        <div className="flex">
          <Button
            onClickFun={handleSubmit}
            color={"bg-greenColor my-4 "}
            title={"save"}
          />
        </div>
      </div>
    </Page>
  );
};

export default Privacy;
