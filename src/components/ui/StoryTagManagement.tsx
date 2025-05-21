import { useState, useEffect } from "react";
import {
  Button,
  Flex,
  Heading,
  VStack,
  Card,
  Table,
  Textarea,
  Tag,
  HStack,
  Text,
} from "@chakra-ui/react";
import { FiTrash2, FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";
import { FaRegEdit } from "react-icons/fa";
import TagsInput from "../common/TagsInput";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  addField,
  removeField,
  setTags,
  setResponse,
} from "@/redux/slices/storyAutomation.slice";
import ConfirmationPopup from "../common/ConfirmationPopup";

const StoryTagManagement = () => {
  const dispatch = useDispatch();
  const { fields, tags, responseDM } = useSelector(
    (state: RootState) => state.storyAutomation
  );

  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [popupMessage, setPopupMessage] = useState<string>("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [pendingEdit, setPendingEdit] = useState<{
    tag: { tags: string[]; responseDM: string };
    index: number;
  } | null>(null);

  const hasUnsavedChanges = tags.length > 0 || responseDM;

  const startEditing = (
    tag: { tags: string[]; responseDM: string },
    index: number
  ) => {
    if (hasUnsavedChanges) {
      setPopupMessage("You have unsaved changes. Discard and edit this tag?");
      setPendingEdit({ tag, index });
      setIsPopupOpen(true);
    } else {
      proceedToEdit(tag, index);
    }
  };

  const proceedToEdit = (
    tag: { tags: string[]; responseDM: string },
    index: number
  ) => {
    setEditingId(index);
    dispatch(setTags(tag.tags));
    dispatch(setResponse(tag.responseDM));
    dispatch(removeField(index));
  };

  const resetForm = () => {
    dispatch(setTags([]));
    dispatch(setResponse(""));
    setEditingId(null);
  };

  const handleConfirmEdit = () => {
    if (pendingEdit) {
      proceedToEdit(pendingEdit.tag, pendingEdit.index);
      setPendingEdit(null);
    }
    setIsPopupOpen(false);
  };

  const handleAddOrUpdate = () => {
    if (!tags.length || !responseDM) {
      toast.error("Please fill in all fields.");
      return;
    }

    dispatch(addField({ tags, responseDM }));
    resetForm();
  };

  useEffect(() => {
    return () => {
      resetForm();
    };
  }, []);

  return (
    <>
      <ConfirmationPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        message={popupMessage}
        onConfirm={handleConfirmEdit}
      />
      <Flex gap={4} flexDir={{ base: "column", md: "row" }} width="full">
        {/* Add/Edit Tag Form */}
        <Card.Root
          borderRadius="md"
          boxShadow="md"
          width={{ base: "100%", md: "1/2", xl: "2/3" }}
        >
          <Card.Header display={"flex"} justifyContent={"space-between"}>
            <Heading size="lg">
              {editingId !== null
                ? "Edit Tag and Response"
                : "Add New Tag and Response"}
            </Heading>
          </Card.Header>
          <Card.Body>
            <VStack width="full" gap={0} align="start">
              <TagsInput
                tags={tags}
                setTags={(payload) => dispatch(setTags(payload))}
              />

              <Text mt={4} mb={2}>
                DM Response
              </Text>
              <Textarea
                _focusWithin={{ borderColor: "gray.400" }}
                outline="none"
                placeholder="Write your response for the DM here..."
                variant="outline"
                value={responseDM}
                onChange={(e) => dispatch(setResponse(e.target.value))}
                minHeight="60px"
                resize="vertical"
              />
            </VStack>

            <Button
              width={"100%"}
              mt={4}
              bg={"gray.100"}
              color={"gray.600"}
              px={4}
              py={2}
              rounded="4px"
              border="2px"
              borderStyle="solid"
              fontWeight={550}
              borderColor="gray.200"
              _hover={{ bg: "gray.200" }}
              type="submit"
              onClick={() => handleAddOrUpdate()}
            >
              <FiPlus size={20} />
              {editingId ? "Update Tag/Value" : "Add Tag/Value"}
            </Button>
          </Card.Body>
        </Card.Root>

        {/* Tags List */}
        <Card.Root
          borderRadius="md"
          boxShadow="md"
          width={{ base: "100%", md: "1/2", xl: "1/3" }}
        >
          <Card.Header>
            <Heading size="lg">Tags List</Heading>
          </Card.Header>
          <Card.Body>
            <Table.Root size="sm">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader
                    color={"gray.500"}
                    fontSize={"md"}
                    width={"2/3"}
                  >
                    Tags
                  </Table.ColumnHeader>
                  <Table.ColumnHeader
                    color={"gray.500"}
                    fontSize={"md"}
                    width={"1/3"}
                  >
                    Actions
                  </Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {fields?.map((tag, index) => (
                  <Table.Row key={index}>
                    <Table.Cell p={3} fontWeight={"bold"} width={"2/3"}>
                      <HStack wrap="wrap" gap={2}>
                        {tag?.tags?.map((tag, index) => (
                          <Tag.Root
                            key={index}
                            color={"gray.600"}
                            borderRadius="full"
                            borderStyle={"solid"}
                            borderWidth={1}
                            borderColor={"gray.300"}
                            bgColor={"gray.100"}
                            variant={"solid"}
                            px={2}
                            py={1}
                          >
                            <Tag.Label fontSize={"xs"}>{tag}</Tag.Label>
                          </Tag.Root>
                        ))}
                      </HStack>
                    </Table.Cell>
                    <Table.Cell p={6} width={"1/3"}>
                      <Flex gap={4}>
                        <FaRegEdit
                          onClick={() => startEditing(tag, index)}
                          size={20}
                          cursor={"pointer"}
                        />
                        <FiTrash2
                          size={20}
                          onClick={() => dispatch(removeField(index))}
                          cursor={"pointer"}
                        />
                      </Flex>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Card.Body>
        </Card.Root>
      </Flex>
    </>
  );
};

export default StoryTagManagement;
