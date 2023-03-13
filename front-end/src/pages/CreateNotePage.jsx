import { Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NoteCreator } from '../components/Notes/NoteCreator';
import { createNote } from '../services/noteServices';

export const CreateNotePage = () => {
  const navigate = useNavigate();
  const [note, setNote] = useState({
    title: '',
    content: '',
    author: '',
    tags: [],
  });

  const handleOnChange = e => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleOnClick = async () => {
    await createNote(note);
    navigate('/', { replace: true });
  };

  return (
    <>
      <Text fontSize="5xl">CREATE NOTE</Text>
      <Flex justify="center">
        <NoteCreator
          note={note}
          title="New Note"
          onClick={handleOnClick}
          onChange={handleOnChange}
          setNote={setNote}
        />
      </Flex>
    </>
  );
};
