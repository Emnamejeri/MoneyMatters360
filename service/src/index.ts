import express from "express";
import bodyParser from "body-parser";
import { httpLinkConfig } from "./trpcServer"; // Import AppRouter and httpLinkConfig

const app = express();

app.use(bodyParser.json());

const trpcEndpoint = httpLinkConfig.url;


console.log("trpcEndpoint:", trpcEndpoint);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
