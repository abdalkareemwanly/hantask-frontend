import { useState } from "react";
import Button from "../../../../Components/Button";
import { useMutationHook } from "../../../../hooks/useMutationHook";
import axiosClient from "../../../../axios-client";

const postData = async ({ reportId, data }) => {
  const res = await axiosClient.post(
    `/buyer/report/message/store/${reportId}`,
    data
  );
  return res;
};

function CustomerChatFooter(props) {
  const { reportId } = props;

  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);

  const mutate = useMutationHook(postData, ["messages", reportId]);

  const onSubmit = async () => {
    const data = new FormData();
    data.append("message", message);
    data.append("file", file);

    const res = mutate.mutateAsync({ reportId, data });
    console.log(res);
  };

  return (
    <>
      <form className="flex flex-col gap-[20px]">
        <div>
          <label className="text-[16px] text-secondary-text">Message:</label>
          <textarea
            className="input-box w-full"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          >
            {message}
          </textarea>
        </div>
        <div className="flex flex-col">
          <label htmlFor="file" className="text-[16px] text-secondary-text">
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
          onClickFun={onSubmit}
        />
      </form>
    </>
  );
}

export default CustomerChatFooter;
