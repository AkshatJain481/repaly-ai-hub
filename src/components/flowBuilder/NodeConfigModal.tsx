
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { updateNode } from "@/redux/slices/flow.slice";
import { closeConfigModal } from "@/redux/slices/flowUI.slice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Plus, Trash } from "lucide-react";

const NodeConfigModal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { configModalOpen, selectedNodeId } = useSelector(
    (state: RootState) => state.flowUI
  );
  const { currentFlow } = useSelector((state: RootState) => state.flow);

  const selectedNode = selectedNodeId
    ? currentFlow.nodes.find((n) => n.id === selectedNodeId)
    : null;

  const [config, setConfig] = useState<Record<string, any>>({});

  useEffect(() => {
    if (selectedNode) {
      setConfig(selectedNode.data.config || {});
    }
  }, [selectedNode]);

  const handleSave = () => {
    if (selectedNodeId) {
      const label = generateLabel();
      dispatch(
        updateNode({
          id: selectedNodeId,
          updates: {
            config,
            label,
          },
        })
      );
    }
    dispatch(closeConfigModal());
  };

  const generateLabel = () => {
    if (!selectedNode) return "";

    switch (selectedNode.type) {
      case "trigger":
        if (config.triggerType === "comment") {
          return `Trigger: Comment on ${config.platform || "Instagram"}`;
        }
        if (config.triggerType === "story_reply") {
          return `Trigger: Story Reply`;
        }
        if (config.triggerType === "form") {
          return `Trigger: Form Submission`;
        }
        return "Trigger";

      case "message":
        const messageType = config.messageType || "text";
        return `Send ${messageType.charAt(0).toUpperCase() + messageType.slice(1)} Message`;

      case "condition":
        if (config.conditionType) {
          return `Check: ${config.conditionType}`;
        }
        return "Check Condition";

      case "action":
        if (config.actionType) {
          return `Action: ${config.actionType.replace("_", " ")}`;
        }
        return "Perform Action";

      case "loop":
        return `Loop ${config.maxIterations ? `(max ${config.maxIterations})` : ""}`;

      case "randomizer":
        return `Random: ${config.options?.length || 0} options`;

      case "delay":
        if (config.duration) {
          return `Wait ${config.duration} ${config.unit || "minutes"}`;
        }
        return "Delay";

      default:
        return selectedNode.data.label || "";
    }
  };

  const renderTriggerConfig = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="triggerType">Trigger Type</Label>
        <Select
          value={config.triggerType || ""}
          onValueChange={(value) =>
            setConfig({ ...config, triggerType: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select trigger type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="comment">User Comments on Post/Reel</SelectItem>
            <SelectItem value="story_reply">User Replies to Story</SelectItem>
            <SelectItem value="form">Form Submission</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {config.triggerType === "comment" && (
        <div>
          <Label htmlFor="platform">Platform</Label>
          <Select
            value={config.platform || "instagram"}
            onValueChange={(value) =>
              setConfig({ ...config, platform: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="facebook">Facebook</SelectItem>
              <SelectItem value="website">Website</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {config.triggerType === "story_reply" && (
        <div>
          <Label htmlFor="storyId">Story ID (optional)</Label>
          <Input
            id="storyId"
            value={config.storyId || ""}
            onChange={(e) => setConfig({ ...config, storyId: e.target.value })}
            placeholder="Story ID or leave blank for any story"
          />
        </div>
      )}

      {config.triggerType === "form" && (
        <div>
          <Label htmlFor="formId">Form ID</Label>
          <Input
            id="formId"
            value={config.formId || ""}
            onChange={(e) => setConfig({ ...config, formId: e.target.value })}
            placeholder="Enter form identifier"
          />
        </div>
      )}
    </div>
  );

  const renderMessageConfig = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="messageType">Message Type</Label>
        <Select
          value={config.messageType || "text"}
          onValueChange={(value) =>
            setConfig({ ...config, messageType: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select message type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="text">Text</SelectItem>
            <SelectItem value="image">Image</SelectItem>
            <SelectItem value="audio">Audio</SelectItem>
            <SelectItem value="video">Video</SelectItem>
            <SelectItem value="card">Card</SelectItem>
            <SelectItem value="gallery">Gallery</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {config.messageType === "text" && (
        <div>
          <Label htmlFor="content">Message Content</Label>
          <div className="relative">
            <textarea
              id="content"
              value={config.content || ""}
              onChange={(e) =>
                setConfig({ ...config, content: e.target.value })
              }
              placeholder="Enter your message"
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
            />
          </div>
        </div>
      )}

      {config.messageType === "image" && (
        <div>
          <Label htmlFor="imageUpload">Upload Image</Label>
          <Input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                // In a real app, you would upload this file to your storage service
                // and then update the config with the returned URL
                // For now, we'll create a local URL for demonstration
                const localUrl = URL.createObjectURL(file);
                setConfig({ ...config, imageUrl: localUrl, fileName: file.name });
              }
            }}
          />
          {config.imageUrl && (
            <div className="mt-2">
              <p className="text-sm text-gray-500">Selected: {config.fileName || "Image"}</p>
              <img 
                src={config.imageUrl} 
                alt="Preview" 
                className="mt-2 max-h-40 rounded-md" 
              />
            </div>
          )}
        </div>
      )}

      {config.messageType === "audio" && (
        <div>
          <Label htmlFor="audioUpload">Upload Audio</Label>
          <Input
            id="audioUpload"
            type="file"
            accept="audio/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                // In a real app, you would upload this file to your storage service
                const localUrl = URL.createObjectURL(file);
                setConfig({ ...config, audioUrl: localUrl, audioName: file.name });
              }
            }}
          />
          {config.audioUrl && (
            <div className="mt-2">
              <p className="text-sm text-gray-500">Selected: {config.audioName || "Audio file"}</p>
              <audio controls className="mt-2 w-full">
                <source src={config.audioUrl} />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
        </div>
      )}

      {config.messageType === "video" && (
        <div>
          <Label htmlFor="videoUpload">Upload Video</Label>
          <Input
            id="videoUpload"
            type="file"
            accept="video/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                // In a real app, you would upload this file to your storage service
                const localUrl = URL.createObjectURL(file);
                setConfig({ ...config, videoUrl: localUrl, videoName: file.name });
              }
            }}
          />
          {config.videoUrl && (
            <div className="mt-2">
              <p className="text-sm text-gray-500">Selected: {config.videoName || "Video file"}</p>
              <video controls className="mt-2 max-h-40 w-full">
                <source src={config.videoUrl} />
                Your browser does not support the video element.
              </video>
            </div>
          )}
        </div>
      )}

      {config.messageType === "card" && (
        <div>
          <Label htmlFor="imageUpload">Upload Card Image</Label>
          <Input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                // In a real app, you would upload this file to your storage service
                const localUrl = URL.createObjectURL(file);
                setConfig({ ...config, imageUrl: localUrl, fileName: file.name });
              }
            }}
          />
          {config.imageUrl && (
            <div className="mt-2">
              <p className="text-sm text-gray-500">Selected: {config.fileName || "Image"}</p>
              <img 
                src={config.imageUrl} 
                alt="Preview" 
                className="mt-2 max-h-40 rounded-md" 
              />
            </div>
          )}

          <Label htmlFor="cardTitle" className="mt-3">
            Card Title
          </Label>
          <Input
            id="cardTitle"
            value={config.cardTitle || ""}
            onChange={(e) =>
              setConfig({ ...config, cardTitle: e.target.value })
            }
            placeholder="Enter card title"
          />

          <Label htmlFor="cardDescription" className="mt-3">
            Card Description
          </Label>
          <Input
            id="cardDescription"
            value={config.cardDescription || ""}
            onChange={(e) =>
              setConfig({ ...config, cardDescription: e.target.value })
            }
            placeholder="Enter card description"
          />
        </div>
      )}

      {config.messageType === "gallery" && (
        <div>
          <Label>Gallery Images</Label>
          <div className="space-y-3 mt-2">
            {(config.galleryImages || []).map((img: any, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const file = e.target.files[0];
                      // In a real app, you would upload this file to your storage service
                      const localUrl = URL.createObjectURL(file);
                      const updatedImages = [...(config.galleryImages || [])];
                      updatedImages[index] = {
                        ...updatedImages[index],
                        url: localUrl,
                        fileName: file.name,
                      };
                      setConfig({ ...config, galleryImages: updatedImages });
                    }
                  }}
                />
                {img.url && (
                  <img 
                    src={img.url} 
                    alt={`Gallery image ${index + 1}`} 
                    className="h-10 w-10 object-cover rounded-md" 
                  />
                )}
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    const updatedImages = [...(config.galleryImages || [])];
                    updatedImages.splice(index, 1);
                    setConfig({ ...config, galleryImages: updatedImages });
                  }}
                >
                  <X size={16} />
                </Button>
              </div>
            ))}

            <Button
              variant="outline"
              onClick={() => {
                setConfig({
                  ...config,
                  galleryImages: [...(config.galleryImages || []), { url: "", fileName: "" }],
                });
              }}
              className="w-full mt-2"
            >
              <Plus size={16} className="mr-1" />
              Add Image
            </Button>
          </div>
        </div>
      )}

      <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
        <div className="flex items-center justify-between mb-2">
          <Label>Buttons</Label>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const buttons = [...(config.buttons || [])];
              buttons.push({ text: "New Button", actionType: "send_message" });
              setConfig({ ...config, buttons });
            }}
          >
            <Plus size={16} className="mr-1" /> Add Button
          </Button>
        </div>

        <div className="space-y-3">
          {(config.buttons || []).map((button: any, index: number) => (
            <div
              key={index}
              className="border border-gray-200 dark:border-gray-700 rounded-md p-2"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Button {index + 1}</span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    const buttons = [...(config.buttons || [])];
                    buttons.splice(index, 1);
                    setConfig({ ...config, buttons });
                  }}
                >
                  <Trash size={16} />
                </Button>
              </div>

              <div className="space-y-2">
                <div>
                  <Label htmlFor={`button-${index}-text`} className="text-xs">
                    Button Text
                  </Label>
                  <Input
                    id={`button-${index}-text`}
                    value={button.text || ""}
                    onChange={(e) => {
                      const buttons = [...(config.buttons || [])];
                      buttons[index] = {
                        ...buttons[index],
                        text: e.target.value,
                      };
                      setConfig({ ...config, buttons });
                    }}
                    placeholder="Button text"
                  />
                </div>

                <div>
                  <Label htmlFor={`button-${index}-action`} className="text-xs">
                    Action Type
                  </Label>
                  <Select
                    value={button.actionType || "send_message"}
                    onValueChange={(value) => {
                      const buttons = [...(config.buttons || [])];
                      buttons[index] = { 
                        ...buttons[index], 
                        actionType: value, 
                        id: `${selectedNodeId}-btn-${index}` 
                      };
                      setConfig({ ...config, buttons });
                    }}
                  >
                    <SelectTrigger id={`button-${index}-action`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ai_response">AI Response</SelectItem>
                      <SelectItem value="open_website">Open Website</SelectItem>
                      <SelectItem value="perform_actions">
                        Perform Actions
                      </SelectItem>
                      <SelectItem value="condition">Check Condition</SelectItem>
                      <SelectItem value="randomizer">
                        Random Selection
                      </SelectItem>
                      <SelectItem value="smart_delay">Smart Delay</SelectItem>
                      <SelectItem value="start_flow">
                        Start Another Flow
                      </SelectItem>
                      <SelectItem value="goto_step">Go to Step</SelectItem>
                      <SelectItem value="send_message">Send Message</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {button.actionType === "open_website" && (
                  <div>
                    <Label htmlFor={`button-${index}-url`} className="text-xs">
                      Website URL
                    </Label>
                    <Input
                      id={`button-${index}-url`}
                      value={button.url || ""}
                      onChange={(e) => {
                        const buttons = [...(config.buttons || [])];
                        buttons[index] = {
                          ...buttons[index],
                          url: e.target.value,
                        };
                        setConfig({ ...config, buttons });
                      }}
                      placeholder="https://example.com"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderConditionConfig = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="conditionType">Condition Type</Label>
        <Select
          value={config.conditionType || ""}
          onValueChange={(value) =>
            setConfig({ ...config, conditionType: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select condition type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="has_tag">Has Tag</SelectItem>
            <SelectItem value="missing_tag">Missing Tag</SelectItem>
            <SelectItem value="user_field">User Field Value</SelectItem>
            <SelectItem value="user_attribute">User Attribute</SelectItem>
            <SelectItem value="message_contains">Message Contains</SelectItem>
            <SelectItem value="is_subscribed">
              Is Subscribed to Sequence
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {config.conditionType === "has_tag" || config.conditionType === "missing_tag" ? (
          <div>
            <Label htmlFor="tag">Tag Name</Label>
            <Input
              id="tag"
              value={config.tag || ""}
              onChange={(e) => setConfig({ ...config, tag: e.target.value })}
              placeholder="Enter tag name"
            />
          </div>
        ) : null}

      {config.conditionType === "user_field" && (
        <>
          <div>
            <Label htmlFor="fieldName">Field Name</Label>
            <Input
              id="fieldName"
              value={config.fieldName || ""}
              onChange={(e) =>
                setConfig({ ...config, fieldName: e.target.value })
              }
              placeholder="Enter field name"
            />
          </div>

          <div>
            <Label htmlFor="operator">Operator</Label>
            <Select
              value={config.operator || "eq"}
              onValueChange={(value) =>
                setConfig({ ...config, operator: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="eq">Equals</SelectItem>
                <SelectItem value="neq">Not Equals</SelectItem>
                <SelectItem value="gt">Greater Than</SelectItem>
                <SelectItem value="lt">Less Than</SelectItem>
                <SelectItem value="contains">Contains</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="value">Value</Label>
            <Input
              id="value"
              value={config.value || ""}
              onChange={(e) => setConfig({ ...config, value: e.target.value })}
              placeholder="Enter comparison value"
            />
          </div>
        </>
      )}

      {config.conditionType === "is_subscribed" && (
        <div>
          <Label htmlFor="sequenceId">Sequence</Label>
          <Select
            value={config.sequenceId || ""}
            onValueChange={(value) =>
              setConfig({ ...config, sequenceId: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select sequence" />
            </SelectTrigger>
            <SelectContent>
              {/* This would be populated with actual sequences */}
              <SelectItem value="seq1">Sequence 1</SelectItem>
              <SelectItem value="seq2">Sequence 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );

  const renderActionConfig = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="actionType">Action Type</Label>
        <Select
          value={config.actionType || ""}
          onValueChange={(value) =>
            setConfig({
              ...config,
              actionType: value,
              category: getActionCategory(value),
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select action type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="add_tag">Add Tag</SelectItem>
            <SelectItem value="remove_tag">Remove Tag</SelectItem>
            <SelectItem value="set_user_field">Set User Field</SelectItem>
            <SelectItem value="clear_user_field">Clear User Field</SelectItem>
            <SelectItem value="delete_contact">Delete Contact</SelectItem>
            <SelectItem value="set_bot_field">Set Bot Field</SelectItem>
            <SelectItem value="subscribe_sequence">
              Subscribe to Sequence
            </SelectItem>
            <SelectItem value="unsubscribe_sequence">
              Unsubscribe from Sequence
            </SelectItem>
            <SelectItem value="make_request">Make External Request</SelectItem>
            <SelectItem value="log_conversion">Log Conversion Event</SelectItem>
            <SelectItem value="pause_automations">
              Pause All Automations
            </SelectItem>
            <SelectItem value="mark_open">Mark Conversation as Open</SelectItem>
            <SelectItem value="mark_closed">
              Mark Conversation as Closed
            </SelectItem>
            <SelectItem value="assign_conversation">
              Assign Conversation
            </SelectItem>
            <SelectItem value="notify_assignees">Notify Assignees</SelectItem>
            <SelectItem value="set_instagram_optin">
              Set Instagram Opt-in
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {(config.actionType === "add_tag" ||
        config.actionType === "remove_tag") && (
        <div>
          <Label htmlFor="tagName">Tag Name</Label>
          <Input
            id="tagName"
            value={config.tagName || ""}
            onChange={(e) => setConfig({ ...config, tagName: e.target.value })}
            placeholder="Enter tag name"
          />
        </div>
      )}

      {(config.actionType === "set_user_field" ||
        config.actionType === "clear_user_field") && (
        <>
          <div>
            <Label htmlFor="fieldName">Field Name</Label>
            <Input
              id="fieldName"
              value={config.fieldName || ""}
              onChange={(e) =>
                setConfig({ ...config, fieldName: e.target.value })
              }
              placeholder="Enter field name"
            />
          </div>

          {config.actionType === "set_user_field" && (
            <div>
              <Label htmlFor="fieldValue">Field Value</Label>
              <Input
                id="fieldValue"
                value={config.fieldValue || ""}
                onChange={(e) =>
                  setConfig({ ...config, fieldValue: e.target.value })
                }
                placeholder="Enter field value"
              />
            </div>
          )}
        </>
      )}

      {(config.actionType === "subscribe_sequence" ||
        config.actionType === "unsubscribe_sequence") && (
        <div>
          <Label htmlFor="sequenceId">Sequence</Label>
          <Select
            value={config.sequenceId || ""}
            onValueChange={(value) =>
              setConfig({ ...config, sequenceId: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select sequence" />
            </SelectTrigger>
            <SelectContent>
              {/* This would be populated with actual sequences */}
              <SelectItem value="seq1">Sequence 1</SelectItem>
              <SelectItem value="seq2">Sequence 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {config.actionType === "make_request" && (
        <>
          <div>
            <Label htmlFor="requestUrl">Request URL</Label>
            <Input
              id="requestUrl"
              value={config.requestUrl || ""}
              onChange={(e) =>
                setConfig({ ...config, requestUrl: e.target.value })
              }
              placeholder="https://api.example.com/endpoint"
            />
          </div>

          <div>
            <Label htmlFor="requestMethod">Method</Label>
            <Select
              value={config.requestMethod || "GET"}
              onValueChange={(value) =>
                setConfig({ ...config, requestMethod: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GET">GET</SelectItem>
                <SelectItem value="POST">POST</SelectItem>
                <SelectItem value="PUT">PUT</SelectItem>
                <SelectItem value="DELETE">DELETE</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="requestHeaders">Headers (JSON)</Label>
            <textarea
              id="requestHeaders"
              value={config.requestHeaders || "{}"}
              onChange={(e) =>
                setConfig({ ...config, requestHeaders: e.target.value })
              }
              placeholder='{"Content-Type": "application/json"}'
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px]"
            />
          </div>

          <div>
            <Label htmlFor="requestBody">Body (JSON)</Label>
            <textarea
              id="requestBody"
              value={config.requestBody || "{}"}
              onChange={(e) =>
                setConfig({ ...config, requestBody: e.target.value })
              }
              placeholder='{"key": "value"}'
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px]"
            />
          </div>
        </>
      )}

      {config.actionType === "log_conversion" && (
        <>
          <div>
            <Label htmlFor="conversionName">Conversion Name</Label>
            <Input
              id="conversionName"
              value={config.conversionName || ""}
              onChange={(e) =>
                setConfig({ ...config, conversionName: e.target.value })
              }
              placeholder="Enter conversion name"
            />
          </div>

          <div>
            <Label htmlFor="conversionValue">Value</Label>
            <Input
              id="conversionValue"
              type="number"
              value={config.conversionValue || ""}
              onChange={(e) =>
                setConfig({ ...config, conversionValue: e.target.value })
              }
              placeholder="Enter value"
            />
          </div>
        </>
      )}

      {config.actionType === "pause_automations" && (
        <div>
          <Label htmlFor="pauseDuration">Duration (hours)</Label>
          <Input
            id="pauseDuration"
            type="number"
            value={config.pauseDuration || "24"}
            onChange={(e) =>
              setConfig({ ...config, pauseDuration: e.target.value })
            }
            placeholder="Enter duration in hours"
          />
        </div>
      )}

      {config.actionType === "assign_conversation" && (
        <div>
          <Label htmlFor="assigneeId">Assignee</Label>
          <Select
            value={config.assigneeId || ""}
            onValueChange={(value) =>
              setConfig({ ...config, assigneeId: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select team member" />
            </SelectTrigger>
            <SelectContent>
              {/* This would be populated with actual team members */}
              <SelectItem value="user1">Team Member 1</SelectItem>
              <SelectItem value="user2">Team Member 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {config.actionType === "notify_assignees" && (
        <div>
          <Label htmlFor="notificationMessage">Notification Message</Label>
          <Input
            id="notificationMessage"
            value={config.notificationMessage || ""}
            onChange={(e) =>
              setConfig({ ...config, notificationMessage: e.target.value })
            }
            placeholder="Enter notification message"
          />
        </div>
      )}
    </div>
  );

  const renderLoopConfig = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="targetNodeId">Target Node</Label>
        <Select
          value={config.targetNodeId || ""}
          onValueChange={(value) =>
            setConfig({ ...config, targetNodeId: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select target node" />
          </SelectTrigger>
          <SelectContent>
            {currentFlow.nodes.map((node) => (
              <SelectItem key={node.id} value={node.id}>
                {node.data.label || node.id}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="maxIterations">Max Iterations (0 for unlimited)</Label>
        <Input
          id="maxIterations"
          type="number"
          value={config.maxIterations || "0"}
          onChange={(e) =>
            setConfig({ ...config, maxIterations: e.target.value })
          }
          placeholder="Enter max iterations"
        />
      </div>
    </div>
  );

  const renderRandomizerConfig = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <Label>Options</Label>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const options = [...(config.options || [])];
            // Calculate default weight
            const remainingWeight =
              100 -
              options.reduce(
                (sum: number, opt: any) => sum + parseInt(opt.weight || 0),
                0
              );
            const newWeight = Math.max(remainingWeight, 0);

            options.push({
              label: `Option ${options.length + 1}`,
              weight: newWeight,
            });
            setConfig({ ...config, options });
          }}
        >
          <Plus size={16} className="mr-1" /> Add Option
        </Button>
      </div>

      <div className="space-y-3">
        {(config.options || []).map((option: any, index: number) => (
          <div
            key={index}
            className="border border-gray-200 dark:border-gray-700 rounded-md p-3"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Option {index + 1}</span>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  const options = [...(config.options || [])];
                  options.splice(index, 1);
                  setConfig({ ...config, options });
                }}
              >
                <Trash size={16} />
              </Button>
            </div>

            <div className="space-y-3">
              <div>
                <Label htmlFor={`option-${index}-label`}>Label</Label>
                <Input
                  id={`option-${index}-label`}
                  value={option.label || ""}
                  onChange={(e) => {
                    const options = [...(config.options || [])];
                    options[index] = {
                      ...options[index],
                      label: e.target.value,
                    };
                    setConfig({ ...config, options });
                  }}
                  placeholder="Option label"
                />
              </div>

              <div>
                <Label htmlFor={`option-${index}-weight`}>Weight (%)</Label>
                <Input
                  id={`option-${index}-weight`}
                  type="number"
                  min="0"
                  max="100"
                  value={option.weight || ""}
                  onChange={(e) => {
                    const options = [...(config.options || [])];
                    options[index] = {
                      ...options[index],
                      weight: parseInt(e.target.value) || 0,
                    };
                    setConfig({ ...config, options });
                  }}
                  placeholder="Weight percentage"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Total:{" "}
        {(config.options || []).reduce(
          (sum: number, opt: any) => sum + parseInt(opt.weight || 0),
          0
        )}
        %
        {(config.options || []).reduce(
          (sum: number, opt: any) => sum + parseInt(opt.weight || 0),
          0
        ) !== 100 && (
          <span className="text-red-500 ml-2">(Should equal 100%)</span>
        )}
      </div>
    </div>
  );

  const renderDelayConfig = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="duration">Duration</Label>
        <Input
          id="duration"
          type="number"
          value={config.duration || ""}
          onChange={(e) => setConfig({ ...config, duration: e.target.value })}
          placeholder="Enter duration"
        />
      </div>

      <div>
        <Label htmlFor="unit">Unit</Label>
        <Select
          value={config.unit || "minutes"}
          onValueChange={(value) => setConfig({ ...config, unit: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="seconds">Seconds</SelectItem>
            <SelectItem value="minutes">Minutes</SelectItem>
            <SelectItem value="hours">Hours</SelectItem>
            <SelectItem value="days">Days</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const getActionCategory = (actionType: string) => {
    if (
      [
        "add_tag",
        "remove_tag",
        "set_user_field",
        "clear_user_field",
        "delete_contact",
      ].includes(actionType)
    ) {
      return "contact_data";
    } else if (
      [
        "set_bot_field",
        "subscribe_sequence",
        "unsubscribe_sequence",
        "make_request",
        "log_conversion",
        "pause_automations",
      ].includes(actionType)
    ) {
      return "workflow";
    } else if (
      [
        "mark_open",
        "mark_closed",
        "assign_conversation",
        "notify_assignees",
      ].includes(actionType)
    ) {
      return "live_chat";
    } else if (["set_instagram_optin"].includes(actionType)) {
      return "instagram";
    }
    return "";
  };

  return (
    <Dialog
      open={configModalOpen}
      onOpenChange={() => dispatch(closeConfigModal())}
    >
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            Configure {selectedNode?.type?.charAt(0).toUpperCase()}
            {selectedNode?.type?.slice(1)} Node
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {selectedNode?.type === "trigger" && renderTriggerConfig()}
          {selectedNode?.type === "message" && renderMessageConfig()}
          {selectedNode?.type === "condition" && renderConditionConfig()}
          {selectedNode?.type === "action" && renderActionConfig()}
          {selectedNode?.type === "loop" && renderLoopConfig()}
          {selectedNode?.type === "randomizer" && renderRandomizerConfig()}
          {selectedNode?.type === "delay" && renderDelayConfig()}

          <div className="flex gap-2 pt-4">
            <Button onClick={handleSave} className="flex-1">
              Save
            </Button>
            <Button
              variant="outline"
              onClick={() => dispatch(closeConfigModal())}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NodeConfigModal;
