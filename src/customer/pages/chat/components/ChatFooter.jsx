import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Button from "../../../../Components/Button";

function CustomerChatFooter(props) {
  try {
    const [message, setMessage] = useState("");
    const [file, setFile] = useState(null);

    return (
      <>
        <form className="flex flex-col gap-[20px]">
          <div>
            <label className="text-[16px] text-light-text">Message:</label>
            <ReactQuill theme="snow" value={message} onChange={setMessage} />
          </div>
          <div className="flex flex-col">
            <label htmlFor="file" className="text-[16px] text-light-text">
              File:
            </label>
            <input
              type="file"
              name={"file"}
              className="fileInput"
              id={"file"}
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
          </div>

          <Button
            isLink={false}
            title={"Send Message"}
            width={"max-content"}
            color={"bg-greenColor"}
            onClickFun={() => {
              console.log(message, file);
            }}
          />
        </form>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default CustomerChatFooter;
