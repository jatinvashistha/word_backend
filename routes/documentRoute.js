import express from 'express'
import { isAuthenticated } from '../middlewares/auth.js';
import {
    anyDocument,
    createDocument
    , deleteDocument, getDocument, updateDocument
} from '../controllers/documentController.js';
const router = express.Router();

router.route('/document').post(isAuthenticated, createDocument)
    .put(isAuthenticated, updateDocument)
    .get(isAuthenticated, getDocument)
  
   
router
  .route("/document/:id")
  .get(isAuthenticated, anyDocument)
  .delete(isAuthenticated, deleteDocument);

   

 export default router;