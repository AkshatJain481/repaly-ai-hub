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
              <TagsInput
                tags={tags}
                setTags={(payload) => dispatch(setTags(payload))}
              />
              <p className="mt-4 mb-2 text-gray-700">DM Response</p>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 resize-y min-h-[60px]"
                placeholder="Write your response for the DM here..."
                value={responseDM}
                onChange={(e) => dispatch(setResponse(e.target.value))}
              />
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

export default StoryTagManagement;
