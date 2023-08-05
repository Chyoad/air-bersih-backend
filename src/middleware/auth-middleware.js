import jwt from "jsonwebtoken";
import { prismaClient } from "../app/database.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.get('Authorization');
  if (!token) {
    res.status(401).json({
      errors: "Unauthorized"
    }).end();
  }

  const user = await prismaClient.user.findFirst({
    where: {
      token: token
    }
  });
  if (!user) {
    res.status(401).json({
      errors: "Unauthorized"
    }).end();
  }

  jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ errors: err });
    }

    req.user = user;
    next();
  });

}