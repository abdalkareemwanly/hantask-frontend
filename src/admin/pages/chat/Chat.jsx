import ChatBody from "./components/ChatBody";
import ChatFooter from "./components/ChatFooter";
import ChatHeader from "./components/ChatHeader";
import PersonalBox from "./components/PersonalBox";
import UserChatBox from "./components/UserChatBox";

const Chat = () => {
  return (
    <div className="flex gap-6 items-start justify-start h-[750px] my-8 overflow-hidden w-full">
      <div className="fixed right-10 lg:right-0 lg:relative lg:w-[25%] h-[100%] bg-blocks-color rounded-xl component-shadow p-3 flex flex-col gap-10 overflow-hidden">
        <div>
          <PersonalBox />
        </div>
        <div className="flex flex-col gap-4 h-[100%] overflow-y-auto overflow-hidden">
          <UserChatBox />
          <UserChatBox />
          <UserChatBox />
          <UserChatBox />
          <UserChatBox />
          <UserChatBox />
          <UserChatBox />
          <UserChatBox />
        </div>
      </div>
      <div className="lg:w-[75%] w-full  h-[100%] bg-blocks-color rounded-xl component-shadow ">
        <div className="h-[10%] rounded-t-xl border-b border-mainBorder flex items-center px-8">
          <ChatHeader />
        </div>
        <div className="h-[80%]">
          <ChatBody />
        </div>
        <div className="h-[10%]  rounded-b-xl border-t border-mainBorder flex items-center gap-8 justify-center">
          <ChatFooter />
        </div>
      </div>
    </div>
  );
};

export default Chat;
