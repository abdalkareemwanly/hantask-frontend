import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { useTWThemeContext } from "../../../../admin/Components/ThemeProvider";
import { useEffect, useState } from "react";

const Layout = () => {
  const { setTheme } = useTWThemeContext();
  const [mode, setMode] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    const htmlElement = document.querySelector("html");
    localStorage.setItem("theme", mode);
    setTheme(mode);
    if (htmlElement) {
      htmlElement.setAttribute("data-theme", mode);
      sessionStorage.setItem("mode", mode);
    }
  }, [mode]);
  const handleMode = () => {
    setMode("light");
  };

  useEffect(() => {
    handleMode();
  }, []);
  return (
    <div className="flex flex-col">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
