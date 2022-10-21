import { Router } from "express";
import UserController from "../controllers/UserController.js";
import verifyUserToken from "../middleware/auth.js";
import validateUser from "../middleware/validation.js";

const router = new Router();

router.post("/register", validateUser, UserController.register);
router.post("/login", validateUser, UserController.login);
router.get("/dashboard", verifyUserToken, UserController.getUserInfo);
router.put(
  "/dashboard",
  verifyUserToken,
  validateUser,
  UserController.updateUserInfo
);

export default router;
