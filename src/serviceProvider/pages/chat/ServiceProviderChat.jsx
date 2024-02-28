import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import ChatBody from "./components/ChatBody";
import ChatFooter from "./components/ChatFooter";
import ChatHeader from "./components/ChatHeader";
import PersonalBox from "./components/PersonalBox";
import UserChatBox from "./components/UserChatBox";
import { useQueryHook } from "../../../hooks/useQueryHook";
import Loader from "../../../Components/Loader";
import { useStateContext } from "../../../contexts/ContextsProvider";

const getContactsFunc = async () => {
  const res = await axiosClient.get(`seller/getContact`);
  return res.data.data;
};

const getContactMessages = async (id) => {
  const res = await axiosClient.get(`seller/getMessage/${id}`);
  return res.data.data;
};
const ServiceProviderChat = ({ selectedUserFromOther }) => {
  const { pusherChanel } = useStateContext();
  const user = JSON.parse(localStorage.getItem("USER"));

  const [selectedUser, setSelectedUser] = useState(selectedUserFromOther);

  const { data: messages, isLoading: isLoadingMessages } = useQueryHook(
    ["usersChat"],
    () => getContactMessages(selectedUser?.id)
  );

  const { data: contacts, isLoading: isLoadingContacts } = useQueryHook(
    ["userContacts"],
    () => getContactsFunc()
  );

  console.log(contacts);

  return isLoadingContacts ? (
    <Loader />
  ) : (
    <div className="flex gap-6 items-start justify-start h-[80vh] my-8 overflow-hidden w-full">
      <div className="fixed right-10 lg:right-0 lg:relative lg:w-[30%] h-[100%] bg-blocks-color rounded-xl component-shadow p-3 flex flex-col gap-10 overflow-hidden">
        <div>
          <PersonalBox user={user} />
        </div>
        <div className="flex flex-col gap-4 h-[100%] overflow-y-auto overflow-hidden">
          <UserChatBox
            selectedUser={selectedUser}
            setSelectedUsers={setSelectedUser}
          />
        </div>
      </div>
      <div className="lg:w-[70%] w-full  h-[100%] bg-blocks-color rounded-xl component-shadow ">
        <div className="h-[10%] rounded-t-xl border-b border-mainBorder flex items-center px-8">
          <ChatHeader selectedUser={selectedUser} />
        </div>
        <div className="h-[75%] overflow-y-auto">
          <ChatBody messages={messages} />
        </div>
        <div className="h-[15%]  rounded-b-xl border-t border-mainBorder flex items-center gap-8 justify-center">
          <ChatFooter />
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderChat;
