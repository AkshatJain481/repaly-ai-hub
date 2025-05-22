import { useState, useEffect } from "react";
import { FiTrash2, FiPlus } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import { toast } from "react-toastify";
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
import { Button } from "./button";

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
      <div className="flex flex-col md:flex-row gap-6 w-full">
        {/* Add/Edit Tag Form */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600 transition-colors duration-200 w-full md:w-2/3 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {editingId !== null
              ? "Edit Tag and Response"
              : "Add New Tag and Response"}
          </h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Tags
              </label>
              <TagsInput
                tags={tags}
                setTags={(payload) => dispatch(setTags(payload))}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                DM Response
              </label>
              <textarea
                className="w-full mt-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 outline-none transition-colors resize-y min-h-[80px] text-sm"
                placeholder="Write your response for the DM here..."
                value={responseDM}
                onChange={(e) => dispatch(setResponse(e.target.value))}
              />
            </div>
            <Button
              className="w-full px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 outline-none transition-colors flex items-center justify-center gap-2"
              onClick={handleAddOrUpdate}
            >
              <FiPlus className="w-5 h-5" />
              {editingId !== null
                ? "Update Tag & Response"
                : "Add Tag & Response"}
            </Button>
          </div>
        </div>

        {/* Tags List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600 transition-colors duration-200 w-full md:w-1/3 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Tags List
          </h2>
          <div className="mt-4">
            {fields.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                No tags added yet
              </p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left p-3 text-gray-500 dark:text-gray-400 font-medium w-2/3">
                      Tags
                    </th>
                    <th className="text-left p-3 text-gray-500 dark:text-gray-400 font-medium w-1/3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {fields?.map((tag, index) => (
                    <tr
                      key={index}
                      className="border-t border-gray-200 dark:border-gray-600"
                    >
                      <td className="p-3 font-medium text-gray-900 dark:text-gray-100 w-2/3">
                        <div className="flex flex-wrap gap-2">
                          {tag?.tags?.map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 text-xs text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-3 w-1/3">
                        <div className="flex gap-4">
                          <FaRegEdit
                            onClick={() => startEditing(tag, index)}
                            className="w-5 h-5 cursor-pointer text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
                          />
                          <FiTrash2
                            onClick={() => dispatch(removeField(index))}
                            className="w-5 h-5 cursor-pointer text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default StoryTagManagement;
