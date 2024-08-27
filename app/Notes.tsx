"use client";
import Image from "next/image";
import Card from "./components/Card";
import { Suspense, useEffect, useState } from "react";
import Loading from "./Loading";
import AddNote from "./components/AddNote";

export default function Notes() {
  const [notes, setnotes] = useState([]);
  const [modal, setModal] = useState<HTMLDialogElement | null>(null);

  const [data, setData] = useState({ title: "", content: "" });
  const getNotes = async () => {
    const response = await fetch("/api/notes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    });

    const notes = await response.json();
    setnotes(notes);
    console.log(notes);
  };
  useEffect(() => {
    setModal(document.getElementById("my_modal_1") as HTMLDialogElement | null);

    getNotes();
  }, []);
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
    if (data.title == "" || data.content === "") {
      return;
    }
    const res = await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let response = await res.json();
    console.log(response);
    setData({ title: "", content: "" });
    getNotes();
  };
  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <div className="block w-full">
        <button className="btn m-auto block" onClick={() => modal.showModal()}>
          Add Note
        </button>
      </div>
      <dialog id="my_modal_1" className="modal flex justify-center mt-[20vh] ">
        <div className="   flex-flexcol bg-orange-300   self-start   text-primary-content w-96 rounded-md p-6 border-2 modal-box  ">
          <div className="">
            <h2 className="card-title text-black border-2   rounded  my-2">
              <input
                placeholder="Title"
                className="w-full"
                type="text"
                name="title"
                value={data.title}
                onChange={onChange}
              />
            </h2>
            <p className="card-title text-black border-2   rounded  my-2">
              <textarea
                placeholder="Content"
                className=" w-full  text-black font-semibold  border-2 min-h-28 "
                name="content"
                value={data.content}
                onChange={onChange}
              />
            </p>
            <div className="card-actions justify-start modal-action">
              <form method="dialog">
                <button
                  onClick={(e) => {
                    onSubmit(e);
                    modal.close();
                  }}
                  className="btn bg-orange-500 text-white"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </dialog>

      <main className=" flex gap-8  flex-wrap  m-auto w-[80vw]">
        {notes.map((n, index) => (
          <Card
            key={n._id}
            title={n.title}
            content={n.content}
            id={n._id}
            className={`item ${index === n.length - 1 ? "mr-auto" : ""}`}
          />
        ))}
      </main>
    </>
  );
}
