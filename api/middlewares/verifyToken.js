import jwt from "jsonwebtoken";
const verifyToken = (req, res, next) => {
  try {
    const { access_token } = req.cookies;
    const info = jwt.verify(access_token, process.env.JWT_SECRET, {});
    if (info) {
      req.info = info;
      next();
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default verifyToken;
