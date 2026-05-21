import NotesRepositories from '../repositories/note-repositories.js';
import response from '../../../utils/response.js';
import InvariantError from '../../../exceptions/invariant-error.js';
import NotFoundError from '../../../exceptions/not-found-error.js';



// POST: membuat notes baru
export const createNote = async (req, res, next) => {

  const { title, tags, body } = req.validated;
  const note = await NotesRepositories.createNote({
    title,
    body,
    tags
  });

  if (!note){
    return next(new InvariantError('Catatan gagal ditambahkan'));
  }

  return response(res, 201, 'Catatan berhasil ditambahkan', note);
};

// GET mendapatkan semua notes
export const getNotes = async (req, res) =>{
  const notes = await NotesRepositories.getNotes();
  return response(res, 200, 'Catatan sukses ditampilkan', notes);
};

//  GET  /notes{/:id} Mendapatkan notes berdasarkan ID
export const getNoteById = async (req, res, next) =>{
  const { id } = req.params;

  const note = await NotesRepositories.getNotesById(id);


  if (!note) {
    return next(new NotFoundError('Catatan tidak ditemukan'));
  }

  return response(res, 200, 'Catatan sukses ditampilkan', note);

};

// PUT /notes/{:/id} mengubah note yang sudah ada
export const editNoteById = async (req, res, next) =>{
  const { id } = req.params;
  const { title, tags, body } = req.validated;

  const note = await NotesRepositories.editNoteById({
    id, title, body, tags
  });





  if (!note){
    return next(new NotFoundError('Catatan tida ditemukan'));
  }
  return response(res, 200, 'Catatan berhasil diperbarui', note);
};

// Delete /notes/{/:id} menghapus notes
export const deleteById = async (req, res, next) => {
  const { id } = req.params;

  const deletedNote = await noteRepositories.deleteNoteById(id);

  if (!deletedNote){
    return next(new NotFoundError('Catatan tidak ditemukan'));
  }


  return response(res, 200, 'Catatan berhasil dihapus', deletedNote);

};