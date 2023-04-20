import { Router } from "express";
import authRouter from "./auth.routes";
import passportRouter from "./passport.routes";
import productRouter from "./product.routes";
import userRouter from "./user.routes";
import cartRouter from "./cart.routes";
import checkoutRouter from "./checkout.routes";
import orderRouter from "./order.routes";
import wishRouter from "./wishes.routes";
import notificationRouter from "./notification.routes";
import chatRouter from "./chat.routes";
import reviewRout from "./review.routes";
import rolesRouter from "./roles.routes";

const router = Router();

router.use("/auth", authRouter);
router.use(passportRouter);
router.use("/product", productRouter);
router.use("/cart", cartRouter);
router.use("/user", userRouter);
router.use("/checkout", checkoutRouter);
router.use("/order", orderRouter);
router.use("/wishes", wishRouter);
router.use("/notification", notificationRouter);
router.use("/chat", chatRouter);
router.use("/productReview", reviewRout);
router.use("/role", rolesRouter);

export default router;
