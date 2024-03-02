import CustomerChatMessage from "./ChatMessage";

function CustomerChatBody({ messages }) {
  const user = JSON.parse(localStorage.getItem("USER"));
  return (
    <>
      <div className="flex flex-col">
        {messages.map((item, index) => {
          // console.log(item);
          return (
            <CustomerChatMessage
              key={index}
              file={item?.file}
              message={item?.message}
              date={item?.date}
              type={item?.sender_id == user?.id ? "sent" : "received"}
              isFirst={
                index == 0 ||
                messages[index]?.sender_id != messages[index - 1].sender_id
              }
              name={item?.sender_name}
            />
          );
        })}
      </div>
    </>
  );
}

export default CustomerChatBody;
