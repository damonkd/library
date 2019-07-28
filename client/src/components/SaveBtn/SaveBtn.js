import React from "react";
import "./SaveBtn.css";
import DeleteBtn from "../DeleteBtn";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function SaveBtn(props) {
  return (
    <span className="save-btn" {...props} role="button" tabIndex="0" class="btn btn-primary"  data-text-swap="saved">
      
      {props.value? ( <DeleteBtn/> ): ("Save")}
    </span>
  );
}

export default SaveBtn;

