import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const salt = bcrypt.genSaltSync(10);

//FIND NAME
export const findName = async (req, res) => {
  try {
    const userName = await userModel.findOne({ name: req.params.n });
    if (!userName) {
      res.status(200).json({ name: userName });
    } else {
      res.status(302).json({ message: "user name already exists" });
    }
  } catch (err) {
    res.status(500).json({ messege: err.message });
  }
};

//SIGN UP
export const signUp = async (req, res) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, salt);
    const userData = new userModel(req.body);
    const userDoc = await userData.save();
    res.status(201).json({ message: "User created successfully!" });
  } catch (err) {
    res.status(500).json({ messege: err.message });
  }
};

//SIGN UP WITH GOOGLE
export const signUpWithGoogle = async (req, res) => {
  try {
    userModel
      .findOne({ email: req.body.email })
      .then((user) => {
        if (user) {
          jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "10h" },
            (err, token) => {
              res.cookie("access_token", token).json({ message: "success!" });
            }
          );
        } else {
          new userModel(req.body)
            .save()
            .then(() => {
              userModel
                .findOne({ email: req.body.email })
                .then(() => {
                  jwt.sign(
                    { id: user._id },
                    process.env.JWT_SECRET,
                    { expiresIn: "10h" },
                    (err, token) => {
                      res
                        .cookie("access_token", token)
                        .json({ message: "success!" });
                    }
                  );
                })
                .catch(() => {
                  res.status(500).json({ message: "failed to find user" });
                });
            })
            .catch((err) => {
              res.status(500).json({ message: "failed to create user" });
            });
        }
      })
      .catch(() => {
        res.status(500).json({ message: "failed to save" });
      });
  } catch (err) {
    res.status(500).json({ message: "google auth failed" });
  }
};

//SIGN IN
export const signIn = async (req, res) => {
  try {
    const userData = await userModel.findOne({
      $or: [{ email: req.body.finder }, { name: req.body.finder }],
    });
    if (!userData) return res.status(404).json({ message: "user not found" });
    else {
      if (bcrypt.compareSync(req.body.password, userData.password)) {
        jwt.sign(
          { id: userData._id },
          process.env.JWT_SECRET,
          { expiresIn: "10h" },
          (err, token) => {
            if (err) return res.status(500).json({ message: "error signing" });
            else
              res.cookie("access_token", token).json({ messege: "signed in" });
          }
        );
      } else {
        res.status(405).json({ message: "unmatched credentials" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

//SIGN OUT
export const signOut = (req, res) => {
  res.cookie("access_token", "").json({ messege: "signed out" });
};
