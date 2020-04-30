//middleware --micro --eg
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { verify } from "jsonwebtoken";

export const isAuth = (fn: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  verify(
    req.headers.authorization!,
    process.env.jwt_secret!,
    async (err, decoded) => {
      if (!err && decoded) {
        return await fn(req, res);
      }

      return res
        .status(401)
        .json({ message: "Sorry you are not authenticated." });
    }
  );
};

// if (!req.headers.authorization) {
//   return res
//     .status(401)
//     .json({ message: "No authorization header, authentication failed" });
// }
// const token = req.headers.authorization.split(" ")[1];
// if (!token) {
//   return res
//     .status(401)
//     .json({ message: "Invalid token, authentication failed" });
// }

// const decodedToken = verify(token, secret);
// console.log("TOKEN = ", decodedToken);

// return fn(req, res);
