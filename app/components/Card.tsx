import React, { useState } from "react";

const Card = ({ id, title, content }) => {
  const [data, setData] = useState({ id, title, content });
  const [mode, setMode] = useState("Edit");
  const [hidden, setHidden] = useState(false);
  const onChange = async (e: any) => {
    e.preventDefault();
    if (e.target.name === "title") {
      setData({ ...data, title: e.target.value });
    }
    if (e.target.name === "content") {
      setData({ ...data, content: e.target.value });
    }
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch("/api/notes", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let response = await res.json();
    console.log(response);
  };
  const onDelete = async (e: any) => {
    e.preventDefault();
    const res = await fetch("/api/notes", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: data.id }),
    });
    let response = await res.json();
    if (response.success == true) {
      setHidden(true);
    }
  };

  return (
    <div
      className={
        "flex flex-col     text-primary-content w-96 rounded-md p-6 border-2  " +
        (hidden ? "hidden" : "")
      }
    >
      <div className=" ">
        {mode === "Edit" && (
          <h2 className="card-title text-black  border-2 border-white my-2">
            {data.title}
          </h2>
        )}
        {mode === "Add" && (
          <h2 className="card-title text-black border-2   rounded  my-2">
            {
              <input
                placeholder="Title"
                className="w-full"
                type="text"
                name="title"
                value={data.title}
                onChange={onChange}
              />
            }
          </h2>
        )}
        {mode === "Edit" && (
          <p className="text-black  w-full  border-2  border-white  min-h-28">
            {data.content}
          </p>
        )}
        {mode === "Add" && (
          <textarea
            placeholder="Content"
            className=" w-full  text-black   border-2 min-h-28 "
            name="content"
            value={data.content}
            onChange={onChange}
          />
        )}
        <div className="card-actions justify-start items-end mb-0 mt-4">
          {mode === "Edit" && (
            <button
              className="btn bg-orange-500 text-white "
              onClick={() => setMode("Add")}
            >
              Edit
            </button>
          )}
          {mode === "Add" && (
            <button
              className="btn bg-orange-500 text-white "
              onClick={(e) => {
                setMode("Edit");
                onSubmit(e);
              }}
            >
              Add
            </button>
          )}
          <button
            className="btn bg-orange-500 text-white "
            onClick={(e) => {
              onDelete(e);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
