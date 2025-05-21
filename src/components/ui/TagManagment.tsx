import { useState, useEffect } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { FiTrash2, FiPlus } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { toast } from "react-toastify";
import TagsInput from "../common/TagsInput";
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
      <div className="flex flex-col md:flex-row gap-4 w-full">
        {/* Add/Edit Tag Form */}
        <div className="bg-white rounded-lg shadow-md w-full md:w-1/2 xl:w-2/3 p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">
              {editingId !== null
                ? "Edit Tag and Response"
                : "Add New Tag and Response"}
            </h2>
          </div>
          <div className="mt-4">
            <div className="flex flex-col gap-2">
              <p className="text-lg font-medium mb-2">Suggested Tags</p>
              <div className="flex flex-wrap gap-2 h-[70px] overflow-y-auto w-full items-center">
                {isTagsLoading ? (
                  <BarLoader color="#6B46C1" width="100%" />
                ) : (
                  generatedTags?.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-md text-purple-600 bg-purple-100 border border-purple-300 rounded-full cursor-pointer hover:bg-purple-200"
                      onClick={() => {
                        if (tags.includes(tag)) {
                          dispatch(setTags(tags.filter((t) => t !== tag)));
                        } else {
                          dispatch(setTags([...tags, tag]));
                        }
                      }}
                    >
                      {tag}
                    </span>
                  ))
                )}
              </div>
              <TagsInput
                tags={tags}
                setTags={(payload) => dispatch(setTags(payload))}
              />
              <div className="flex justify-between items-center mt-4 mb-2">
                <p className="text-gray-700">Comment Response</p>
                <button
                  className={`flex items-center gap-2 text-gray-700 font-bold text-lg hover:bg-gray-100 px-3 py-1 rounded-md ${
                    !tags.length ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => handleAIResponse("comment")}
                  disabled={!tags.length}
                >
                  {loadingComment ? (
                    <span>Thinking...</span>
                  ) : (
                    <>
                      <FaWandMagicSparkles />
                      Ask AI
                    </>
                  )}
                </button>
              </div>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 resize-y min-h-[60px]"
                placeholder="Write your response for comments here..."
                value={responseComment}
                onChange={(e) => dispatch(setResponseComment(e.target.value))}
              />
              <div
                className={`flex justify-between items-center mt-4 mb-2 ${
                  mode ? "block" : "hidden"
                }`}
              >
                <p className="text-gray-700">DM Response</p>
                <button
                  className={`flex items-center gap-2 text-gray-700 font-bold text-lg hover:bg-gray-100 px-3 py-1 rounded-md ${
                    !tags.length ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => handleAIResponse("dm")}
                  disabled={!tags.length}
                >
                  {loadingDM ? (
                    <span>Thinking...</span>
                  ) : (
                    <>
                      <FaWandMagicSparkles />
                      Ask AI
                    </>
                  )}
                </button>
              </div>
              <textarea
                className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 resize-y min-h-[60px] ${
                  mode ? "block" : "hidden"
                }`}
                placeholder="Write your response for DMs here..."
                value={responseDM}
                onChange={(e) => dispatch(setResponseDM(e.target.value))}
              />
              <Tabs.Root
                value={mode ? "comment+dm" : "comment-only"}
                onValueChange={(value) => {
                  dispatch(setResponseDM(""));
                  dispatch(setMode(value === "comment+dm"));
                }}
                className="mt-4 w-full"
              >
                <Tabs.List className="flex w-full bg-gray-100 rounded-xl p-1 border-2 border-gray-200">
                  <Tabs.Trigger
                    value="comment-only"
                    className="flex-1 text-center py-2 font-bold text-gray-700 data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:rounded-lg"
                  >
                    Comment Only
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    value="comment+dm"
                    className="flex-1 text-center py-2 font-bold text-gray-700 data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:rounded-lg"
                  >
                    Comment + DM
                  </Tabs.Trigger>
                </Tabs.List>
              </Tabs.Root>
              <button
                className="mt-4 w-full bg-gray-100 text-gray-600 px-4 py-2 rounded-md border-2 border-gray-200 font-medium hover:bg-gray-200 flex items-center justify-center gap-2"
                onClick={handleAddOrUpdate}
              >
                <FiPlus size={20} />
                {editingId ? "Update Tag/Value" : "Add Tag/Value"}
              </button>
            </div>
          </div>
        </div>

        {/* Tags List */}
        <div className="bg-white rounded-lg shadow-md w-full md:w-1/2 xl:w-1/3 p-6">
          <h2 className="text-2xl font-bold">Tags List</h2>
          <div className="mt-4">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left p-3 text-gray-500 font-medium w-2/3">
                    Tags
                  </th>
                  <th className="text-left p-3 text-gray-500 font-medium w-1/3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {fields?.map((tag, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-3 font-bold w-2/3">
                      <div className="flex flex-wrap gap-2">
                        {tag?.tags?.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 text-xs text-gray-600 bg-gray-100 border border-gray-300 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-6 w-1/3">
                      <div className="flex gap-4">
                        <FaRegEdit
                          onClick={() => startEditing(tag, index)}
                          size={20}
                          className="cursor-pointer text-gray-600 hover:text-gray-800"
                        />
                        <FiTrash2
                          size={20}
                          onClick={() => dispatch(removeField(index))}
                          className="cursor-pointer text-gray-600 hover:text-gray-800"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default TagManagement;
