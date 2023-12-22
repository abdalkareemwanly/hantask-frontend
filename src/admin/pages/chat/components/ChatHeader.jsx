const ChatHeader = () => {
  return (
    <>
      <div className="flex gap-4 items-center">
        <img
          className="w-[60px] h-[60px] rounded-[50%] block object-cover object-center"
          src="/public/2.jpg"
        />
        <div className=" flex-1 h-full rounded-md flex gap-2 items-center justify-between">
          <div>
            <h3 className="font-medium text-lg"> kareem wanly</h3>
            <span className="text-secondary-text text-sm">buyer account</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatHeader;
