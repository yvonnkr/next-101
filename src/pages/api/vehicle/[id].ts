import { NextApiRequest, NextApiResponse } from "next";
const sqlite = require("sqlite");

export default async function getVehicleById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const db = await sqlite.open("./mydb.sqlite");
    const vehicle = await db.get("SELECT * FROM vehicle WHERE id = ?", [
      req.query.id,
    ]);
    res.json(vehicle);
  } catch (error) {
    res.status(400).json({ message: "Vehicle not found" });
  }
}
