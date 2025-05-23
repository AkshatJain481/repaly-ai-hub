
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface FlowNode {
  id: string;
  type: 'trigger' | 'condition' | 'action' | 'delay';
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
  'flow/saveFlow',
  async (flow: Flow) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    const savedFlow = { ...flow, updatedAt: new Date().toISOString() };
    
    // Store in localStorage as dummy API
    const existingFlows = JSON.parse(localStorage.getItem('flows') || '[]');
    const flowIndex = existingFlows.findIndex((f: Flow) => f.id === flow.id);
    
    if (flowIndex >= 0) {
      existingFlows[flowIndex] = savedFlow;
    } else {
      existingFlows.push(savedFlow);
    }
    
    localStorage.setItem('flows', JSON.stringify(existingFlows));
    return savedFlow;
  }
);

export const loadFlows = createAsyncThunk(
  'flow/loadFlows',
  async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    const flows = JSON.parse(localStorage.getItem('flows') || '[]');
    return flows as Flow[];
  }
);

const initialState: FlowState = {
  currentFlow: {
    id: '',
    name: 'Untitled Flow',
    nodes: [],
    edges: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  savedFlows: [],
  loading: false,
  error: null,
};

const flowSlice = createSlice({
  name: 'flow',
  initialState,
  reducers: {
    setCurrentFlow: (state, action: PayloadAction<Flow>) => {
      state.currentFlow = action.payload;
    },
    updateFlowName: (state, action: PayloadAction<string>) => {
      state.currentFlow.name = action.payload;
    },
    addNode: (state, action: PayloadAction<{ type: FlowNode['type']; position: { x: number; y: number } }>) => {
      const { type, position } = action.payload;
      const id = `${type}-${Date.now()}`;
      const newNode: FlowNode = {
        id,
        type,
        position,
        data: {
          label: `${type.charAt(0).toUpperCase() + type.slice(1)} Node`,
          config: {},
        },
      };
      state.currentFlow.nodes.push(newNode);
    },
    updateNode: (state, action: PayloadAction<{ id: string; updates: Partial<FlowNode['data']> }>) => {
      const { id, updates } = action.payload;
      const node = state.currentFlow.nodes.find(n => n.id === id);
      if (node) {
        node.data = { ...node.data, ...updates };
      }
    },
    deleteNode: (state, action: PayloadAction<string>) => {
      const nodeId = action.payload;
      state.currentFlow.nodes = state.currentFlow.nodes.filter(n => n.id !== nodeId);
      state.currentFlow.edges = state.currentFlow.edges.filter(e => e.source !== nodeId && e.target !== nodeId);
    },
    addEdge: (state, action: PayloadAction<FlowEdge>) => {
      state.currentFlow.edges.push(action.payload);
    },
    deleteEdge: (state, action: PayloadAction<string>) => {
      state.currentFlow.edges = state.currentFlow.edges.filter(e => e.id !== action.payload);
    },
    updateNodePosition: (state, action: PayloadAction<{ id: string; position: { x: number; y: number } }>) => {
      const { id, position } = action.payload;
      const node = state.currentFlow.nodes.find(n => n.id === id);
      if (node) {
        node.position = position;
      }
    },
    newFlow: (state) => {
      state.currentFlow = {
        id: `flow-${Date.now()}`,
        name: 'Untitled Flow',
        nodes: [],
        edges: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
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
        const existingIndex = state.savedFlows.findIndex(f => f.id === action.payload.id);
        if (existingIndex >= 0) {
          state.savedFlows[existingIndex] = action.payload;
        } else {
          state.savedFlows.push(action.payload);
        }
      })
      .addCase(saveFlow.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to save flow';
      })
      .addCase(loadFlows.fulfilled, (state, action) => {
        state.savedFlows = action.payload;
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
