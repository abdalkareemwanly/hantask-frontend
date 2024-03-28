import { IoMdDownload } from "react-icons/io";

const ChatBody = ({ messages, messagesContainerRef }) => {
  const user = JSON.parse(localStorage.getItem("USER"));

  return (
    <div ref={messagesContainerRef} className="p-4 flex flex-col gap-4 ">
      {messages?.map((message, index) => (
        <div
          key={message?.id}
          className={`md:max-w-[600px] ${
            user.id === message?.sender_id
              ? "p-2 border border-mainBorder rounded-br-2xl rounded-bl-2xl rounded-tr-2xl "
              : "self-end p-2 border border-mainBorder rounded-br-2xl rounded-bl-2xl rounded-tl-2xl"
          }  w-fit max-w-[300px] flex flex-col gap-4 bg-background-color  `}
        >
          <span>{message?.message}</span>
          {message?.file && (
            <span>
              <a
                target="_blank"
                rel="noreferrer"
                href={import.meta.env.VITE_WEBSITE_URL + message?.file}
                className="flex gap-2 items-center text-greenColor"
              >
                <IoMdDownload size={20} /> <span>download file</span>
              </a>
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatBody;
