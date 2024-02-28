const UserChatBox = ({ setSelectedUsers }) => {
  return (
    <div
      onClick={() => setSelectedUsers(true)}
      className="flex gap-4 items-center min-h-[60px] max-h-[120px] overflow-hidden  rounded-md cursor-pointer hover:bg-background-color  transition-all"
    >
      <img
        className="w-[50px] h-[50px] rounded-[50%] block object-cover object-center"
        src="/public/1.jpg"
      />
      <div className=" flex-1 h-full rounded-md flex gap-3 items-center justify-between">
        <div>
          <h3 className="font-medium text-lg"> kareem wanly</h3>
        </div>
      </div>
    </div>
  );
};

export default UserChatBox;
