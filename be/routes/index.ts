import express from "express";
import userRouter from "./user";
import productRouter from "./product";
import depositRoutes from "./deposit";
import buyRoutes from "./buy";
// import resetRoutes from "./reset";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.use("/user", userRouter);
router.use("/product", productRouter);
router.use('/deposit', depositRoutes);
router.use('/buy', buyRoutes);
// router.use('/reset', resetRoutes);

export default router;