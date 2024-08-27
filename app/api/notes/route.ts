import { NextRequest, NextResponse } from "next/server";
import connectDb from "../../middleware/db";
import User from "@/app/models/User";
import Note from "@/app/models/Note";
import { cookies } from "next/headers";

var jwt = require("jsonwebtoken");

export async function GET(request: NextRequest) {
  await connectDb();
  const cookieStore = cookies();

  const token = cookieStore.get("authToken")?.value; // Correct way to access the authToken

  var decoded = jwt.verify(token, "secret");
  //   const body = await request.json();
  const notes = await Note.find({ postedBy: decoded.data }).sort({
    postedOn: -1,
  });
  // const notes = await Note.find({ postedBy: "V" });
  return NextResponse.json(notes);
}
export async function POST(request: NextRequest) {
  await connectDb();
  const cookieStore = cookies();
  console.log(cookieStore.getAll());
  const token = cookieStore.get("authToken")?.value; // Correct way to access the authToken
  // console.log(token);
  var decoded = jwt.verify(token, "secret");
  const body = await request.json();
  const newNote = await Note.create({
    title: body.title,
    content: body.content,
    postedBy: decoded.data,
  });
  newNote.save();

  return NextResponse.json({ message: "Note Saved succesfully" });
}
export async function PUT(request: NextRequest) {
  await connectDb();
  const body = await request.json();

  const updatedNote = await Note.findOneAndUpdate(
    {
      _id: body.id,
    },
    {
      title: body.title,
      content: body.content,
    }
  );
  console.log(updatedNote);
  updatedNote.save();

  return NextResponse.json({ message: "Note updated succesfully" });
}
export async function DELETE(request: NextRequest) {
  await connectDb();
  const body = await request.json();
  await Note.findOneAndDelete({
    _id: body.id,
  });
  return NextResponse.json({
    success: true,
    message: "Note Deleted succesfully",
    id: body.id,
  });
}
