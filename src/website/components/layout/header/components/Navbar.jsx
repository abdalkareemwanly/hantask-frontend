import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center gap-12">
      <Link to={""}>home</Link>
      <Link to={"/subscription"}>subscription</Link>
      <Link>home</Link>
      <Link>home</Link>
    </nav>
  );
};

export default Navbar;
