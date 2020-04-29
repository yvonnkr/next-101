import { NextApiRequest, NextApiResponse } from "next";
const sqlite = require("sqlite");

export default async function getAllVehicles(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const db = await sqlite.open("./mydb.sqlite");
    const vehicles = await db.all("SELECT * FROM vehicle");
    res.json(vehicles);
  } catch (error) {
    res.status(400).json({ message: "Error" });
  }
}
