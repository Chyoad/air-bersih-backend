import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  const token = req.get('Authorization');
  if (!token) {
    res.status(401).json({
      errors: "Unauthorized"
    }).end();
  }

  jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(401).json({ errors: err });
    }

    req.user = user;
    next();
  });

}