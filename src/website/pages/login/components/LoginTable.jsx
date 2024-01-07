import "../style/LoginTable.css";

function LoginTable({ users, setValue }) {
  try {
    return (
      <>
        <table className="table-border table">
          <tbody>
            <tr>
              <th>Username</th>
              <th>Password</th>
              <th>Action</th>
            </tr>
          </tbody>
          <tbody>
            {users.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.username}</td>
                  <td>{item.password}</td>
                  <td>
                    <button
                      type="button"
                      className="autoLogin"
                      onClick={() => {
                        setValue("username", item.username);
                        setValue("password", item.password);
                      }}
                    >
                      {item.type}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default LoginTable;
