import { logoDark, logoLight } from "../../images";

export default function Logo() {
  const mode = localStorage.getItem("theme");

  return (
    <div>
      {mode === "light" ? (
        <img src={logoLight} className="img-fluid" />
      ) : (
        <img src={logoDark} className="img-fluid" />
      )}
    </div>
  );
}
