import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface FlowNode {
  id: string;
  type:
    | "trigger"
    | "condition"
    | "action"
    | "delay"
    | "message"
    | "loop"
    | "randomizer";
  position: { x: number; y: number };
  data: {
    label: string;
    config: Record<string, any>;
  };
}

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
  type?: string;
  label?: string;
}

export interface Flow {
  id: string;
  name: string;
  nodes: FlowNode[];
  edges: FlowEdge[];
  createdAt: string;
  updatedAt: string;
}

interface FlowState {
  currentFlow: Flow;
  savedFlows: Flow[];
  loading: boolean;
  error: string | null;
}

// Mock API calls
export const saveFlow = createAsyncThunk(
  "flow/saveFlow",
  async (flow: Flow) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    const savedFlow = { ...flow, updatedAt: new Date().toISOString() };

    // Store in localStorage as dummy API
    const existingFlows = JSON.parse(localStorage.getItem("flows") || "[]");
    const flowIndex = existingFlows.findIndex((f: Flow) => f.id === flow.id);

    if (flowIndex >= 0) {
      existingFlows[flowIndex] = savedFlow;
    } else {
      existingFlows.push(savedFlow);
    }

    localStorage.setItem("flows", JSON.stringify(existingFlows));
    return savedFlow;
  }
);

export const loadFlows = createAsyncThunk("flow/loadFlows", async () => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 300));
  const flows = JSON.parse(localStorage.getItem("flows") || "[]");
  return flows as Flow[];
});

// Create a new flow with initial nodes
const createInitialFlow = (): Flow => {
  const id = `flow-${Date.now()}`;
  const triggerId = `trigger-${Date.now()}`;
  const messageId = `message-${Date.now() + 1}`;

  return {
    id,
    name: "Untitled Flow",
    nodes: [
      // Initial trigger node
      {
        id: triggerId,
        type: "trigger",
        position: { x: 250, y: 100 },
        data: {
          label: "Trigger: Comment on Post",
          config: { triggerType: "comment", platform: "instagram" },
        },
      },
      // Initial message node
      {
        id: messageId,
        type: "message",
        position: { x: 250, y: 250 },
        data: {
          label: "Send Message",
          config: { messageType: "text", content: "Hello!", buttons: [] },
        },
      },
    ],
    edges: [
      // Connect trigger to message
      {
        id: `${triggerId}-${messageId}`,
        source: triggerId,
        target: messageId,
        type: "default",
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

const initialState: FlowState = {
  currentFlow: createInitialFlow(),
  savedFlows: [],
  loading: false,
  error: null,
};

const flowSlice = createSlice({
  name: "flow",
  initialState,
  reducers: {
    setCurrentFlow: (state, action: PayloadAction<Flow>) => {
      state.currentFlow = action.payload;
    },
    updateFlowName: (state, action: PayloadAction<string>) => {
      state.currentFlow.name = action.payload;
    },
    addNode: (
      state,
      action: PayloadAction<{
        type: FlowNode["type"];
        position: { x: number; y: number };
      }>
    ) => {
      const { type, position } = action.payload;
      const id = `${type}-${Date.now()}`;

      let label = `${type.charAt(0).toUpperCase() + type.slice(1)} Node`;
      let config: Record<string, any> = {};

      switch (type) {
        case "trigger":
          label = "Trigger: Comment on Post";
          config = { triggerType: "comment", platform: "instagram" };
          break;
        case "message":
          label = "Send Message";
          config = { messageType: "text", content: "Hello!", buttons: [] };
          break;
        case "condition":
          label = "Check Condition";
          config = { conditionType: "has_tag", value: "" };
          break;
        case "action":
          label = "Perform Action";
          config = { actionType: "add_tag", value: "" };
          break;
        case "loop":
          label = "Loop Back";
          config = { targetNodeId: "", maxIterations: 3 };
          break;
        case "randomizer":
          label = "Random Selection";
          config = {
            options: [
              { weight: 50, label: "Option 1" },
              { weight: 50, label: "Option 2" },
            ],
          };
          break;
        case "delay":
          label = "Wait";
          config = { duration: 5, unit: "minutes" };
          break;
      }

      const newNode: FlowNode = {
        id,
        type,
        position,
        data: {
          label,
          config,
        },
      };
      state.currentFlow.nodes.push(newNode);
    },
    updateNode: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<FlowNode["data"]> }>
    ) => {
      const { id, updates } = action.payload;
      const node = state.currentFlow.nodes.find((n) => n.id === id);
      if (node) {
        node.data = { ...node.data, ...updates };

        // If this is a message node with buttons, make sure each button has an ID
        if (node.type === "message" && node.data.config.buttons) {
          node.data.config.buttons = node.data.config.buttons.map(
            (button: any, index: number) => {
              return {
                ...button,
                id: button.id || `${id}-btn-${index}`,
              };
            }
          );
        }
      }
    },
    deleteNode: (state, action: PayloadAction<string>) => {
      const nodeId = action.payload;

      // Check if this is the first trigger node (which shouldn't be deletable)
      const nodeIndex = state.currentFlow.nodes.findIndex(
        (n) => n.id === nodeId
      );
      const node = state.currentFlow.nodes[nodeIndex];

      if (node && node.type === "trigger" && nodeIndex === 0) {
        return; // Don't delete the first trigger node
      }

      // Remove only the selected node
      state.currentFlow.nodes = state.currentFlow.nodes.filter(
        (n) => n.id !== nodeId
      );

      // Remove all edges connected to this node (both incoming and outgoing)
      state.currentFlow.edges = state.currentFlow.edges.filter(
        (e) => e.source !== nodeId && e.target !== nodeId
      );
    },
    addEdge: (state, action: PayloadAction<FlowEdge>) => {
      state.currentFlow.edges.push(action.payload);
    },
    deleteEdge: (state, action: PayloadAction<string>) => {
      state.currentFlow.edges = state.currentFlow.edges.filter(
        (e) => e.id !== action.payload
      );
    },
    updateNodePosition: (
      state,
      action: PayloadAction<{ id: string; position: { x: number; y: number } }>
    ) => {
      const { id, position } = action.payload;
      const node = state.currentFlow.nodes.find((n) => n.id === id);
      if (node) {
        node.position = position;
      }
    },
    newFlow: (state) => {
      state.currentFlow = createInitialFlow();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveFlow.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveFlow.fulfilled, (state, action) => {
        state.loading = false;
        state.currentFlow = action.payload;
        const existingIndex = state.savedFlows.findIndex(
          (f) => f.id === action.payload.id
        );
        if (existingIndex >= 0) {
          state.savedFlows[existingIndex] = action.payload;
        } else {
          state.savedFlows.push(action.payload);
        }
      })
      .addCase(saveFlow.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to save flow";
      })
      .addCase(loadFlows.fulfilled, (state, action) => {
        state.savedFlows = action.payload;
        // If there are no saved flows, create a default one
        if (state.savedFlows.length === 0) {
          state.currentFlow = createInitialFlow();
        } else if (!state.currentFlow.id) {
          // If no current flow is selected, use the first saved flow
          state.currentFlow = state.savedFlows[0];
        }
      });
  },
});

export const {
  setCurrentFlow,
  updateFlowName,
  addNode,
  updateNode,
  deleteNode,
  addEdge,
  deleteEdge,
  updateNodePosition,
  newFlow,
} = flowSlice.actions;

export default flowSlice.reducer;
