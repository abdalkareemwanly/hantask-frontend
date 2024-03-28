const ChatHeader = ({ selectedUser }) => {
  return (
    <>
      <div className="flex gap-4 items-center">
        <img
          className="w-[40px] h-[40px] rounded-[50%] block object-cover object-center"
          src={import.meta.env.VITE_WEBSITE_URL + selectedUser.user_image}
        />
        <div className=" flex-1 h-full rounded-md flex gap-2 items-center justify-between">
          <div>
            <h3 className="font-medium text-lg"> {selectedUser?.user_name}</h3>
            <span className="text-secondary-text text-sm">
              {selectedUser?.user_type === "buyer"
                ? "homeOwner account"
                : "handyman acoount"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatHeader;
