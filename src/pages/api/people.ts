import { NextApiRequest, NextApiResponse } from "next";
const sqlite = require("sqlite");

export default async function getPeople(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const db = await sqlite.open("./mydb.sqlite");
    const people = await db.all("SELECT * FROM person");

    res.json(people);
  } catch (error) {
    res.status(400).json({ message: "Error" });
  }
}
