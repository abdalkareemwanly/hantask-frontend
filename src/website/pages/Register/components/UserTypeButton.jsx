function UserTypeButton({ name, userType, setUserType, icon }) {
  try {
    return (
      <>
        <li className={userType == name ? "active" : ""} onClick={() => setUserType(name)}>
          <div className="single-tabs-registration">
            <div className="icon">{icon}</div>
            <h4 className="title">{name}</h4>
          </div>
        </li>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default UserTypeButton;
