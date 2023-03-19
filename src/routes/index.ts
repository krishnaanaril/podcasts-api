import express from "express";
import { ByteLengthQueuingStrategy } from "stream/web";
import CategoriesController from "../controllers/categories";
import PingController from "../controllers/ping";
import { DataService } from "../types/data-service";
import { PodcastIndexDataService } from "../utils/podcast-index-data-service";

const router = express.Router();
const dataService: DataService = new PodcastIndexDataService();
const controller = new CategoriesController(dataService);

router.get("/ping", async (_req, res) => {
  const controller = new PingController();
  const response = await controller.getMessage();
  return res.send(response);
});

router.get("/categories", async (_req, res) => {  
  try {
    const response = await controller.getCategories();
    return res.send(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error in invocation of API: /categories" });
  }
});

router.get("/stats", async (_req, res) => {  
  const response = await controller.getStats();
  return res.send(response);
});

router.get("/trending", async (_req, res) => {  
  const max: number = _req.query.max as unknown as number;
  const lang: string = _req.query.lang as unknown as string;
  const since: number = _req.query.since as unknown as number;
  const cat: string = _req.query.cat as unknown as string;
  const response = await controller.getTrending(max, lang, since, cat);
  return res.send(response);
});

router.get("/soundbites", async (_req, res) => {  
  const max: number = _req.query.max as unknown as number;
  const response = await controller.getSoundbites(max);
  return res.send(response);
});

router.get("/search", async (_req, res) => {  
  const q: string = _req.query.q as unknown as string;
  const max: number = _req.query.max as unknown as number;
  const clean: boolean = _req.query.clean === 'true';
  const fulltext: boolean = _req.query.fulltext  === 'true';
  const response = await controller.searchByTerm(q, clean, max, fulltext);
  return res.send(response);
});

router.get("/podcastsFeed", async (_req, res) => { 
  res.send('todo');
});

router.get("/episodesFeed", async (_req, res) => { 
  res.send('todo');
});

router.get("/recentEpisodes", async (_req, res) => { 
  const max: number = _req.query.max as unknown as number;  
  const before: number = _req.query.before as unknown as number;  
  const response = await controller.getRecentEpisodes(max, before);
  return res.send(response);
});

export default router;