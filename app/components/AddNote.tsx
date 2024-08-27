import React, { useState } from "react";

const AddNote = () => {
  const [data, setData] = useState({ title: "", content: "" });
  const onChange = async (e: any) => {
    e.preventDefault();
    if (e.target.name === "title") {
      setData({ ...data, title: e.target.value });
    }
    if (e.target.name === "content") {
      setData({ ...data, content: e.target.value });
    }
  };

 
  return (
  
  );
};

export default AddNote;
