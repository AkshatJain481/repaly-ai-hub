import { useState, useRef, KeyboardEvent, ChangeEvent } from "react";
import {
  Box,
  Input,
  Tag,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { CiCirclePlus } from "react-icons/ci";

const TagsInput = ({
  tags,
  setTags,
}: {
  tags: string[];
  setTags: (tags: string[]) => void;
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const addTag = () => {
    if (inputValue.trim() !== "" && !tags.includes(inputValue.trim())) {
      const newTags = [...tags, inputValue.trim()];
      setTags(newTags);
      setInputValue("");
    }
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue) {
      e.preventDefault();
      addTag();
    } else if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
      const newTags = tags.slice(0, -1);
      setTags(newTags);
    }
  };

  const removeTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
  };

  return (
    <Box w="full">
      <HStack
        wrap="wrap"
        p={2}
        gap={2}
        border="1px solid"
        borderColor="gray.300"
        borderRadius="md"
        _focusWithin={{ borderColor: "gray.400" }}
        onClick={() => inputRef.current?.focus()}
      >
        {tags.map((tag, index) => (
          <Tag.Root
            key={index}
            color={"gray.600"}
            borderRadius="full"
            borderStyle={"solid"}
            borderWidth={1}
            borderColor={"gray.300"}
            bgColor={"gray.100"}
            variant={"solid"}
            px={3}
            py={1}
          >
            <Tag.Label fontSize={"md"}>{tag}</Tag.Label>
            <Tag.EndElement>
              <Tag.CloseTrigger onClick={() => removeTag(index)} />
            </Tag.EndElement>
          </Tag.Root>
        ))}

        <HStack flex="1" minW="150px">
          <Input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={tags.length === 0 ? "Add Tags..." : ""}
            border="none"
            _focus={{ outline: "none" }}
          />
          <IconButton
            bgColor={"transparent"}
            fontWeight={"bold"}
            size="xl"
            color={"black"}
            boxSize={8}
            as={CiCirclePlus}
            onClick={addTag}
            disabled={!inputValue.trim()}
          />
        </HStack>
      </HStack>
    </Box>
  );
};

export default TagsInput;
