import "./style/TitleLine.css";
function TitleLine(props) {
  try {
    return (
      <>
        <div className="title-line"></div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default TitleLine;
