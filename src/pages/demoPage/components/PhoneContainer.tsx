import React, { useEffect, useRef } from 'react';
import './PhoneContainer.css';
import EmojiPicker from './EmojiPicker';
import { popularEmojis } from '../constants';

interface PhoneContainerProps {
    postImage: string | null;
    postCaption: string;
    currentUsername: string;
    isCaptionExpanded: boolean;
    isLiked: boolean;
    comments: any[];
    popupComment: string;
    validationError: string | null;
    showCommentEmojiPicker: boolean;
    onLikeClick: () => void;
    onCommentClick: () => void;
    onEmojiPickerToggle: () => void;
    onCommentSubmit: () => void;
    onCommentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onCaptionExpand: () => void;
    children?: React.ReactNode;
}

const PhoneContainer: React.FC<PhoneContainerProps> = ({
    postImage,
    postCaption,
    currentUsername,
    isCaptionExpanded,
    isLiked,
    comments,
    popupComment,
    validationError,
    showCommentEmojiPicker,
    onLikeClick,
    onCommentClick,
    onEmojiPickerToggle,
    onCommentSubmit,
    onCommentChange,
    onCaptionExpand,
    children
}) => {
    const emojiPickerRef = useRef<HTMLDivElement>(null);
    const inactivityTimeoutRef = useRef<number | null>(null);

    const handleEmojiSelect = (emoji: string) => {
        onCommentChange({
            target: { value: popupComment + emoji }
        } as React.ChangeEvent<HTMLInputElement>);
        // Reset inactivity timer when emoji is selected
        resetInactivityTimer();
    };

    const resetInactivityTimer = () => {
        if (inactivityTimeoutRef.current !== null) {
            clearTimeout(inactivityTimeoutRef.current);
        }
        // Close emoji picker after 5 seconds of inactivity
        inactivityTimeoutRef.current = window.setTimeout(() => {
            if (showCommentEmojiPicker) {
                onEmojiPickerToggle();
            }
        }, 5000);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
                if (showCommentEmojiPicker) {
                    onEmojiPickerToggle();
                }
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && showCommentEmojiPicker) {
                onEmojiPickerToggle();
            }
        };

        if (showCommentEmojiPicker) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleKeyDown);
            // Start inactivity timer when picker opens
            resetInactivityTimer();
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
            if (inactivityTimeoutRef.current !== null) {
                clearTimeout(inactivityTimeoutRef.current);
            }
        };
    }, [showCommentEmojiPicker, onEmojiPickerToggle]);

    return (
        <div className="phone-container">
            {/* Volume up button */}
            <div className="volume-up-button"></div>

            {/* Volume down button */}
            <div className="volume-down-button"></div>

            {/* Power button */}
            <div className="power-button"></div>

            <div className="phone-frame">
                {/* Phone status bar */}
                <div className="phone-status-bar">
                    <div className="status-bar-notch"></div>
                </div>

                <div className="phone-screen">
                    {/* Status bar */}
                    <div className="status-bar">
                        <div>9:45 AM</div>
                        <div className="status-icons">
                            <div className="signal-icon">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.6">
                                    <path d="M23 6v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2z"></path>
                                    <path d="M12 6v12"></path>
                                    <path d="M17 6v12"></path>
                                    <path d="M7 6v12"></path>
                                </svg>
                            </div>
                            <div className="battery-icon">
                                <span>100%</span>
                                <svg width="20" height="20" viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg" fill="currentColor" fillOpacity="0.8">
                                    <path d="M464 160c8.8 0 16 7.2 16 16l0 160c0 8.8-7.2 16-16 16L80 352c-8.8 0-16-7.2-16-16l0-160c0-8.8 7.2-16 16-16l384 0zM80 96C35.8 96 0 131.8 0 176L0 336c0 44.2 35.8 80 80 80l384 0c44.2 0 80-35.8 80-80l0-16c17.7 0 32-14.3 32-32l0-64c0-17.7-14.3-32-32-32l0-16c0-44.2-35.8-80-80-80L80 96zm272 96L96 192l0 128 256 0 0-128z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Image content */}
                    <div className="image-container">
                        {postImage ? (
                            <img src={postImage} alt="Post preview" className="post-image" />
                        ) : (
                            <div className="default-image">
                                <img
                                    src="https://images.pexels.com/photos/11579630/pexels-photo-11579630.jpeg"
                                    alt="Post preview"
                                    className="post-image"
                                />
                            </div>
                        )}

                        {/* User info overlay */}
                        <div className="user-info-overlay">
                            <div className="user-avatar">
                                {currentUsername.charAt(0).toUpperCase()}
                            </div>
                            <div className="user-details">
                                <div className="username">{currentUsername}</div>
                                <div className="caption-container">
                                    <div className={`caption ${isCaptionExpanded ? 'expanded' : ''}`}>
                                        {postCaption}
                                        {postCaption.length > 30 && (
                                            <button
                                                className="expand-button"
                                                onClick={onCaptionExpand}
                                            >
                                                {isCaptionExpanded ? 'Less' : 'More'}
                                                <svg
                                                    width="12"
                                                    height="12"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    className={isCaptionExpanded ? 'rotated' : ''}
                                                >
                                                    <polyline points="6 9 12 15 18 9"></polyline>
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div className="action-buttons">
                            <div className="action-button" onClick={onLikeClick}>
                                <svg
                                    className={`like-icon ${isLiked ? 'liked' : ''}`}
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                >
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                </svg>
                                <span className="action-count">{isLiked ? "1.3k+" : "1.3k"}</span>
                            </div>

                            <div className="action-button" onClick={onCommentClick}>
                                <svg
                                    className="comment-icon"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                >
                                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                                </svg>
                                <span className="action-count">{comments.length}</span>
                            </div>
                        </div>

                        {/* Comment input */}
                        <div className="comment-input-container">
                            <div className="emoji-picker-button" onClick={onEmojiPickerToggle}>
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className={showCommentEmojiPicker ? 'active' : ''}
                                >
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                                    <line x1="9" y1="9" x2="9.01" y2="9"></line>
                                    <line x1="15" y1="9" x2="15.01" y2="9"></line>
                                </svg>
                                <div ref={emojiPickerRef}>
                                    <EmojiPicker
                                        showPicker={showCommentEmojiPicker}
                                        onEmojiSelect={handleEmojiSelect}
                                        popularEmojis={popularEmojis}
                                    />
                                </div>
                            </div>
                            <input
                                type="text"
                                placeholder="Add a comment..."
                                className="comment-input"
                                value={popupComment}
                                onChange={onCommentChange}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        onCommentSubmit();
                                        onCommentClick();
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }
                                }}
                            />
                            {validationError && (
                                <div className="validation-error">
                                    {validationError}
                                </div>
                            )}
                            <button className="submit-button" onClick={() => {
                                onCommentSubmit();
                                onCommentClick();
                            }}>
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M22 2L11 13"></path>
                                    <path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Render children (comment popup) */}
                    {children}
                </div>
            </div>
        </div>
    );
};

export default PhoneContainer; 