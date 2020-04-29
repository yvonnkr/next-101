import { NextApiRequest, NextApiResponse } from "next";
const sqlite = require("sqlite");

export default async function getPersonById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const db = await sqlite.open("./mydb.sqlite");

    //put request
    if (req.method === "PUT") {
      const statement = await db.prepare(
        "UPDATE person SET name= ?, email = ? where id = ?"
      );
      const result = await statement.run(
        req.body.name,
        req.body.email,
        req.query.id
      );
      result.finalize();
      // test put req in console with code below
    }

    //get request
    const person = await db.get("SELECT * FROM person WHERE id = ?", [
      req.query.id,
    ]);

    res.json(person);
  } catch (error) {
    res.status(404).json({ message: "Person not found" });
  }
}

/**
 * test put req in console with this code
 * const response = await fetch("http://localhost:3000/api/person/2", {
    method: 'PUT',
   
    headers: {
      'Content-Type': 'application/json'
     
    },
    
    body: JSON.stringify({name:'Ashley',email:'ash@test.com'})
  });
 */
