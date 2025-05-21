"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import type {
  ResponseStyleOption,
  ResponseStyleConfig,
  Comment,
  Reply,
  CreatePostData,
  TourStep,
} from "./types";
import {
  botResponses,
  questionResponses,
  responseStyles,
  createPostSteps,
} from "./constants";
import "./DemoPage.css";
import PhoneContainer from "./components/PhoneContainer";
import TourGuide from "./components/TourGuide";

const DemoPage: React.FC = () => {
  // State for the message input and image
  const [postImage, setPostImage] = useState<string | null>(null);
  const [hoveredEmoji, setHoveredEmoji] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string>(
    "https://images.pexels.com/photos/11579630/pexels-photo-11579630.jpeg"
  );

  // State for liked status
  const [isLiked, setIsLiked] = useState<boolean>(false);

  // Add state for emoji picker
  const [showCommentEmojiPicker, setShowCommentEmojiPicker] =
    useState<boolean>(false);

  // Add state for automation applied
  const [isLoadingResponse, setIsLoadingResponse] = useState<boolean>(false);
  const [loadingCommentId, setLoadingCommentId] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  // State for response style options
  const [responseStylesState, setResponseStylesState] =
    useState<ResponseStyleConfig[]>(responseStyles);

  // State for mobile view
  const [isMobileView, setIsMobileView] = useState<boolean>(false);

  // State for comment popup
  const [showCommentPopup, setShowCommentPopup] = useState<boolean>(() => {
    return window.innerWidth < 762;
  });
  const [popupComment, setPopupComment] = useState<string>("");

  // State for comments
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      username: "dog_lover",
      text: "What a beautiful dog! 🐕 The grass looks so perfect for walking!",
      timestamp: "2 hours ago",
      replies: [
        {
          id: "1-1",
          username: "fitness_co",
          text: "Thank you! Yes, it's a perfect spot for our daily walks! The grass is so lush and comfortable for the pups. 🌿",
          timestamp: "1 hour ago",
          isBot: true,
          userImage: "http://placebeard.it/250/250",
        },
      ],
    },
    {
      id: "2",
      username: "pet_walker",
      text: "Is this a specific breed? They look so well-trained!",
      timestamp: "1 hour ago",
      replies: [
        {
          id: "2-1",
          username: "fitness_co",
          text: "This is a Golden Retriever! They're known for their friendly nature and intelligence. We've been working on training for about 6 months now! 🐾",
          timestamp: "45 minutes ago",
          isBot: true,
          userImage: "https://i.pravatar.cc/250?u=mail@ashallendesign.co.uk",
        },
      ],
    },
    {
      id: "3",
      username: "nature_enthusiast",
      text: "The lighting in this photo is amazing! Perfect golden hour shot! ✨",
      timestamp: "30 minutes ago",
      replies: [
        {
          id: "3-1",
          username: "fitness_co",
          text: "Thank you! We love taking our walks during golden hour - it makes everything look magical! 🌅",
          timestamp: "15 minutes ago",
          isBot: true,
          userImage: "https://example.com/bot-avatar.png",
        },
      ],
    },
  ]);
  const [lastAddedCommentId, setLastAddedCommentId] = useState<string | null>(
    null
  );

  // State for create post modal
  const [showCreatePost, setShowCreatePost] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [createPostData, setCreatePostData] = useState<CreatePostData>({
    image: null,
    caption: "",
  });
  const [isDraggingImage, setIsDraggingImage] = useState<boolean>(false);
  const [postCaption, setPostCaption] = useState<string>(
    "A Dog Walking on the Grass"
  );
  const [isCaptionExpanded, setIsCaptionExpanded] = useState<boolean>(false);
  const [currentUsername, setCurrentUsername] =
    useState<string>("doggy_sitter");

  // Add these state variables inside the DemoPage component, after the other state declarations
  const [showTour, setShowTour] = useState<boolean>(false);
  const [tourStep, setTourStep] = useState<number>(0);
  const [hasCreatedPost, setHasCreatedPost] = useState<boolean>(false);

  // Refs
  const commentsContainerRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const createPostButtonRef = useRef<HTMLButtonElement>(null);

  // 1. Mobile view check
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 2. Scroll to new comment
  useEffect(() => {
    if (lastAddedCommentId && commentsContainerRef.current) {
      const commentElements =
        commentsContainerRef.current.querySelectorAll("[data-comment-id]");
      const newCommentElement = Array.from(commentElements).find(
        (el) => el.getAttribute("data-comment-id") === lastAddedCommentId
      ) as HTMLElement | undefined;

      if (newCommentElement) {
        newCommentElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        newCommentElement.style.animation = "none";
        void newCommentElement.offsetWidth;
        newCommentElement.style.animation =
          "highlightNewComment 1.5s ease-in-out";
        newCommentElement.classList.add("pulse-comment");

        setTimeout(() => {
          newCommentElement.classList.remove("pulse-comment");
          setLastAddedCommentId(null);
        }, 1500);
      }
    }
  }, [lastAddedCommentId]);

  // 3. Scroll to loading comment
  useEffect(() => {
    if (loadingCommentId && commentsContainerRef.current) {
      const commentElements =
        commentsContainerRef.current.querySelectorAll("[data-comment-id]");
      const targetComment = Array.from(commentElements).find(
        (el) => el.getAttribute("data-comment-id") === loadingCommentId
      ) as HTMLElement | undefined;

      if (targetComment) {
        targetComment.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [loadingCommentId]);

  // Add useEffect to handle initial image upload
  useEffect(() => {
    const uploadDefaultImage = async () => {
      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();

        const formData = new FormData();
        formData.append("file", blob);
        formData.append("upload_preset", "arswsayq");
        formData.append("api_key", "745174257167975");

        const uploadResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/dteqrwrr3/image/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setImageUrl(uploadResponse.data.secure_url);
      } catch (error) {
        console.error("Error uploading default image:", error);
      }
    };

    uploadDefaultImage();
  }, []);

  // Add this useEffect hook after the other useEffect hooks
  useEffect(() => {
    // Check if this is the user's first visit
    const hasSeenTour = localStorage.getItem("hasSeenTour");
    if (!hasSeenTour) {
      // Wait a moment before showing the tour
      const timer = setTimeout(() => {
        setShowTour(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Add this useEffect to handle tour step progression
  useEffect(() => {
    if (showTour && tourStep === 1 && showCreatePost) {
      // If we're on step 1 (create post) and the create post modal is shown, move to step 2
      setTourStep(2);
    }

    if (showTour && tourStep === 2 && hasCreatedPost) {
      // If we're on step 2 (choose style) and user has created a post, move to step 3
      setTourStep(3);
    }
  }, [showCreatePost, hasCreatedPost, showTour, tourStep]);

  // Function to handle image upload
  const handleImageUpload = async (image: string) => {
    try {
      const response = await fetch(image);
      const blob = await response.blob();

      const formData = new FormData();
      formData.append("file", blob);
      formData.append("upload_preset", "arswsayq");
      formData.append("api_key", "745174257167975");

      const uploadResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dteqrwrr3/image/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setImageUrl(uploadResponse.data.secure_url);
      return uploadResponse.data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return image; // Fallback to original image if upload fails
    }
  };

  // Function to handle response style selection
  const handleResponseStyleChange = (selectedLabel: ResponseStyleOption) => {
    setResponseStylesState((prev) =>
      prev.map((style) =>
        style.label === selectedLabel
          ? { ...style, selected: true }
          : { ...style, selected: false }
      )
    );

    // If we're on the tour and on step 2, move to step 3 after selecting a style
    if (showTour && tourStep === 2) {
      setTimeout(() => {
        setTourStep(3);
      }, 500);
    }
  };

  // Function to get a random response based on style and whether it's a question
  const getRandomResponse = (isQuestion: boolean): string => {
    const selectedStyle =
      responseStylesState.find((s) => s.selected)?.label || "Friendly";

    if (isQuestion) {
      const responses = questionResponses[selectedStyle];
      return responses[Math.floor(Math.random() * responses.length)];
    } else {
      const responses = botResponses[selectedStyle];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  };

  // Function to generate a bot reply based on the comment and selected style
  const generateBotReply = async (comment: Comment) => {
    try {
      setIsLoadingResponse(true);
      setLoadingCommentId(comment.id);

      // Prepare the request body using the stored imageUrl
      const requestBody = {
        image_url: imageUrl,
        comment: comment.text,
        caption: postCaption || "A Dog Walking on the Grass",
        mood: responseStylesState.find((s) => s.selected)?.label || "Friendly",
      };

      const url = "https://pgc23a4iil.execute-api.us-east-1.amazonaws.com/influex/demo-reply"
      const response = await axios.post(url, requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Create bot reply
      const newReply: Reply = {
        id: `${comment.id}-${Date.now()}`,
        username: "fitness_co",
        text:
          response.data.reply ||
          response.data.message ||
          response.data.text ||
          getRandomResponse(comment.isQuestion || false),
        timestamp: "Just now",
        isBot: true,
        userImage: "https://example.com/bot-avatar.png",
      };

      // Update comments with the new reply
      setComments((prevComments) =>
        prevComments.map((c) =>
          c.id === comment.id
            ? { ...c, replies: [...(c.replies || []), newReply] }
            : c
        )
      );

      // Set the last added comment ID to trigger focus animation
      setLastAddedCommentId(comment.id);

      return newReply;
    } catch (error) {
      // Fallback to random response if API fails
      const fallbackReply: Reply = {
        id: `${comment.id}-${Date.now()}`,
        username: "fitness_co",
        text: getRandomResponse(comment.isQuestion || false),
        timestamp: "Just now",
        isBot: true,
        userImage: "https://example.com/bot-avatar.png",
      };

      setComments((prevComments) =>
        prevComments.map((c) =>
          c.id === comment.id
            ? { ...c, replies: [...(c.replies || []), fallbackReply] }
            : c
        )
      );

      // Set the last added comment ID to trigger focus animation even for fallback
      setLastAddedCommentId(comment.id);

      return fallbackReply;
    } finally {
      setIsLoadingResponse(false);
      setLoadingCommentId(null);
    }
  };

  // Function to toggle comment popup
  const toggleCommentPopup = () => {
    setShowCommentPopup((prev: any) => {
      const newState = !prev;
      localStorage.setItem("showCommentPopup", JSON.stringify(newState));
      return newState;
    });

    if (!showCommentPopup) {
      setPopupComment(""); // Reset comment input when closing
    }
  };

  // Function to add comment from popup
  const addCommentFromPopup = () => {
    setValidationError(null);

    if (!popupComment.trim()) {
      setValidationError("Comment cannot be empty");
      return;
    }

    if (popupComment.length > 300) {
      setValidationError("Comment is too long (maximum 300 characters)");
      return;
    }

    const newCommentId = `${Date.now()}`;
    const newComment: Comment = {
      id: newCommentId,
      username: "new_user",
      text: popupComment,
      timestamp: "Just now",
      replies: [],
    };

    setComments((prev) => [...prev, newComment]);
    setPopupComment("");
    setLastAddedCommentId(newCommentId);

    generateBotReply(newComment);
    toast.success("Comment added successfully!");

    // If we're on the tour and on step 0 or 3, move to the next step after adding a comment
    if (showTour) {
      if (tourStep === 0) {
        setTimeout(() => {
          setTourStep(1);
        }, 1000);
      } else if (tourStep === 3) {
        setTimeout(() => {
          handleTourComplete();
        }, 1000);
      }
    }
  };

  // Add this function after the other functions
  const handleTourComplete = () => {
    setShowTour(false);
    localStorage.setItem("hasSeenTour", "true");
  };

  // Add this function after the handleTourComplete function
  const handleTourClose = () => {
    setShowTour(false);
    localStorage.setItem("hasSeenTour", "true");
  };

  // Get the selected options
  const selectedStyle =
    responseStylesState.find((style) => style.selected)?.label || "Friendly";

  // Create post functions
  const handleCreatePostClick = () => {
    setShowCreatePost(true);
    setCurrentStep(1);
    setCreatePostData({ image: null, caption: "" });
  };

  const handleCloseCreatePost = () => {
    setShowCreatePost(false);
    setCurrentStep(1);
    setCreatePostData({ image: null, caption: "" });
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCreatePostData((prev) => ({
          ...prev,
          image: e.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingImage(true);
  };

  const handleImageDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingImage(false);
  };

  const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingImage(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCreatePostData((prev) => ({
          ...prev,
          image: e.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNextStep = () => {
    if (currentStep === 1 && createPostData.image) {
      setCurrentStep(2);
    }
  };

  const handlePrevStep = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  const handleCaptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCreatePostData((prev) => ({ ...prev, caption: e.target.value }));
  };

  // Update the handleCreatePost function
  const handleCreatePost = async () => {
    if (!createPostData.image) {
      toast.error("Please upload an image first");
      return;
    }

    if (!createPostData.caption.trim()) {
      toast.error("Please add a caption");
      return;
    }

    const uploadedImageUrl = await handleImageUpload(createPostData.image);
    setPostImage(uploadedImageUrl);
    setPostCaption(createPostData.caption);
    setCurrentUsername("new_user");
    setShowCreatePost(false);
    setCreatePostData({ image: null, caption: "" });
    setComments([]);
    setHasCreatedPost(true);
    toast.success("Post created successfully!");
  };

  // Add function to toggle caption expansion
  const toggleCaptionExpansion = () => {
    setIsCaptionExpanded(!isCaptionExpanded);
  };

  // Add this constant after the other constants
  const tourSteps: TourStep[] = [
    {
      target: ".comment-input-container",
      title: "Step 1: Add a Comment",
      content:
        "Start by adding a comment to see how the AI responds automatically.",
      position: "top",
    },
    {
      target: ".create-post-button",
      title: "Step 2: Create Your Post",
      content:
        "Upload your own image and add a caption to personalize your content.",
      position: "bottom",
    },
    {
      target: ".response-styles-grid",
      title: "Step 3: Choose Response Style",
      content:
        "Select a style that matches your brand's voice and personality.",
      position: "left",
    },
    {
      target: ".comment-input-container",
      title: "Step 4: Try Your AI Assistant",
      content: "Add a comment to your post to see your AI assistant in action!",
      position: "top",
    },
  ];

  const handleHelpClick = () => {
    setShowTour(true);
  };

  return (
    <div className="main-container">
      <button
        className="help-button"
        onClick={handleHelpClick}
        title="Start Tour"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Help / Question Icon</title>
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 8a2 2 0 1 1 2 2c-1 0-2 .5-2 2v1"></path>
          <line x1="12" y1="17" x2="12" y2="17.01"></line>
        </svg>
      </button>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="content-container">
        {/* Left Panel - Instagram Preview */}
        <div style={{ flex: "1" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              marginBottom: "4rem",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#f3f4f6",
                borderRadius: "0.75rem",
                padding: "0.25rem",
                position: "absolute",
                top: "0rem",
                right: "0rem",
                zIndex: "5",
              }}
            >
              <button
                ref={createPostButtonRef}
                style={{
                  maxWidth: "127px",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.5rem",
                  fontSize: "0.875rem",
                  background: "linear-gradient(to right, #9b87f5, #3e83f6)",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 10px rgba(62, 131, 246, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  marginRight: "0rem",
                }}
                onClick={handleCreatePostClick}
                className="create-post-button"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Create Post
              </button>
            </div>
          </div>

          {/* Create Post Modal */}
          {showCreatePost && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
                animation: "fadeIn 0.3s ease",
              }}
            >
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "1rem",
                  width: "90%",
                  maxWidth: "600px",
                  maxHeight: "90vh",
                  overflow: "auto",
                  position: "relative",
                  animation: "slideUp 0.3s ease",
                }}
              >
                {/* Close button */}
                <button
                  onClick={handleCloseCreatePost}
                  style={{
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "0.5rem",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background-color 0.2s ease",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>

                {/* Step indicator */}
                <div
                  style={{
                    padding: "1.5rem",
                    borderBottom: "1px solid #e5e7eb",
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  {createPostSteps.map((step) => (
                    <div
                      key={step.step}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.3rem",
                      }}
                    >
                      <div
                        style={{
                          width: "24px",
                          height: "24px",
                          borderRadius: "100%",
                          background:
                            currentStep === step.step
                              ? "linear-gradient(to right, #9b87f5, rgb(7, 55, 138))"
                              : "grey",
                          color: "white",
                          border: "2px solid grey",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.875rem",
                        }}
                      >
                        {step.step}
                      </div>

                      <div>
                        <div style={{ fontWeight: "500" }}>{step.title}</div>
                        <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                          {step.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Step content */}
                <div style={{ padding: "1.5rem" }}>
                  {currentStep === 1 ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          height: "300px",
                          border: `2px dashed ${isDraggingImage ? "#3e83f6" : "#e5e7eb"}`,
                          borderRadius: "0.5rem",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          backgroundColor: isDraggingImage
                            ? "#f0f9ff"
                            : "white",
                        }}
                        onClick={() => imageInputRef.current?.click()}
                        onDragOver={handleImageDragOver}
                        onDragLeave={handleImageDragLeave}
                        onDrop={handleImageDrop}
                      >
                        {createPostData.image ? (
                          <img
                            src={createPostData.image || "/placeholder.svg"}
                            alt="Selected"
                            style={{
                              maxWidth: "100%",
                              maxHeight: "100%",
                              objectFit: "contain",
                            }}
                          />
                        ) : (
                          <>
                            <svg
                              width="48"
                              height="48"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1"
                              style={{ color: "#9ca3af" }}
                            >
                              <rect
                                x="3"
                                y="3"
                                width="18"
                                height="18"
                                rx="2"
                                ry="2"
                              ></rect>
                              <circle cx="8.5" cy="8.5" r="1.5"></circle>
                              <polyline points="21 15 16 10 5 21"></polyline>
                            </svg>
                            <p
                              style={{
                                fontSize: "0.875rem",
                                fontWeight: "500",
                                color: "#4b5563",
                                marginTop: "0.5rem",
                              }}
                            >
                              Click to upload or drag and drop
                            </p>
                            <p
                              style={{ fontSize: "0.75rem", color: "#6b7280" }}
                            >
                              Supports: JPG, PNG, GIF (Max 5MB)
                            </p>
                          </>
                        )}
                      </div>
                      <input
                        type="file"
                        ref={imageInputRef}
                        style={{ display: "none" }}
                        accept="image/*"
                        onChange={handleImageSelect}
                      />
                      <button
                        onClick={handleNextStep}
                        disabled={!createPostData.image}
                        style={{
                          padding: "0.75rem 1.5rem",
                          borderRadius: "0.5rem",
                          background: createPostData.image
                            ? "linear-gradient(to right, #9b87f5, #3e83f6)"
                            : "#e5e7eb",
                          color: "white",
                          border: "none",
                          cursor: createPostData.image
                            ? "pointer"
                            : "not-allowed",
                          transition: "all 0.3s ease",
                        }}
                      >
                        Next
                      </button>
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          height: "300px",
                          border: "1px solid #e5e7eb",
                          borderRadius: "0.5rem",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={createPostData.image || ""}
                          alt="Post preview"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <textarea
                        value={createPostData.caption}
                        onChange={handleCaptionChange}
                        placeholder="Write a caption..."
                        style={{
                          width: "100%",
                          height: "100px",
                          padding: "0.75rem",
                          borderRadius: "0.5rem",
                          border: "1px solid #e5e7eb",
                          resize: "none",
                          fontSize: "0.875rem",
                        }}
                      />
                      <div
                        style={{
                          display: "flex",
                          gap: "1rem",
                        }}
                      >
                        <button
                          onClick={handlePrevStep}
                          style={{
                            padding: "0.75rem 1.5rem",
                            borderRadius: "0.5rem",
                            background: "#f3f4f6",
                            color: "#4b5563",
                            border: "none",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                          }}
                        >
                          Back
                        </button>
                        <button
                          onClick={handleCreatePost}
                          style={{
                            padding: "0.75rem 1.5rem",
                            borderRadius: "0.5rem",
                            background:
                              "linear-gradient(to right, #9b87f5, #3e83f6)",
                            color: "white",
                            border: "none",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                          }}
                        >
                          Create Post
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Phone container and its content */}
          <PhoneContainer
            postImage={postImage}
            postCaption={postCaption}
            currentUsername={currentUsername}
            isCaptionExpanded={isCaptionExpanded}
            isLiked={isLiked}
            comments={comments}
            popupComment={popupComment}
            validationError={validationError}
            showCommentEmojiPicker={showCommentEmojiPicker}
            onLikeClick={() => setIsLiked(!isLiked)}
            onCommentClick={toggleCommentPopup}
            onEmojiPickerToggle={() =>
              setShowCommentEmojiPicker(!showCommentEmojiPicker)
            }
            onCommentSubmit={addCommentFromPopup}
            onCommentChange={(e) => setPopupComment(e.target.value)}
            onCaptionExpand={toggleCaptionExpansion}
          >
            {showCommentPopup && (
              <div className="comment-popup-enter">
                {/* Comment popup content */}
                <div className="comment-popup-header">
                  <div className="comment-popup-title">Comments</div>
                  <button className="close-button" onClick={toggleCommentPopup}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
                <div ref={commentsContainerRef} className="comments-list">
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      data-comment-id={comment.id}
                      className="comment-item"
                    >
                      {/* Comment content */}
                      <div className="comment-header">
                        <div className="comment-avatar">
                          {comment.username.charAt(0).toUpperCase()}
                        </div>
                        <div className="comment-info">
                          <div className="comment-username">
                            {comment.username}
                          </div>
                          <div className="comment-timestamp">
                            {comment.timestamp}
                          </div>
                        </div>
                      </div>
                      <div className="comment-text">{comment.text}</div>
                      {/* Replies section */}
                      {comment.replies && comment.replies.length > 0 && (
                        <div className="replies-section">
                          {comment.replies.map((reply) => (
                            <div
                              key={reply.id}
                              data-reply-id={reply.id}
                              className={`reply-item ${reply.isBot ? "bot-reply" : ""}`}
                            >
                              <div className="reply-header">
                                <div
                                  className={`reply-avatar ${reply.isBot ? "bot-avatar" : ""}`}
                                >
                                  {reply.username.charAt(0).toUpperCase()}
                                </div>
                                <div className="reply-info">
                                  <div className="reply-username">
                                    {reply.username}
                                    {reply.isBot && (
                                      <span className="bot-badge">INFLUEX</span>
                                    )}
                                  </div>
                                  <div className="reply-timestamp">
                                    {reply.timestamp}
                                  </div>
                                </div>
                              </div>
                              <div className="reply-text">{reply.text}</div>
                            </div>
                          ))}
                        </div>
                      )}
                      {/* Loading indicator */}
                      {isLoadingResponse && loadingCommentId === comment.id && (
                        <div className="loading-indicator">
                          <div className="loading-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                          </div>
                          <span>Repaly is typing...</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {/* Comment input in popup */}
                <div className="comment-input-popup">
                  <div
                    className="emoji-picker-button"
                    onClick={() =>
                      setShowCommentEmojiPicker(!showCommentEmojiPicker)
                    }
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={showCommentEmojiPicker ? "active" : ""}
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                      <line x1="9" y1="9" x2="9.01" y2="9"></line>
                      <line x1="15" y1="9" x2="15.01" y2="9"></line>
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="comment-input"
                    value={popupComment}
                    onChange={(e) => setPopupComment(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        addCommentFromPopup();
                      }
                    }}
                  />
                  {validationError && (
                    <div className="validation-error">{validationError}</div>
                  )}
                  <button
                    className="submit-button"
                    onClick={addCommentFromPopup}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 2L11 13"></path>
                      <path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </PhoneContainer>
        </div>

        {/* Right Panel - Automation Tool */}
        <div className="settings-panel">
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "0.75rem",
              boxShadow:
                "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 5px 10px -5px rgba(0, 0, 0, 0.05)",
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              height: "100%",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "6px",
                background: "linear-gradient(to right, #9b87f5, #3e83f6)",
              }}
            />
            <div
              style={{
                fontSize: "1.3rem",
                fontWeight: "bold",
                marginBottom: "1.5rem",
                background: "linear-gradient(to right, #9b87f5, #3e83f6)",
                WebkitBackgroundClip: "text",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ WebkitTextFillColor: "transparent" }}>
                Comment Management
              </span>
              <div
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <span
                  style={{
                    fontSize: "0.75rem",
                    backgroundColor: "#dcfce7",
                    color: "#166534",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "9999px",
                  }}
                >
                  Activated
                </span>
              </div>
            </div>

            <>
              {/* Response style section with emoticons */}
              <div style={{ marginBottom: "1.5rem" }}>
                <h3
                  style={{
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                    fontSize: "1rem",
                  }}
                >
                  Response Style
                </h3>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "#6b7280",
                    marginBottom: "1rem",
                  }}
                >
                  Choose how your AI assistant should respond to comments.
                </p>

                <div className="response-styles-grid">
                  {responseStylesState.map((style) => (
                    <div
                      key={style.label}
                      style={{
                        flex: isMobileView ? "0 0 calc(50% - 0.5rem)" : "1",
                        border: style.selected
                          ? "2px solid #9b87f5"
                          : "1px solid #e5e7eb",
                        borderRadius: "1rem",
                        padding: "1.25rem",
                        cursor: "pointer",
                        backgroundColor: style.selected ? "#f5f3ff" : "white",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        transition: "all 0.3s ease",
                        transform: style.selected ? "scale(1.05)" : "scale(1)",
                        boxShadow: style.selected
                          ? "0 8px 16px -4px rgba(155, 135, 245, 0.2)"
                          : "none",
                      }}
                      onClick={() => handleResponseStyleChange(style.label)}
                      onMouseEnter={() => setHoveredEmoji(style.label)}
                      onMouseLeave={() => setHoveredEmoji(null)}
                    >
                      <div
                        style={{
                          fontSize: "2.5rem",
                          marginBottom: "0.75rem",
                          transition: `transform 0.3s ease`,
                          transform:
                            hoveredEmoji === style.label
                              ? "scale(1.2)"
                              : "scale(1)",
                        }}
                      >
                        {style.emoji}
                      </div>
                      <div
                        style={{
                          fontWeight: "600",
                          fontSize: "1rem",
                          textAlign: "center",
                          color: style.selected ? "#9b87f5" : "#374151",
                        }}
                      >
                        {style.label}
                      </div>

                      {hoveredEmoji === style.label && (
                        <div
                          style={{
                            position: "absolute",
                            bottom: "calc(100% + 10px)",
                            left: "50%",
                            transform: "translateX(-50%)",
                            backgroundColor: "#374151",
                            color: "white",
                            padding: "0.75rem 1rem",
                            borderRadius: "0.5rem",
                            fontSize: "0.875rem",
                            boxShadow:
                              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                            zIndex: "30",
                            width: "200px",
                            textAlign: "center",
                            whiteSpace: "normal",
                          }}
                        >
                          {style.description}
                          <div
                            style={{
                              position: "absolute",
                              bottom: "-5px",
                              left: "50%",
                              transform: "translateX(-50%) rotate(45deg)",
                              width: "10px",
                              height: "10px",
                              backgroundColor: "#374151",
                            }}
                          ></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Automatic response summary */}
              <div
                style={{
                  backgroundColor: "#f9fafb",
                  borderRadius: "0.5rem",
                  padding: "0.75rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div style={{ fontSize: "0.875rem", marginBottom: "0.75rem" }}>
                  <p>
                    The system will automatically reply to comments based on
                    your settings:
                  </p>
                </div>
                <div
                  style={{
                    background: "linear-gradient(145deg, #f7f5ff, #edf5ff)",
                    borderRadius: "0.5rem",
                    padding: "0.75rem",
                    border: "1px solid #ddd6fe",
                    boxShadow: "0 4px 10px rgba(155, 135, 245, 0.08)",
                  }}
                >
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div style={{ fontWeight: "500", fontSize: "0.875rem" }}>
                      Response Style:
                    </div>
                    <div
                      style={{
                        fontSize: "0.875rem",
                        background:
                          "linear-gradient(to right, #9b87f5, #3e83f6)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontWeight: "500",
                      }}
                    >
                      {selectedStyle}
                    </div>
                  </div>
                </div>
              </div>
            </>
          </div>
        </div>
      </div>
      {showTour && (
        <TourGuide
          steps={tourSteps}
          isOpen={showTour}
          onClose={handleTourClose}
          onComplete={handleTourComplete}
          currentStep={tourStep}
          setCurrentStep={setTourStep}
        />
      )}
    </div>
  );
};

export default DemoPage;
