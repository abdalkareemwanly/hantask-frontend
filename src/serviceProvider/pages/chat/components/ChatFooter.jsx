import { useRef, useState } from "react";
import { BsSendFill } from "react-icons/bs";
import { GoPlus } from "react-icons/go";
import { IoMdClose } from "react-icons/io";

const ChatFooter = () => {
  const [data, setData] = useState({
    message: "",
    file: null,
  });

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    // Do something with the selected file
    console.log(selectedFile);
    setData((prev) => ({
      ...prev,
      file: selectedFile,
    }));
  };

  const sendMessage = async () => {
    console.log(data);
  };

  return (
    <div className="flex flex-col gap-2 w-full px-2">
      {data.file && (
        <div className="flex items-center gap-8">
          <span>{data.file?.name}</span>
          <span
            className="text-red-500 cursor-pointer"
            onClick={() => setData((prev) => ({ ...prev, file: null }))}
          >
            <IoMdClose size={20} />
          </span>
        </div>
      )}
      <div className="flex  gap-8">
        <textarea
          type="text"
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              message: e.target.value,
            }))
          }
          value={data.message}
          className="flex-1 border border-mainBorder resize-none px-4 py-1  rounded-lg  bg-background-color outline-none "
        />
        <div className="flex gap-2 items-center ">
          <span
            onClick={handleButtonClick}
            className="w-[43px] h-[43px] flex items-center justify-center rounded-full  bg-blueColor cursor-pointer text-white"
          >
            <GoPlus size={"30"} />
          </span>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <span
            onClick={sendMessage}
            className="w-[43px] h-[43px] flex items-center justify-center rounded-full  bg-greenColor cursor-pointer text-white"
          >
            <BsSendFill size={"23"} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatFooter;
