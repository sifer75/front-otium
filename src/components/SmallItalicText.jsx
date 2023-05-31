import React from "react";
import "../pages/Homepage.css";

function SmallItalicText({ title, paragraph }) {
  return (
    <>
      <div className="textContainer">
        <h3 style={{ textAlign: "left" }}>{title}</h3>
        <p style={{ textAlign: "left" }}>{paragraph}</p>
      </div>
    </>
  );
}

export default SmallItalicText;