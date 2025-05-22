import { useState, useRef } from "react";
import { X } from "lucide-react";

interface TagsInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
}

const TagsInput = ({ tags, setTags }: TagsInputProps) => {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input) {
      e.preventDefault();
      if (!tags.includes(input.trim()) && input.trim() !== "") {
        setTags([...tags, input.trim()]);
        setInput("");
      }
    }
  };

  const handleRemove = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div
      className="flex flex-wrap gap-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-3 text-sm transition-colors duration-200 focus-within:ring-2 focus-within:ring-purple-500 dark:focus:ring-purple-400 focus-within:ring-offset-2 focus-within:ring-offset-white dark:focus-within:ring-offset-gray-900 mt-2"
      onClick={focusInput}
    >
      {tags.map((tag) => (
        <div
          key={tag}
          className="flex items-center gap-1 rounded-full bg-purple-100 dark:bg-purple-900/50 px-3 py-1.5 text-purple-600 dark:text-purple-300 border border-purple-300 dark:border-purple-600"
        >
          <span className="text-sm font-medium">{tag}</span>
          <button
            type="button"
            onClick={() => handleRemove(tag)}
            className="ml-1 rounded-full hover:bg-purple-200 dark:hover:bg-purple-800 p-1 transition-colors"
            aria-label={`Remove ${tag} tag`}
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={tags.length ? "Add more tags..." : "Add tags..."}
        className="flex-grow border-none bg-transparent outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-gray-100 focus:ring-0 transition-colors"
      />
    </div>
  );
};

export default TagsInput;
