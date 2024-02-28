import { useEffect, useState } from "react";
import { Page } from "../../../Components/StyledComponents";
import axiosClient from "../../../axios-client";
import { useQueryHook } from "../../../hooks/useQueryHook";
import CustomerChatBody from "./components/ChatBody";
import CustomerChatFooter from "./components/ChatFooter";
import CustomerChatHeader from "./components/ChatHeader";
import { useLocation, useParams } from "react-router-dom";
import Loader from "../../../Components/Loader";

const getData = async (id) => {
  const res = await axiosClient.get(`/admin/report/message/${id}`);
  return res.data.data;
};

function AdminCustomerChat(props) {
  const { id } = useParams();
  const { fromId } = useLocation().state;
  console.log(fromId);
  const { data: messages, isLoading } = useQueryHook(
    ["messages", id],
    () => getData(id),
    "normal"
  );
  console.log(messages);
  if (isLoading) return <Loader />;

  return (
    <>
      <Page>
        <div className="recent-ticket xl:col-span-3 col-span-5 bg-blocks-color p-[20px] rounded-[10px]">
          <CustomerChatHeader
            reportId={1}
            orderId={3}
            reportFrom={"abdullah"}
          />
          <h4 className="text-[24px] leading-[1.2] font-[600] text-primary-text mb-[10px] mt-[20px]">
            All Conversation
          </h4>
          <CustomerChatBody messages={messages} />
          <h4 className="text-[24px] leading-[1.2] font-[600] text-primary-text mb-[20px] mt-[20px]">
            Reply To Message
          </h4>
          <CustomerChatFooter reportId={id} fromId={fromId} />
        </div>
      </Page>
    </>
  );
}

export default AdminCustomerChat;
