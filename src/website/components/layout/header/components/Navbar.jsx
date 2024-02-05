import { Link } from "react-router-dom";

const Navbar = () => {
  const isLogin = !!localStorage.getItem("ACCESS_TOKEN");
  const isUserServiceProvider =
    JSON.parse(localStorage.getItem("USER"))?.user_type == "seller";

  console.log(isLogin, isUserServiceProvider);
  return (
    <nav className="flex items-center gap-12">
      <Link to={""}>home</Link>
      <Link to={"/about"}>about</Link>
      {isLogin && isUserServiceProvider && (
        <Link to={"/subscription"}>subscription</Link>
      )}
      <Link to={"/policy"}>policy</Link>
      <Link to={"/condition"}>condition</Link>
      <Link to={"/contact"}>contact</Link>
    </nav>
  );
};

export default Navbar;
