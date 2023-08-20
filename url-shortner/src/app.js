import express from "express";
import morgan from "morgan";
import { config } from "./config/main.config.js";
import { dbcon } from "./database/database.config.js"
import { router } from "./route/user.route.js";
import url from "url";
import { join } from "path";

const app = express();

const __dirname = url.fileURLToPath(new url.URL('.', import.meta.url));

app.set('view engine', 'ejs');
app.set("views", join(__dirname, "views"));

//middleware
//setting static files directory ./public
app.use(express.static(join(__dirname, "public")));
app.use(morgan("dev"));
app.use(express.json());

// to be able to use form post method
app.use(express.urlencoded({ extended: false }));

//router
app.use('/', router);

//database connection
dbcon(config);

app.listen(config.server.port, () => {
    console.log(`Application running at port: ${config.server.port} successfully`);
});