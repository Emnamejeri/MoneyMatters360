import express, { ErrorRequestHandler } from "express";
import { router } from "./trpcServer";

const app = express();

app.use(express.json());

app.use("/moneymatters", router);

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke in the server initiation!");
};

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
