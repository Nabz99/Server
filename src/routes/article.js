import express from 'express';
import Article from '../classes/ArticleClass.js';
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const article = req.body;
    const newArticle = await Article.create(article);
    res.status(201).send(newArticle);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update an article
router.put("/:id", async (req, res) => {
  try {
    const article = req.body;
    const _id = req.params.id;

    const result = await Article.update(_id, article);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete an article
router.delete("/:id", async (req, res) => {
  try {
    const article = req.params.id;
    const newArticle= await Article.remove(article);
    res.status(200).send(newArticle);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Find an article
router.get("/", async (req, res) => {
  try {
    const newArticle = await Article.find();
    res.status(200).send(newArticle);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Find an article by id
router.get("/find/:id", async (req, res) => {
  try {
    const { _id } = req.params;
    const newArticle = await Article.findById(_id);
    res.status(200).send(newArticle);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;