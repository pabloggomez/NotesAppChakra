import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Divider,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { format } from 'timeago.js';
import { Link } from '@chakra-ui/react';
import { getNotes, deleteNote, archiveNote } from '../../services/noteServices';
import {
  RiDeleteBin6Fill,
  RiArchiveDrawerLine,
  RiEdit2Line,
} from 'react-icons/ri';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { Tag, TagLabel } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const NoteCard = ({
  id,
  title,
  content,
  author,
  createdAt,
  tags,
  archived,
  fetchingNotes,
}) => {
  const navigate = useNavigate();

  const handleOnDelete = async id => {
    await deleteNote(id);
    fetchingNotes();
    navigate('/', { replace: true });
  };

  const handleOnArchive = async id => {
    await archiveNote(id, !archived);
    fetchingNotes();
    !archived
      ? navigate('/', { replace: true })
      : navigate('/archived', { replace: true });
  };

  return (
    <Card maxW="sm" key={id}>
      <CardHeader>
        <Heading size="lg">{title}</Heading>
      </CardHeader>
      <CardBody>
        <Stack spacing="3">
          <Heading size="md">{content}</Heading>
          <Text>Author: {author}</Text>
          <Text>{format(createdAt)}</Text>
        </Stack>
        <Divider h="1rem" />
        <Wrap>
          {tags?.map(tag => (
            <WrapItem key={tag.id}>
              <Tag size="sm" borderRadius="full" variant="solid">
                <TagLabel>{tag.tag}</TagLabel>
              </Tag>
            </WrapItem>
          ))}
        </Wrap>
      </CardBody>
      <Divider h="1rem" />
      <CardFooter>
        <Wrap>
          <WrapItem>
            <Link href={'/edit/' + id} key={id}>
              <Button colorScheme="teal" leftIcon={<RiEdit2Line />}>
                Edit
              </Button>
            </Link>
          </WrapItem>
          <WrapItem>
            <Button
              variant="solid"
              colorScheme="blue"
              leftIcon={<RiArchiveDrawerLine />}
              onClick={() => handleOnArchive(id)}
            >
              {archived ? 'Unarchive' : 'Archive'}
            </Button>
          </WrapItem>
          <WrapItem>
            <Button
              variant="solid"
              colorScheme="red"
              leftIcon={<RiDeleteBin6Fill />}
              onClick={() => handleOnDelete(id)}
            >
              Delete
            </Button>
          </WrapItem>
        </Wrap>
      </CardFooter>
    </Card>
  );
};
