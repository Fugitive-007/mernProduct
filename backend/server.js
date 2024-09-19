//Entry point for the API
import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import porductRoutes from "./router/product.route.js";

//to access the files in the env

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();


app.use(express.json());//allows us to accept json data in req.body

app.use("/api/products", porductRoutes );

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

//listen to any change in the server file usin nodemon
app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:"+PORT);
});
