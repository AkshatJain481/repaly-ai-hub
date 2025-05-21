import React from 'react';

interface EmojiPickerProps {
    showPicker: boolean;
    onEmojiSelect: (emoji: string) => void;
    popularEmojis: string[];
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ showPicker, onEmojiSelect, popularEmojis }) => {
    const handleEmojiButtonMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        target.classList.add("bg-gray-200", "scale-110");
    };

    const handleEmojiButtonMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        target.classList.remove("bg-gray-200", "scale-110");
    };

    if (!showPicker) return null;

    return (
        <div className="emoji-picker">
            {popularEmojis.map((emoji, index) => (
                <div
                    key={index}
                    className="emoji-button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onEmojiSelect(emoji);
                    }}
                    onMouseEnter={handleEmojiButtonMouseEnter}
                    onMouseLeave={handleEmojiButtonMouseLeave}
                >
                    {emoji}
                </div>
            ))}
        </div>
    );
};

export default EmojiPicker;
