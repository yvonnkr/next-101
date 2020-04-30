//middleware --micro --eg
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export const isGet = (fn: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== "GET") {
    return res.status(400).json({ message: "Sorry this is a GET route only." });
  }

  return fn(req, res);
};
