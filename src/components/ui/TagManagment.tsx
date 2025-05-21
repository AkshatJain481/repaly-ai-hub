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
  Tabs,
  Text,
} from "@chakra-ui/react";
import { FiTrash2, FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";
import { FaRegEdit } from "react-icons/fa";
import TagsInput from "../common/TagsInput";
import { bgColor, primaryColor } from "@/utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  addField,
  removeField,
  setTags,
  setResponseComment,
  setResponseDM,
  setMode,
} from "@/redux/slices/automation.slice";
import { FaWandMagicSparkles } from "react-icons/fa6";
import {
  useSuggestReplyMutation,
  useGenerateTagsQuery,
} from "@/apis/automation";
import { TagValueProp } from "@/utils/interfaces";
import ConfirmationPopup from "../common/ConfirmationPopup";
import BarLoader from "react-spinners/BarLoader";

const TagManagement = () => {
  const dispatch = useDispatch();
  const { fields, mediaDetails, tags, responseComment, responseDM, mode } =
    useSelector((state: RootState) => state.automation);

  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [popupMessage, setPopupMessage] = useState<string>("");

  const [loadingComment, setLoadingComment] = useState<boolean>(false);
  const [loadingDM, setLoadingDM] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [pendingEdit, setPendingEdit] = useState<{
    tag: TagValueProp;
    index: number;
  } | null>(null);

  const [suggestReply] = useSuggestReplyMutation();
  const { data: generatedTags, isLoading: isTagsLoading } =
    useGenerateTagsQuery(mediaDetails?.caption || "", {
      skip: !mediaDetails?.caption,
    });

  const hasUnsavedChanges = tags.length > 0 || responseComment || responseDM;

  const startEditing = (tag: TagValueProp, index: number) => {
    if (hasUnsavedChanges) {
      setPopupMessage("You have unsaved changes. Discard and edit this tag?");
      setPendingEdit({ tag, index });
      setIsPopupOpen(true);
    } else {
      proceedToEdit(tag, index);
    }
  };

  const proceedToEdit = (tag: TagValueProp, index: number) => {
    dispatch(setMode(tag.mode));
    setEditingId(index);
    dispatch(setTags(tag.tags));
    dispatch(setResponseComment(tag.responseComment));
    dispatch(setResponseDM(tag.responseDM));
    dispatch(removeField(index));
  };

  const resetForm = () => {
    dispatch(setTags([]));
    dispatch(setResponseComment(""));
    dispatch(setResponseDM(""));
    dispatch(setMode(true));
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
    if (!tags.length || !responseComment || (mode && !responseDM)) {
      toast.error("Please fill in all fields.");
      return;
    }

    dispatch(addField({ tags, responseComment, responseDM, mode }));
    resetForm();
  };

  const handleAIResponse = async (type: "comment" | "dm") => {
    type === "comment" ? setLoadingComment(true) : setLoadingDM(true);
    const { error, data } = await suggestReply({
      mode: mode ? "comment_dm" : "comment",
      tags,
      responseTarget: type,
      captions: mediaDetails?.caption || "",
    });

    if (error) {
      const errorMessage =
        "data" in error
          ? (error.data as any) || "Failed to fetch AI response"
          : "Failed to fetch AI response";
      toast.error(errorMessage);
    } else {
      type === "comment"
        ? dispatch(setResponseComment(data?.join(" ")))
        : dispatch(setResponseDM(data?.join(" ")));
    }

    type === "comment" ? setLoadingComment(false) : setLoadingDM(false);
  };

  useEffect(() => {
    return () => {
      resetForm(); // clears tags, responseComment, responseDM, editingId
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
              <Text fontSize={"lg"} mb={2}>
                Suggested Tags
              </Text>
              <Flex
                gap={2}
                mb={2}
                wrap={"wrap"}
                height={"70px"}
                overflowY={"auto"}
                w={"full"}
                alignItems={"center"}
                justifyItems={"center"}
              >
                {isTagsLoading ? (
                  <BarLoader color={primaryColor} width={"100%"} />
                ) : (
                  <>
                    {generatedTags?.map((tag: string, index: number) => (
                      <Tag.Root
                        key={index}
                        color={"purple.600"}
                        borderRadius="full"
                        borderStyle={"solid"}
                        borderWidth={1}
                        borderColor={"purple.300"}
                        bgColor={"purple.100"}
                        variant={"solid"}
                        cursor={"pointer"}
                        px={3}
                        py={1}
                        height={"fit-content"}
                        onClick={() => {
                          if (tags.includes(tag)) {
                            dispatch(setTags(tags.filter((t) => t !== tag)));
                          } else {
                            dispatch(setTags([...tags, tag]));
                          }
                        }}
                      >
                        <Tag.Label fontSize={"md"}>{tag}</Tag.Label>
                      </Tag.Root>
                    ))}
                  </>
                )}
              </Flex>
              <TagsInput
                tags={tags}
                setTags={(payload) => dispatch(setTags(payload))}
              />
              <Flex
                justifyContent={"space-between"}
                width="full"
                alignItems={"center"}
                mt={4}
                mb={2}
              >
                <Text>Comment Response</Text>
                <Button
                  bgColor={"transparent"}
                  color={"gray.700"}
                  size={"lg"}
                  fontWeight={"bold"}
                  _hover={{ bg: "gray.100" }}
                  disabled={!tags.length}
                  onClick={() => handleAIResponse("comment")}
                  loading={loadingComment}
                  loadingText="Thinking..."
                >
                  <FaWandMagicSparkles />
                  Ask AI
                </Button>
              </Flex>
              <Textarea
                _focusWithin={{ borderColor: "gray.400" }}
                outline="none"
                placeholder="Write your response for comments here..."
                variant="outline"
                value={responseComment}
                onChange={(e) => dispatch(setResponseComment(e.target.value))}
                minHeight="60px"
                resize="vertical"
              />
              <Flex
                justifyContent={"space-between"}
                width="full"
                alignItems={"center"}
                mt={4}
                mb={2}
                visibility={mode ? "visible" : "hidden"}
              >
                <Text>DM Response</Text>
                <Button
                  bgColor={"transparent"}
                  color={"gray.700"}
                  size={"lg"}
                  fontWeight={"bold"}
                  _hover={{ bg: "gray.100" }}
                  disabled={!tags.length}
                  onClick={() => handleAIResponse("dm")}
                  loading={loadingDM}
                  loadingText="Thinking..."
                >
                  <FaWandMagicSparkles />
                  Ask AI
                </Button>
              </Flex>
              <Textarea
                _focusWithin={{ borderColor: "gray.400" }}
                outline="none"
                placeholder="Write your response for DMs here..."
                variant="outline"
                value={responseDM}
                onChange={(e) => dispatch(setResponseDM(e.target.value))}
                minHeight="60px"
                resize="vertical"
                visibility={mode ? "visible" : "hidden"}
              />
              <Tabs.Root
                mt={4}
                lazyMount
                unmountOnExit
                value={mode ? "comment+dm" : "comment-only"}
                size="sm"
                variant="plain"
                w="full"
                display="flex"
                flexDirection="column"
              >
                <Tabs.List
                  display="flex" // Use flexbox
                  w={"full"}
                  bg="bg.muted"
                  rounded="l3"
                  p="2"
                  bgColor={bgColor}
                  border="2px"
                  borderColor="gray.200"
                  borderStyle="solid"
                >
                  <Tabs.Trigger
                    value="comment-only"
                    fontWeight="bold"
                    _selected={{
                      color: "black",
                    }}
                    flex="1" // This makes the trigger expand to fill available space equally
                    justifyContent={"center"}
                    onClick={() => {
                      dispatch(setResponseDM(""));
                      dispatch(setMode(false));
                    }}
                  >
                    Comment Only
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    value="comment+dm"
                    fontWeight="bold"
                    _selected={{
                      color: "black",
                    }}
                    flex="1" // This makes the trigger expand to fill available space equally
                    justifyContent={"center"}
                    onClick={() => {
                      dispatch(setResponseDM(""));
                      dispatch(setMode(true));
                    }}
                  >
                    Comment + DM
                  </Tabs.Trigger>
                  <Tabs.Indicator rounded="l2" bgColor="gray.200" />
                </Tabs.List>
              </Tabs.Root>
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

export default TagManagement;
