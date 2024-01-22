import { useEffect, useState } from "react";
import { Page } from "../../../Components/StyledComponents";
import axiosClient from "../../../axios-client";
import { useQueryHook } from "../../../hooks/useQueryHook";
import CustomerChatBody from "./components/ChatBody";
import CustomerChatFooter from "./components/ChatFooter";
import CustomerChatHeader from "./components/ChatHeader";

function CustomerChat(props) {
  try {
    const getData = async () => {
      const res = await axiosClient.get(`buyer/getContact`);
      return res;
    };

    const { data: contacts, queryClient } = useQueryHook(["contacts"], () => getData());

    useEffect(() => {
      setTimeout(() => {
        queryClient.prefetchQuery({
          queryKey: ["contacts"],
          queryFn: () => getData(),
          staleTime: 60 * 60 * 1000,
        });
      }, 500);
    }, [contacts, queryClient]);

    return (
      <>
        <Page>
          {console.log(contacts)}
          <div className="recent-ticket xl:col-span-3 col-span-5 bg-blocks-color p-[20px] rounded-[10px]">
            <CustomerChatHeader reportId={1} orderId={3} reportFrom={"abdullah"} />
            <h4 className="text-[24px] leading-[1.2] font-[600] text-primary-text mb-[10px] mt-[20px]">All Conversation</h4>
            <CustomerChatBody />
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
