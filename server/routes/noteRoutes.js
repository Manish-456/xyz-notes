const express = require("express");
const noteController = require("../controllers/NoteController");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();
router.use(verifyToken);
router
  .route("/")
  .get(noteController.getAllNotes)
  .post(noteController.createNewNote)
  .patch(noteController.updateNote)
  .delete(noteController.deleteNote);
module.exports = router;
