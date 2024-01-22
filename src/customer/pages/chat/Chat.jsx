import { useEffect, useState } from "react";
import { Page } from "../../../Components/StyledComponents";
import axiosClient from "../../../axios-client";
import { useQueryHook } from "../../../hooks/useQueryHook";
import CustomerChatBody from "./components/ChatBody";
import CustomerChatFooter from "./components/ChatFooter";
import CustomerChatHeader from "./components/ChatHeader";

function CustomerChat(props) {
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
        file: "sdfk.pdf",
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
        <Page>
          <div className="recent-ticket xl:col-span-3 col-span-5 bg-blocks-color p-[20px] rounded-[10px]">
            <CustomerChatHeader reportId={1} orderId={3} reportFrom={"abdullah"} />
            <h4 className="text-[24px] leading-[1.2] font-[600] text-primary-text mb-[10px] mt-[20px]">All Conversation</h4>
            <CustomerChatBody messages={data} />
            <h4 className="text-[24px] leading-[1.2] font-[600] text-primary-text mb-[20px] mt-[20px]">Reply To Message</h4>
            <CustomerChatFooter />
          </div>
        </Page>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default CustomerChat;
