import knex from "knex";
import knexfile from "../db/knexfile.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import config from "../config.js";

dotenv.config();

const Knex = knex(knexfile[process.env.NODE_ENV]);

export default class UserController {
  static async register(req, res) {
    Knex("users")
      .insert({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
      })
      .then((id) => {
        Knex("users")
          .where({ username: req.body.username })
          .first()
          .then((user) => {
            let payload = { id: user.id };
            const token = jwt.sign(payload, config.TOKEN_SECRET);
            res.status(200).send({ token });
          });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({
          success: false,
          message: "An error occurred, please try again later.",
        });
      });
  }

  static async login(req, res) {
    Knex("users")
      .where({
        username: req.body.username,
        password: req.body.password,
      })
      .first()
      .then((user) => {
        if (!user)
          return res.status(400).json({ success: false, message: "Not found" });
        let payload = { id: user.id };
        const token = jwt.sign(payload, config.TOKEN_SECRET);
        res.status(200).send({ token });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({
          success: false,
          message: "An error occurred, please try again later.",
        });
      });
  }

  static async getUserInfo(req, res) {
    Knex("users")
      .where({
        id: req.user.id,
      })
      .first()
      .then((user) => {
        if (!user)
          return res.status(400).json({ success: false, message: "Not found" });
        res.status(200).send(user);
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({
          success: false,
          message: "An error occurred, please try again later.",
        });
      });
  }

  static async updateUserInfo(req, res) {
    Knex("users")
      .where({
        id: req.user.id,
      })
      .first()
      .update(req.user)
      .then(() => {
        Knex("users")
          .where({ id: req.user.id })
          .first()
          .then((user) => {
            if (!user)
              return res
                .status(400)
                .json({ success: false, message: "Not found" });
            res.status(200).send(user);
          });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({
          success: false,
          message: "An error occurred, please try again later.",
        });
      });
  }
}
