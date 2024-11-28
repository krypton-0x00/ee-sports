import express, { type Application } from "express";
import dotenv from "dotenv";
import getConfigData from "./utils/getConfigData.util";
import type { Config } from "./types/config.type";
import cookieParser from "cookie-parser";
import cors from "cors";
import AuthService from "./controllers/auth.controller";
dotenv.config();

const PORT = process.env.PORT;
const app: Application = express();

const config: Config.ConfigType = await getConfigData("./config/config.yaml");
const auth = new AuthService(config.authorization_api_url);

app.use(cookieParser());
app.use(cors());



app.listen(PORT, () => {
  console.log(`Server Started at : http://localhost:${PORT}`);
});
