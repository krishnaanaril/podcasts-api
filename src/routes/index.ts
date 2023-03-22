import express from "express";
import { ByteLengthQueuingStrategy } from "stream/web";
import CategoriesController from "../controllers/categories";
import PingController from "../controllers/ping";
import { DataService } from "../types/data-service";
import { Medium, Value } from "../types/shared";
import { PodcastIndexDataService } from "../utils/podcast-index-data-service";

const router = express.Router();
const dataService: DataService = new PodcastIndexDataService();
const controller = new CategoriesController(dataService);

/**
 * Endpoint to verify the health of the service
 */
router.get("/ping", async (_req, res) => {
  try {
    const controller = new PingController();
    const response = await controller.getMessage();
    return res.send(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error in invocation of API: /ping" });
  }
});

/**
 * Get list of all podcast categories
 */
router.get("/categories/list", async (_req, res) => {
  try {
    const response = await controller.getCategories();
    return res.send(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error in invocation of API: /categories/list" });
  }
});

/**
 * Get stats of podcasts
 */
router.get("/stats/current", async (_req, res) => {
  try {
    const response = await controller.getStats();
    return res.send(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error in invocation of API: /stats/current" });
  }
});

/**
 * Get trending podcasts
 */
router.get("/podcasts/trending", async (_req, res) => {
  try {
    const max: number = _req.query.max as unknown as number;
    const lang: string = _req.query.lang as unknown as string;
    const since: number = _req.query.since as unknown as number;
    const cat: string = _req.query.cat as unknown as string;
    const notcat: string = _req.query.cat as unknown as string;
    const response = await controller.getTrending(max, lang, since, cat, notcat);
    return res.send(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error in invocation of API: /podcasts/trending" });
  }
});

/**
 * Gets the most recent soundbites
 */
router.get("/recent/soundbites", async (_req, res) => {
  try {
    const max: number = _req.query.max as unknown as number;
    const response = await controller.getSoundbites(max);
    return res.send(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error in invocation of API: /recent/soundbites" });
  }

});

/**
 * Gets list of podcasts that matched the term
 */
router.get("/search/byterm", async (_req, res) => {
  try {
    const q: string = _req.query.q as unknown as string;
    const val: Value = _req.query.val as unknown as Value;
    const aponly: boolean = _req.query.aponly as unknown as boolean;
    const max: number = _req.query.max as unknown as number;
    const clean: boolean = _req.query.clean === 'true';
    const fulltext: boolean = _req.query.fulltext === 'true';
    const response = await controller.searchByTerm(q, clean, max, fulltext, val, aponly);
    return res.send(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error in invocation of API: /search/byterm" });
  }

});

router.get("/podcasts/byfeedid", async (_req, res) => {
  try {
    const id: number = _req.query.id as unknown as number;
    const response = await controller.getPodcastsById(id);
    return res.send(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error in invocation of API: /podcasts/byfeedid" });
  }

});

router.get("/episodes/byfeedid", async (_req, res) => {
  try {
    const id: string = _req.query.id as unknown as string;
    const response = await controller.getEpisodesById(id);
    return res.send(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error in invocation of API: /episodes/byfeedid" });
  }

});

router.get("/recent/feeds", async (_req, res) => {
  try {
    const max: number = _req.query.max as unknown as number;
    const lang: string = _req.query.lang as unknown as string;
    const since: number = _req.query.since as unknown as number;
    const cat: string = _req.query.cat as unknown as string;
    const notcat: string = _req.query.cat as unknown as string;
    const response = await controller.getRecentFeeds(max, lang, since, cat, notcat);
    return res.send(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error in invocation of API: /recent/feeds" });
  }
});

router.get("/recent/episodes", async (_req, res) => {
  try {
    const max: number = _req.query.max as unknown as number;
    const excludeString: string = _req.query.max as unknown as string;
    const before: number = _req.query.before as unknown as number;
    const fulltext: boolean = _req.query.max as unknown as boolean;
    const response = await controller.getRecentEpisodes(max, before, excludeString, fulltext);
    return res.send(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error in invocation of API: /recent/episodes" });
  }
});

router.get("/podcasts/bymedium", async (_req, res) => {
  try {
    const medium: Medium = _req.query.medium as unknown as Medium;
    const response = await controller.getPodcastsByMedium(medium);
    return res.send(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error in invocation of API: /podcasts/bymedium" });
  }
});

// TODO: Implement '/episodes/random'

export default router;