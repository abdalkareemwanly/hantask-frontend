const UserChatBox = ({ setSelectedUsers, selectedUser, userContacts }) => {
  return userContacts.map((ele, index) => {
    const isSelected = selectedUser?.user_id === ele?.user_id;

    return (
      <div
        key={ele.id}
        onClick={() => setSelectedUsers(ele)}
        className={`flex gap-4 items-center min-h-[60px] max-h-[120px] overflow-hidden rounded-md cursor-pointer hover:bg-background-color transition-all ${
          isSelected ? "bg-background-color" : "bg-transparent"
        }`}
      >
        <img
          className="w-[50px] h-[50px] rounded-[50%] block object-cover object-center"
          src={import.meta.env.VITE_WEBSITE_URL + ele.user_image}
        />
        <div className="flex-1 h-full rounded-md flex gap-3 items-center justify-between">
          <div>
            <h3 className="font-medium text-lg">{ele.user_name}</h3>
          </div>
        </div>
      </div>
    );
  });
};

export default UserChatBox;
