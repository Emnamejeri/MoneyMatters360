import express from "express";
import userController from "../controllers/userController";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.get(
  "/user/:id",
  authMiddleware.verifyToken,
  userController.getUserBalanceById
);

router.put(
  "/user/:id",
  authMiddleware.verifyToken,
  userController.topUpBalance
);
export default router;
