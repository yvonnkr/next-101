import { NextApiRequest, NextApiResponse } from "next";
import sqlite from "sqlite";
import cookie from "cookie";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const db = await sqlite.open("./mydb.sqlite");

  if (req.method === "POST") {
    const person = await db.get("select * from person where email = ?", [
      req.body.email,
    ]);

    compare(req.body.password, person.password, function (err, result) {
      if (!err && result) {
        const payload = { sub: person.id, myPersonEmail: person.email };
        const token = sign(payload, process.env.jwt_secret!, {
          expiresIn: "1h",
        });

        //setcookie
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("auth", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 3600,
            path: "/",
          })
        );

        res.json({ message: "Login success" });
      } else {
        res.json({ message: "Invalid credentials" });
      }
    });
  } else {
    res.status(405).json({ message: "We only support POST" });
  }
}
