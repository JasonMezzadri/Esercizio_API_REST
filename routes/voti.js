const express = require("express");
const router = express.Router();
const { voti } = require("../data/db");

// -----------------------------------------------
// GET /api/voti → Restituisce tutti i voti
// -----------------------------------------------
router.get("/", (req, res) => {
  res.json(voti);
});

// -----------------------------------------------
// GET /api/voti/:id → Restituisce un voto per ID
// -----------------------------------------------
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const voto = voti.find(v => v.id === id);

  if (!voto) {
    return res.status(404).json({ message: "Voto non trovato" });
  }

  res.json(voto);
});

// -----------------------------------------------
// POST /api/voti → Crea un nuovo voto
// -----------------------------------------------
router.post("/", (req, res) => {
  const { studente, materia, voto } = req.body;

  // Validazione: i campi studente, materia e voto sono obbligatori
  if (!studente || !materia || voto === undefined) {
    return res.status(400).json({ message: "I campi 'studente', 'materia' e 'voto' sono obbligatori" });
  }

  // Genera un nuovo ID (prende il massimo esistente + 1)
  const newId = voti.length > 0 ? Math.max(...voti.map(v => v.id)) + 1 : 1;

  const newVoto = { id: newId, studente, materia, voto };
  voti.push(newVoto);

  res.status(201).json(newVoto);
});

// -----------------------------------------------
// PUT /api/voti/:id → Modifica un voto esistente
// -----------------------------------------------
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const voto = voti.find(v => v.id === id);

  if (!voto) {
    return res.status(404).json({ message: "Voto non trovato" });
  }

  const { studente, materia, voto: nuovoVoto } = req.body;

  if (!studente || !materia || nuovoVoto === undefined) {
    return res.status(400).json({ message: "I campi 'studente', 'materia' e 'voto' sono obbligatori" });
  }

  // Aggiorna i campi
  voto.studente = studente;
  voto.materia = materia;
  voto.voto = nuovoVoto;

  res.json(voto);
});

// -----------------------------------------------
// DELETE /api/voti/:id → Elimina un voto
// -----------------------------------------------
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = voti.findIndex(v => v.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Voto non trovato" });
  }

  // Rimuove il voto dall'array
  const deleted = voti.splice(index, 1);

  res.json({ message: "Voto eliminato", voto: deleted[0] });
});

module.exports = router;