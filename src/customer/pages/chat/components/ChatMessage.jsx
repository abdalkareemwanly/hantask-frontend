import "../style/Message.css";
import { FaFileDownload } from "react-icons/fa";

function CustomerChatMessage({ type, message, date, isFirst, name, file }) {
  try {
    return (
      <>
        <div className={`w-[100%] flex flex-${type == "received" ? "row-reverse" : "row"} gap-[10px] self-${type == "received" ? "end" : "start"} mt-${isFirst ? "[10px]" : "0"}`}>
          {isFirst && <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-background-color">{name[0]}</div>}
          <div
            className={`flex flex-col items-${type == "received" ? "end" : "start"} w-[max-content] max-w-[40%] rounded-[10px] p-[20px] bg-${type == "received" ? "background-color" : "greenColor"} text-primary-text mb-[5px] ${isFirst ? "first-message" : ""} ${type == "received" ? "received-message" : "sent-message"}`}
            style={{ marginLeft: type == "sent" && !isFirst ? "40px" : 0, marginRight: type == "received" && !isFirst ? "40px" : 0 }}
          >
            {isFirst && <span className="font-[500]">{name}</span>}
            <span className="text-[13px] font-[400] opacity-[.8] mb-[10px] ">{date}</span>
            <div>{message}</div>
            {file && (
              <a href={file} download className="text-primary-text opacity-[.7] hover:opacity-[1] duration-[500ms] flex items-center gap-[5px] text-[15px] mt-[20px] cursor-pointer">
                {" Download"}
                <FaFileDownload />
              </a>
            )}
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default CustomerChatMessage;
