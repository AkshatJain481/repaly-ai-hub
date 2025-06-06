import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { saveFlow, updateFlowName, newFlow } from "@/redux/slices/flow.slice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, Plus } from "lucide-react";
import { toast } from "react-toastify";

const FlowBuilderToolbar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentFlow, loading } = useSelector(
    (state: RootState) => state.flow
  );
  const [flowName, setFlowName] = useState(currentFlow.name);

  const handleSaveFlow = async () => {
    if (!currentFlow.id) {
      const newFlowWithId = {
        ...currentFlow,
        id: `flow-${Date.now()}`,
      };
      try {
        await dispatch(saveFlow(newFlowWithId)).unwrap();
        toast.success("Flow saved successfully!");
      } catch (error) {
        toast.error("Failed to save flow");
      }
    } else {
      try {
        await dispatch(saveFlow(currentFlow)).unwrap();
        toast.success("Flow saved successfully!");
      } catch (error) {
        toast.error("Failed to save flow");
      }
    }
  };

  const handleNameChange = (name: string) => {
    setFlowName(name);
    dispatch(updateFlowName(name));
  };

  const handleNewFlow = () => {
    dispatch(newFlow());
    setFlowName("Untitled Flow");
  };

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Input
            value={flowName}
            onChange={(e) => handleNameChange(e.target.value)}
            className="max-w-xs font-medium"
            placeholder="Flow name"
          />
          <div className="text-sm text-gray-500">
            {currentFlow.nodes.length} nodes • {currentFlow.edges.length}{" "}
            connections
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleNewFlow}>
            <Plus size={16} className="mr-1" />
            New
          </Button>
          <Button onClick={handleSaveFlow} disabled={loading}>
            <Save size={16} className="mr-1" />
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FlowBuilderToolbar;
