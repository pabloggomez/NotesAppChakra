import { getNotes } from '../services/noteServices';
import { useEffect, useState } from 'react';
import { FilterTag } from '../components/Notes/FilterTag';
import {
  Box,
  Grid,
  Spinner,
  VStack,
  Text,
  Flex,
  Heading,
} from '@chakra-ui/react';
import { NoteCard } from '../components/Notes/NoteCard';
import { Logo } from '../Logo';

export const NotesListPage = () => {
  const [notes, setNotes] = useState([]);

  const [selectedTag, setSelectedTag] = useState();

  const [filteredNotes, setFilteredNotes] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchingNotes();
    console.log('Entró');
  }, []);

  useEffect(() => {
    if (selectedTag !== 'All') {
      setFilteredNotes(
        notes.filter(note => note.tags.some(({ tag }) => tag === selectedTag))
      );
    } else if (selectedTag === 'All') {
      setFilteredNotes(notes);
    }
  }, [selectedTag]);

  const fetchingNotes = () => {
    setLoading(true);
    getNotes().then(notes => {
      setNotes(notes);
      setFilteredNotes(notes);
      setLoading(false);
    });
  };

  if (loading) {
    return (
      <Flex
        alignItems="center"
        alignContent="center"
        justify="center"
        align="center"
        height="100vh"
      >
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <>
      <Text fontSize="5xl">NOTES LIST</Text>
      <div>
        <FilterTag setSelectedTag={setSelectedTag} />
      </div>
      {Boolean(filteredNotes.length && !loading) ? (
        <>
          <Flex gap="6" justify="center">
            {filteredNotes.map(note => (
              <NoteCard key={note.id} {...note} fetchingNotes={fetchingNotes} />
            ))}
          </Flex>
        </>
      ) : (
        <>
          <Box textAlign="center" fontSize="xl">
            <Grid minH="100vh" p={3}>
              <VStack spacing={8}>
                <Logo h="40vmin" pointerEvents="none" />
                <Text>THERE IS NOT RESULTS.</Text>
              </VStack>
            </Grid>
          </Box>
        </>
      )}
    </>
  );
};
