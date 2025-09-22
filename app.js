import express from 'express';
import cors from 'cors';
import {fileURLToPath} from 'url';
import {catchError, HandleERROR} from "vanta-api";
import * as path from "node:path";
import morgan from "morgan";
import authRouter from "./Routes/Auth.js";
import userRouter from "./Routes/User.js";
import exportValidation from "./Middlewares/ExportValidation.js";
import imageRouter from "./Routes/Image.js";
import uploadRouter from "./Routes/Upload.js";


const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(express.static("Public"));


//Auth Routes
app.use('/api/auth', authRouter)
app.use(exportValidation)


//User Routes
app.use('/api/users', userRouter)
app.use('/api/images', imageRouter)
app.use('/api/uploads', uploadRouter)


app.use((req, res, next) => {
    return next(new HandleERROR("Not Found", 404));
})

app.use(catchError)
export default app;