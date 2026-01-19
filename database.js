import mysql from "mysql2";

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "movies_db"
});

connection.connect((err) => {
    if (err) {
        console.error("Errore connessione DB:", err);
        return;
    }
    console.log("Connesso a MySQL!");
});

export default connection;
