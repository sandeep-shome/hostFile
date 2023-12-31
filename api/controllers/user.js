import userModel from "../models/userModel.js";

export const getData = async (req, res) => {
  try {
    const user = await userModel.findById(req.info.id);
    if (user) {
      const { password, ...userData } = user._doc;
      res.json(userData);
    } else {
      res.status(404).json({ message: "failed to find user" });
    }
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
};
