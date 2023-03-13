import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Divider,
  Input,
  FormControl,
  FormLabel,
  Box,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { Tag, TagLabel, TagCloseButton } from '@chakra-ui/react';

export const NoteCreator = ({
  note,
  isEditing,
  title,
  onChange,
  onClick,
  setNote,
}) => {
  const handleOnKeyPress = e => {
    if (e.code === 'Enter' && e.target.value.length > 0) {
      setNote({ ...note, tags: [...note.tags, e.target.value] });
      e.target.value = null;
    }
  };

  const handleOnDeleteTag = deletedTag => {
    setNote({ ...note, tags: note.tags.filter(tag => tag !== deletedTag) });
  };

  return (
    <Card maxW="lg">
      <CardHeader>
        <Heading size="lg">{title}</Heading>
      </CardHeader>
      <CardBody>
        <Stack mt="10" spacing="3">
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              name="title"
              value={note.title}
              onChange={onChange}
              placeholder="Please, Insert a title."
            />
          </FormControl>
          <FormControl>
            <FormLabel>Content</FormLabel>
            <Input
              name="content"
              value={note.content}
              onChange={onChange}
              placeholder="Note content here!"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Author</FormLabel>
            <Input
              name="author"
              value={note.author}
              onChange={onChange}
              placeholder="Please, Insert the author."
            />
          </FormControl>
        </Stack>
        <Divider h="1rem" />
        {!isEditing && (
          <>
            <Wrap>
              {note.tags?.map((tag, index) => (
                <WrapItem key={index}>
                  <Tag
                    size="sm"
                    key={index}
                    borderRadius="full"
                    variant="solid"
                    colorScheme="teal"
                  >
                    <TagLabel>{tag}</TagLabel>
                    <TagCloseButton
                      onClick={() => handleOnDeleteTag(tag)}
                    ></TagCloseButton>
                  </Tag>
                </WrapItem>
              ))}
            </Wrap>
          </>
        )}
      </CardBody>
      <CardFooter>
        <Box>
          <Input
            isDisabled={isEditing}
            variant="filled"
            placeholder="Enter a new tag..."
            onKeyPress={handleOnKeyPress}
          />
        </Box>
        <Box>
          <Button variant="solid" colorScheme="blue" onClick={onClick}>
            {isEditing ? 'Edit Note' : 'Create Note'}
          </Button>
        </Box>
      </CardFooter>
    </Card>
  );
};
