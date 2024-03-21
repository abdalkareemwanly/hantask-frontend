import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import SunEditor from "suneditor-react";
import { Page } from "../../../../Components/StyledComponents";
import PageTitle from "../../../../Components/PageTitle";
import { useState } from "react";
import Button from "../../../../Components/Button";
import axiosClient from "../../../../axios-client";

const Privacy = () => {
  const [value, setValue] = useState("<p>hello world</p>");

  function handleChange(content) {
    setValue(content);
  }

  console.log(value);

  const handleSubmit = async () => {
    const data = {
      title: "privacy",
      content: value,
    };

    const res = await axiosClient.post("/admin/pageContent/store", data);
    console.log(res);
  };
  return (
    <Page>
      <PageTitle text={"manage privacy page"} />
      <div className="my-4">
        <SunEditor
          id="sample"
          defaultValue={value}
          onChange={handleChange}
          setAllPlugins={true}
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
