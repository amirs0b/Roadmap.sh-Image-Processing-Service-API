import app from "./app.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import{__dirname} from "./app.js";


dotenv.config({path: `${__dirname}/config.env`});

mongoose.connect(process.env.DATABASE)
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log("Database not connected", err));


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));