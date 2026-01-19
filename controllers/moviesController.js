import connection from "../database.js";


function index(req, res) {
    connection.query("SELECT * FROM movies", (err, movies) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Errore server" });
        }

        res.json({
            count: movies.length,
            results: movies
        });
    });
}


function show(req, res) {
    const id = parseInt(req.params.id);

    connection.query("SELECT * FROM movies WHERE id = ?", [id], (err, movies) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Errore server" });
        }

        if (movies.length === 0) {
            return res.status(404).json({ error: "Film non trovato" });
        }


        connection.query(
            "SELECT * FROM reviews WHERE movie_id = ?",
            [id],
            (err, reviews) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: "Errore server" });
                }

                res.json({
                    ...movies[0],
                    reviews: reviews
                });
            }
        );
    });
}

export default { index, show };
