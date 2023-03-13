import { Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { NoteCreator } from '../components/Notes/NoteCreator';
import { getNote, updateNote } from '../services/noteServices';

export const EditNotePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState({
    title: '',
    content: '',
    author: '',
    tags: [],
  });

  useEffect(() => {
    getNote(id).then(note => setNote(note));
  }, []);

  const handleOnChange = e => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleOnClick = () => {
    updateNote(note);
    navigate('/', { replace: true });
  };

  return (
    <>
      <Text fontSize="5xl">EDIT NOTE</Text>
      <Flex justify="center">
        <NoteCreator
          note={note}
          title="Edit Note"
          onClick={handleOnClick}
          onChange={handleOnChange}
          isEditing={true}
        />
      </Flex>
    </>
  );
};
