import axios from 'axios';
import { uniqBy } from 'lodash';
export const getNotes = async () => {
  const res = await axios.get('http://localhost:3000/Note/list');
  return res.data;
};

export const getTags = async () => {
  const res = await axios.get('http://localhost:3000/Note/listTags');
  return uniqBy(res.data, 'tag');
};

export const getArchivedNotes = async () => {
  const res = await axios.get('http://localhost:3000/Note/getArchivedNotes');
  return res.data;
};

export const getNote = async noteId => {
  const res = await axios.get('http://localhost:3000/Note/getNote/' + noteId);
  return res.data;
};

export const deleteNote = async noteId => {
  await axios.delete('http://localhost:3000/Note/deleteNote/' + noteId);
};

export const createNote = async note => {
  await axios.post('http://localhost:3000/Note/createNote/', note);
};

export const updateNote = async note => {
  await axios.put('http://localhost:3000/Note/updateNote/', note);
};

export const archiveNote = async (noteId, value) => {
  await axios.put(`http://localhost:3000/Note/archiveNote/${noteId}/${value}`);
};
