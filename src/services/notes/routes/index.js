import express from 'express';
import {
  createNote,
  getNoteById,
  getNotes,
  editNoteById,
  deleteById

} from '../controller/controller.js';
import validate from '../../../middlewares/validate.js';
import { notePayloadSchema } from '../validator/schema.js';


const router = express.Router();

router.post('/notes', validate(notePayloadSchema), createNote);

router.get('/notes', getNotes);

router.get('/notes{/:id}', getNoteById);

router.put('/notes{/:id}', validate(notePayloadSchema), editNoteById);

router.delete('/notes{/:id}', deleteById);

export default router;