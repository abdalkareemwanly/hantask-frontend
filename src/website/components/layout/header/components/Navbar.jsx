import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center gap-12">
      <Link to={""}>home</Link>
      <Link to={"/subscription"}>subscription</Link>
      <Link to={"/policy"}>policy</Link>
      <Link to={"/condition"}>condition</Link>
      <Link to={"/contact"}>contact</Link>
      <Link>home</Link>
      <Link>home</Link>
    </nav>
  );
};

export default Navbar;
