const UserChatBox = () => {
  return (
    <div className="flex gap-4 items-center h-[60px]  rounded-md cursor-pointer hover:bg-background-color  transition-all">
      <img
        className="w-[50px] h-[50px] rounded-[50%] block object-cover object-center"
        src="/public/1.jpg"
      />
      <div className=" flex-1 h-full rounded-md flex gap-3 items-start justify-between">
        <div>
          <h3 className="font-medium text-lg"> kareem wanly</h3>
          <span className="text-secondary-text text-sm">
            message message message ...
          </span>
        </div>
        <span className="text-sm">09:50AM</span>
      </div>
    </div>
  );
};

export default UserChatBox;
