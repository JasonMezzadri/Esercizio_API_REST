const express = require("express");
const router = express.Router();
const { items } = require("../data/db");

// -----------------------------------------------
// GET /api/items → Restituisce tutti gli elementi
// -----------------------------------------------
router.get("/", (req, res) => {
  res.json(items);
});

// -----------------------------------------------
// GET /api/items/:id → Restituisce un elemento per ID
// -----------------------------------------------
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);

  if (!item) {
    return res.status(404).json({ message: "Elemento non trovato" });
  }

  res.json(item);
});

// -----------------------------------------------
// POST /api/items → Crea un nuovo elemento
// -----------------------------------------------
router.post("/", (req, res) => {
  const { name } = req.body;

  // Validazione: il campo name è obbligatorio
  if (!name) {
    return res.status(400).json({ message: "Il campo 'name' è obbligatorio" });
  }

  // Genera un nuovo ID (prende il massimo esistente + 1)
  const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;

  const newItem = { id: newId, name };
  items.push(newItem);

  res.status(201).json(newItem);
});

// -----------------------------------------------
// PUT /api/items/:id → Modifica un elemento esistente
// -----------------------------------------------
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);

  if (!item) {
    return res.status(404).json({ message: "Elemento non trovato" });
  }

  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Il campo 'name' è obbligatorio" });
  }

  // Aggiorna il campo
  item.name = name;

  res.json(item);
});

// -----------------------------------------------
// DELETE /api/items/:id → Elimina un elemento
// -----------------------------------------------
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex(i => i.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Elemento non trovato" });
  }

  // Rimuove l'elemento dall'array
  const deleted = items.splice(index, 1);

  res.json({ message: "Elemento eliminato", item: deleted[0] });
});

module.exports = router;