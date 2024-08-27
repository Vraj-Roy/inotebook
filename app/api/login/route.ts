import { NextRequest, NextResponse } from "next/server";
import connectDb from "../../middleware/db";
import User from "@/app/models/User";

var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

export async function GET(request: NextRequest) {
  const users = await User.find({});
  return NextResponse.json(users);
}
export async function POST(request: NextRequest) {
  //authenticate the user
  await connectDb();
  const body = await request.json();
  const user = await User.findOne({
    email: body.email,
  });
  if (!user) {
    return NextResponse.json({ error: "user does not exist" });
  }
  const passwrodCheck = await bcrypt.compare(body.password, user.password);
  if (!passwrodCheck) {
    return NextResponse.json({ error: "Wrong Creds" });
  }
  const jwtToken = await jwt.sign(
    {
      data: user.name,
    },
    "secret",
    { expiresIn: 60 * 60 * 60 }
  );
  const cookie = `authToken=${jwtToken}; Path=/; HttpOnly; Secure; SameSite=Strict`;
  return NextResponse.json(
    { success: true },
    {
      headers: {
        "Set-Cookie": cookie,
      },
    }
  );
}
