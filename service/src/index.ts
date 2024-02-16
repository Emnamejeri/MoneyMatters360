import express from "express";
import bodyParser from "body-parser";
import { trpcRouter } from "./trpcServer";

const app = express();

app.use(bodyParser.json());

app.use("/api/trpc", trpcRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
