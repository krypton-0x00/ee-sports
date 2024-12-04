import express, { type Application, type Request, type Response } from "express"
import dotenv from "dotenv"
import cors from 'cors'
import logger from "./utils/logger";
import errorHandler from "./middlewares/errorHandler.middleware";
import morgan from "morgan";

type Port = string | undefined;

dotenv.config();


export const app: Application = express();
const PORT: Port = process.env.PORT;

app.use(cors());
app.use(express.json())
app.use(morgan('combined', {
    stream: {
        write: (message) => {
            logger.log({
                level: 'info',
                message: message.trim()
            });
        },
    },
}));

//app.use("/mail",)
app.get("/health", (req: Request, res: Response) => { res.status(200).json({ success: true }) })

app.use(errorHandler)

app.listen(PORT, () => {
    logger.info("Notifaction Server Started at port: ", PORT);
})
