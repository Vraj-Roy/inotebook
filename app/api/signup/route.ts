import { NextRequest, NextResponse } from "next/server";
import connectDb from "../../middleware/db";
import User from "../../models/User";
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

export async function POST(request: NextRequest) {
  await connectDb();
  const body = await request.json();
  const user = await User.findOne({
    email: body.email,
  });
  if (user) {
    return NextResponse.json({ error: "user already exist" });
  }

  //create new user
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(body.password, salt);

  const newUser = await User.create({
    name: body.name,
    email: body.email,
    password: hash,
  });
  newUser.save();
  const jwtToken = await jwt.sign(
    {
      data: body.name,
    },
    "secret",
    { expiresIn: 60 * 60 * 60 }
  );
  // const cookie = `authToken=${jwtToken}; Path=/; HttpOnly; Secure; SameSite=Strict`;
  const cookie = `authToken=${jwtToken}; Path=/; `;

  return NextResponse.json(
    { success: true },
    {
      headers: {
        "Set-Cookie": cookie,
      },
    }
  );
}

export async function GET(request: NextRequest) {
  const U = await User.find({});
  return NextResponse.json({ U });
}
