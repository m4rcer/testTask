import express from "express";
import router from "./routes/router.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api", router);

async function startApp() {
    try {
        app.listen(PORT, () => {console.log(`Server started on PORT = ${PORT}`)});
    } catch (e) {
        console.log(e);
    }
}

startApp();