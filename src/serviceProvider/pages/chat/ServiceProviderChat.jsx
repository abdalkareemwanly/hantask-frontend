import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import ChatBody from "./components/ChatBody";
import ChatFooter from "./components/ChatFooter";
import ChatHeader from "./components/ChatHeader";
import UserChatBox from "./components/UserChatBox";
import { useQueryHook } from "../../../hooks/useQueryHook";
import Loader from "../../../Components/Loader";
import { useStateContext } from "../../../contexts/ContextsProvider";
import { TbLayoutBottombarCollapseFilled } from "react-icons/tb";
import { TbLayoutNavbarCollapseFilled } from "react-icons/tb";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";

const getContactsFunc = async () => {
  const res = await axiosClient.get(`seller/getContact`);
  return res.data.data;
};

const getContactMessages = async (user) => {
  const res = await axiosClient.get(`/seller/getMessage/${user?.user_id}`);
  return res.data.data;
};

const ServiceProviderChat = ({ selectedUserFromOther }) => {
  const { pusherChanel } = useStateContext();
  const user = JSON.parse(localStorage.getItem("USER"));

  const [selectedUser, setSelectedUser] = useState(null);

  const {
    data: messages,
    isLoading: isLoadingMessages,
    refetch,
  } = useQueryHook(["usersChat", selectedUser], () =>
    getContactMessages(selectedUser)
  );

  const { data: contacts, isLoading: isLoadingContacts } = useQueryHook(
    ["userContacts"],
    () => getContactsFunc()
  );
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [collapseUsers, setCollapseUsers] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenWidth(width);

      // Update collapseUsers state based on screen width
      if (width > 768) {
        setCollapseUsers(false); // If screen width is greater than 768px, expand users
      } else {
        setCollapseUsers(true); // If screen width is 768px or less, collapse users
      }
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  console.log(collapseUsers);

  return isLoadingContacts ? (
    <Loader />
  ) : (
    <div className="flex gap-6 items-start justify-start h-[80vh] my-8 overflow-hidden w-full">
      <div
        className={`${
          collapseUsers ? "h-[64px] " : "h-[500px]"
        } fixed bottom-0 right-10 component-shadow transition-all  lg:right-0 lg:relative lg:w-[30%] lg:h-[100%]  bg-blocks-color rounded-xl component-shadow p-3 flex flex-col gap-10 overflow-hidden`}
      >
        <div
          className="flex justify-between items-center lg:hidden cursor-pointer"
          onClick={() => setCollapseUsers((prev) => !prev)}
        >
          <span>{collapseUsers ? "show users" : "hide users"}</span>
          <span>
            {collapseUsers ? (
              <TbLayoutNavbarCollapseFilled size={35} />
            ) : (
              <TbLayoutBottombarCollapseFilled size={35} />
            )}
          </span>
        </div>

        <div className="flex flex-col gap-4 h-[100%] overflow-y-auto overflow-hidden">
          <UserChatBox
            userContacts={contacts}
            selectedUser={selectedUser}
            setSelectedUsers={setSelectedUser}
          />
        </div>
      </div>
      {selectedUser ? (
        <div className="lg:w-[70%] w-full  h-[100%] bg-blocks-color rounded-xl component-shadow ">
          <div className="h-[10%] rounded-t-xl border-b border-mainBorder flex items-center px-8">
            <ChatHeader selectedUser={selectedUser} />
          </div>
          <div className="h-[75%] overflow-y-auto">
            <ChatBody messages={messages} />
          </div>
          <div className="h-[15%]  rounded-b-xl border-t border-mainBorder flex items-center gap-8 justify-center">
            <ChatFooter refetch={refetch} selectedUser={selectedUser} />
          </div>
        </div>
      ) : (
        <div className="lg:w-[70%] w-full text-primary-text flex flex-col gap-8 justify-center items-center h-[100%] bg-blocks-color rounded-xl component-shadow ">
          <IoChatbubbleEllipsesSharp size={60} />
          <span className="text-xl font-semibold">
            please choose a chat first
          </span>
        </div>
      )}
    </div>
  );
};

export default ServiceProviderChat;
