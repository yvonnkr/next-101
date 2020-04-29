import { NextApiRequest, NextApiResponse } from "next";
const sqlite = require("sqlite");

export default async function getAllVehiclesByPersonId(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const db = await sqlite.open("./mydb.sqlite");
    const allUserVehicles = await db.all(
      "SELECT * FROM vehicle WHERE ownerId = ?",
      [req.query.id]
    );

    if (allUserVehicles.length === 0) {
      return res
        .status(404)
        .json({ message: "no vehicles found for this user" });
    }

    res.json(allUserVehicles);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}
