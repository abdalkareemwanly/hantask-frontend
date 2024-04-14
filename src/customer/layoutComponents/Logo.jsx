export default function Logo() {
  const mode = localStorage.getItem("theme");

  return (
    <div>
      {mode === "light" ? (
        <img src="/src/images/logo-light.png" className="img-fluid" />
      ) : (
        <img src="/src/images/logo-dark.png" className="img-fluid" />
      )}
    </div>
  );
}
