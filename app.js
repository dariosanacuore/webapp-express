import express from "express";
import moviesRouter from "./routes/movies.js";

const app = express();
const port = 3000;

app.use(express.json());


app.use("/movies", moviesRouter);


app.get("/", (req, res) => {
    res.json({ message: "API Film funzionante!" });
});


app.use((req, res) => {
    res.status(404).json({
        error: "Not Found",
        message: "Endpoint non esistente"
    });
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: "Errore del server",
        message: err.message
    });
});

app.listen(port, () => {
    console.log(" Server avviato sulla porta " + port);
});
