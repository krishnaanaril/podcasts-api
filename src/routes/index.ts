import express from "express";
import CategoriesController from "../controllers/categories";
import PingController from "../controllers/ping";

const router = express.Router();

router.get("/ping", async (_req, res) => {
  const controller = new PingController();
  const response = await controller.getMessage();
  return res.send(response);
});

router.get("/categories", async (_req, res) => {
  const controller = new CategoriesController();
  const response = await controller.getCategories();
  return res.send(response);
});

export default router;