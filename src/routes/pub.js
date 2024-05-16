import { Router } from "express";
import { create, update, remove, find, findById, findByClient } from "../classes/PubClass";
import { findById as _findById } from '../classes/ClientClass';
const router = Router();


router.post("/cre", async (req, res) => {
  try {
    const pub = req.body;
    const newPub = await create(pub);
    res.status(201).send(newPub);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Create a Pub
router.post("/", async (req, res) => {
  try {
    const pub = req.body;
    const newPub = await create(pub);
    const client = await _findById(pub.client);

    Number(client.solde) += Number(pub.devis) - Number(pub.versement);

    await client.save();
    res.status(201).send(newPub);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Pay a Pub
router.put("/paiement/:id", async (req, res) => {
  try {
    const pub = req.body;
    const _id = req.params.id;


    const client = await _findById(pub.client);
    client.solde += pub.devis - pub.versement;
    await client.save();

    const result = await update(_id, pub);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a Pub
router.put("/:id", async (req, res) => {
  try {
    const pub = req.body;
    const _id = req.params.id;

    const result = await update(_id, pub);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a Pub
router.delete("/:id", async (req, res) => {
  try {
    const pub = req.params.id;
    const newPub = await remove(pub);
    res.status(200).send(newPub);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Find a Pub
router.get("/", async (req, res) => {
  try {
    const newPub = await find();
    res.status(200).send(newPub);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Find a Pub by id
router.get("/find/:id", async (req, res) => {
  try {
    const { _id } = req.params;
    const newPub = await findById(_id);
    res.status(200).send(newPub);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Find a Pub by client
router.get("/findpubbyclient/:clientId", async (req, res) => {
  try {
      const {clientId} = req.params
      const newPub = await findByClient(clientId)
      res.status(200).send(newPub)
  } catch (error) {
      res.status(500).send(error)
  }
});

export default router;
