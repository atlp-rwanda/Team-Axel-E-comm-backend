import { Router } from "express";

const testRouter = Router();

testRouter.get("/test", (req, res) => {
  // render a handlebars template
  res.render("email");
});

export default testRouter;
