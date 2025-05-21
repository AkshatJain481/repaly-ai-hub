
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
      className="flex flex-wrap gap-2 rounded-md border border-input p-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
      onClick={focusInput}
    >
      {tags.map((tag) => (
        <div
          key={tag}
          className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-primary"
        >
          <span>{tag}</span>
          <button 
            type="button" 
            onClick={() => handleRemove(tag)}
            className="ml-1 rounded-full hover:bg-primary/20 p-1"
          >
            <X className="h-3 w-3" />
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
        className="flex-grow border-none bg-transparent outline-none placeholder:text-muted-foreground"
      />
    </div>
  );
};

export default TagsInput;
