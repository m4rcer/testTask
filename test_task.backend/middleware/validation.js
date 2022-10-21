import Joi from "joi";

const chema = Joi.object({
  id: Joi.number(),
  username: Joi.string().alphanum().min(1).max(30).required(),
  password: Joi.string().min(8).required(),
  email: Joi.string().email(),
});

export default async function validateUser(req, res, next) {
  let user = req.body;
  if (!user) return res.status(401).send("No user");

  try {
    let verifiedUser = await chema.validateAsync(user);
    if (!verifiedUser) return res.status(401).send("Invalid user");

    req.user = verifiedUser;
    next();
  } catch (error) {
    res.status(400).send("Invalid user");
  }
}
