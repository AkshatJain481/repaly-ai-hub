
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FlowUIState {
  selectedNodeId: string | null;
  configModalOpen: boolean;
  sidebarCollapsed: boolean;
  previewModalOpen: boolean;
}

const initialState: FlowUIState = {
  selectedNodeId: null,
  configModalOpen: false,
  sidebarCollapsed: false,
  previewModalOpen: false,
};

const flowUISlice = createSlice({
  name: 'flowUI',
  initialState,
  reducers: {
    setSelectedNode: (state, action: PayloadAction<string | null>) => {
      state.selectedNodeId = action.payload;
    },
    openConfigModal: (state, action: PayloadAction<string>) => {
      state.selectedNodeId = action.payload;
      state.configModalOpen = true;
    },
    closeConfigModal: (state) => {
      state.configModalOpen = false;
      state.selectedNodeId = null;
    },
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    openPreviewModal: (state) => {
      state.previewModalOpen = true;
    },
    closePreviewModal: (state) => {
      state.previewModalOpen = false;
    },
  },
});

export const {
  setSelectedNode,
  openConfigModal,
  closeConfigModal,
  toggleSidebar,
  openPreviewModal,
  closePreviewModal,
} = flowUISlice.actions;

export default flowUISlice.reducer;
