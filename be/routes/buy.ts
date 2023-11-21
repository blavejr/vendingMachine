import express, {Request} from "express";
import { IBasicAuthedRequest } from 'express-basic-auth';
import * as buyController from "../controllers/buy";
import { User } from "../models/user";

const router = express.Router();

router.post("/:id", async (req: any, res) => {
    const { product_id, amount } = req.body || null;
    const { id } = req.params || null;
    const { user } = req.auth || null;
    const purchase = await buyController.create(id, product_id, amount);
    res.json(req?.auth || null);
});

export default router;
