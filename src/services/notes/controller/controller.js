import { nanoid } from 'nanoid';
import notes from '../notes.js';
import response from '../../../utils/response.js';
import InvariantError from '../../../exceptions/invariant-error.js';
import NotFoundError from '../../../exceptions/not-found-error.js';
// POST: membuat notes baru
export const createNote = (req, res, next) =>{
  const { title = 'untitled', tags, body } = req.body;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;
  const newNote = { title, tags, body, id, createdAt, updatedAt };
  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length >  0;

  if (!isSuccess){
    return next(new InvariantError('Catatan gagal ditambahkan'));
  }

  return response(res, 201, 'Catatan berhasil ditambahkan', { noteId: id });

};
// GET mendapatkan semua notes
export const getNotes = (req, res) =>{
  return res.json({
    status: 'success',
    data: { notes }
  });
};

//  GET  /notes{/:id} Mendapatkan notes berdasarkan ID
export const getNoteById = (req, res, next) =>{
  const { id } = req.params;

  const note =  notes.find((n) => n.id === id);

  // if (!note) {
  //   return res.json({
  //     status: 'success',
  //     data: { note }
  //   });
  // }
  // return res.status(404).json({
  //   status: 'fail',
  //   message: 'Catatan tidak ditemukan'
  // });

  if (!note) {
    return next(new NotFoundError('Catatan tidak ditemukan'));
  }

  return response(res, 200, 'Catatan sukses ditampilkan', { note: note });

};
// PUT /notes/{:/id} mengubah note yang sudah ada
export const editNoteById = (req, res, next) =>{
  const { id } = req.params;
  const { title, tags, body } = req.body;
  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);

  if (index === -1){
    return next(new NotFoundError('Catatan tida ditemukan'));
  }
  notes[index] = { ...notes[index], title, tags, body, updatedAt };
  return response(res, 200, 'Catatan berhasil diperbarui', notes[index]);
};

// Delete /notes/{/:id} menghapus notes
export const deleteById = (req, res, next) =>{
  const { id } = req.params;

  const index = notes.findIndex((n) => n.id === id);

  if (index === -1){
    return next(new NotFoundError('Catatan tidak ditemukan'));
  }

  notes.splice(index, 1);
  return response(res, 200, 'Catatan berhasil dihapus');

};