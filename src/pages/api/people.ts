import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import sqlite from "sqlite";
import { isAuth } from "../../middleware/auth";
// import { isGet } from "./../../middleware/isGet";

export default isAuth(async function getPeople(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const db = await sqlite.open("./mydb.sqlite");
    const people = await db.all("SELECT id, email, name FROM person");

    res.json(people);
  } catch (error) {
    res.status(400).json({ message: "Error" });
  }
});
