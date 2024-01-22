import CustomerChatMessage from "./ChatMessage";

function CustomerChatBody(props) {
  try {
    const data = [
      {
        sender_id: 1,
        reciever_id: 2,
        message: <div>hello world</div>,
        date: new Date().toLocaleString(),
        file: "sdfk",
      },
      {
        sender_id: 1,
        reciever_id: 2,
        message: <strong>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat sed eos ipsa neque nihil nemo!</strong>,
        date: new Date().toLocaleString(),
        file: "sdfk",
      },
      {
        sender_id: 2,
        reciever_id: 1,
        message: <div>hello world</div>,
        date: new Date().toLocaleString(),
        file: "sdfk",
      },
      {
        sender_id: 2,
        reciever_id: 1,
        message: <div>Lorem ipsum dolor sit amet, consectetusdf sdfsd fsdf sdfr adi</div>,
        date: new Date().toLocaleString(),
        file: "sdfk",
      },
    ];
    return (
      <>
        <div className="flex flex-col">
          {data.map((item, index) => {
            return <CustomerChatMessage key={index} file={item.file} message={item.message} date={item.date} type={item.sender_id == 1 ? "sent" : "received"} isFirst={index == 0 || data[index].sender_id != data[index - 1].sender_id} name={"Abdullah"} image={"https://picsum.photos/200/300"} />;
          })}
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default CustomerChatBody;
