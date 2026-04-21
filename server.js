const express = require("express");
const app = express();
const votiRoutes = require("./routes/voti");

// Middleware: permette di leggere JSON dal body delle richieste
app.use(express.json());

// Collega le rotte
app.use("/api/voti", votiRoutes);

// Avvia il server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server attivo su http://localhost:${PORT}/api/voti`);
});