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
    <div className="flex flex-col gap-6 p-4 md:p-6 bg-gray-50 dark:bg-gray-900">
      <ConfirmationPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        message={popupMessage}
        onConfirm={handleConfirmEdit}
      />
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Add/Edit Tag Form */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full lg:w-2/3 transition-colors duration-200">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            {editingId !== null
              ? "Edit Tag and Response"
              : "Add New Tag and Response"}
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Suggested Tags
              </label>
              <div className="flex flex-wrap gap-2 max-h-20 overflow-y-auto bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                {isTagsLoading ? (
                  <BarLoader color="#8B5CF6" width="100%" />
                ) : (
                  generatedTags?.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm font-medium text-purple-600 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/50 border border-purple-300 dark:border-purple-600 rounded-full cursor-pointer hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
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
            </div>
            <TagsInput
              tags={tags}
              setTags={(payload) => dispatch(setTags(payload))}
            />
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Comment Response
                </label>
                <button
                  className={`flex items-center gap-2 text-sm font-medium text-purple-600 dark:text-purple-300 hover:text-purple-800 dark:hover:text-purple-200 transition-colors ${
                    !tags.length ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => handleAIResponse("comment")}
                  disabled={!tags.length}
                >
                  {loadingComment ? (
                    <span>Generating...</span>
                  ) : (
                    <>
                      <FaWandMagicSparkles className="w-4 h-4" />
                      Generate with AI
                    </>
                  )}
                </button>
              </div>
              <textarea
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 outline-none transition-colors resize-y min-h-[80px]"
                placeholder="Write your response for comments here..."
                value={responseComment}
                onChange={(e) => dispatch(setResponseComment(e.target.value))}
              />
            </div>
            <div className={`${mode ? "" : "invisible"}`}>
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  DM Response
                </label>
                <button
                  className={`flex items-center gap-2 text-sm font-medium text-purple-600 dark:text-purple-300 hover:text-purple-800 dark:hover:text-purple-200 transition-colors ${
                    !tags.length ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => handleAIResponse("dm")}
                  disabled={!tags.length}
                >
                  {loadingDM ? (
                    <span>Generating...</span>
                  ) : (
                    <>
                      <FaWandMagicSparkles className="w-4 h-4" />
                      Generate with AI
                    </>
                  )}
                </button>
              </div>
              <textarea
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 outline-none transition-colors resize-y min-h-[80px]"
                placeholder="Write your response for DMs here..."
                value={responseDM}
                onChange={(e) => dispatch(setResponseDM(e.target.value))}
              />
            </div>
            <Tabs.Root
              value={mode ? "comment+dm" : "comment-only"}
              onValueChange={(value) => {
                dispatch(setResponseDM(""));
                dispatch(setMode(value === "comment+dm"));
              }}
              className="mt-4"
            >
              <Tabs.List className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1 border border-gray-200 dark:border-gray-600">
                <Tabs.Trigger
                  value="comment-only"
                  className="flex-1 text-center py-2 text-sm font-medium text-gray-600 dark:text-gray-300 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-gray-900 dark:data-[state=active]:text-gray-100 data-[state=active]:rounded-md transition-colors"
                >
                  Comment Only
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="comment+dm"
                  className="flex-1 text-center py-2 text-sm font-medium text-gray-600 dark:text-gray-300 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-gray-900 dark:data-[state=active]:text-gray-100 data-[state=active]:rounded-md transition-colors"
                >
                  Comment + DM
                </Tabs.Trigger>
              </Tabs.List>
            </Tabs.Root>
            <button
              className="w-full bg-purple-600 dark:bg-purple-500 text-white py-2.5 rounded-lg font-medium hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors flex items-center justify-center gap-2"
              onClick={handleAddOrUpdate}
            >
              <FiPlus className="w-5 h-5" />
              {editingId !== null
                ? "Update Tag & Response"
                : "Add Tag & Response"}
            </button>
          </div>
        </div>

        {/* Tags List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-full lg:w-1/3 transition-colors duration-200">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            Tags List
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">
                    Tags
                  </th>
                  <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {fields?.map((tag, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 dark:border-gray-700"
                  >
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-2">
                        {tag?.tags?.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-3">
                        <button
                          onClick={() => startEditing(tag, index)}
                          className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                        >
                          <FaRegEdit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => dispatch(removeField(index))}
                          className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                        >
                          <FiTrash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagManagement;
