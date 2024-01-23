import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  anyDocument,
  createDocument,
  deleteDocument,
  getDocument,
  updateDocument,
} from "../controllers/documentController.js";
const router = express.Router();

router
  .route("/document")
  .post(isAuthenticated, createDocument)
  .put(isAuthenticated, updateDocument);
//   .put(isAuthenticated, getDocument);
router.route("/documents").put(isAuthenticated, getDocument);
router.route("/deletedocuments/:id").put(isAuthenticated, deleteDocument);

router.route("/documentt/:id").put(isAuthenticated, anyDocument);
//   .delete(isAuthenticated, deleteDocument);

export default router;
