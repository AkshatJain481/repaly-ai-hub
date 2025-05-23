import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { addNode, setCurrentFlow } from "@/redux/slices/flow.slice";
import { toggleSidebar } from "@/redux/slices/flowUI.slice";
import { Button } from "../ui/button";
import * as Accordion from "@radix-ui/react-accordion";
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";
import { FiMessageSquare, FiGitBranch, FiZap, FiClock } from "react-icons/fi";

const FlowBuilderSidebar: React.FC = () => {
  const dispatch = useDispatch();
  const { sidebarCollapsed } = useSelector((state: RootState) => state.flowUI);
  const { savedFlows } = useSelector((state: RootState) => state.flow);

  const handleAddNode = (
    type: "trigger" | "condition" | "action" | "delay"
  ) => {
    const position = {
      x: Math.random() * 400 + 100,
      y: Math.random() * 400 + 100,
    };
    dispatch(addNode({ type, position }));
  };

  const handleLoadFlow = (flow: any) => {
    dispatch(setCurrentFlow(flow));
  };

  return (
    <div
      className={`transition-all duration-300 ease-in-out text-nowrap ${
        sidebarCollapsed ? "w-12" : "w-80"
      } bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-600 p-2 overflow-hidden`}
    >
      {sidebarCollapsed ? (
        <Button
          size={"icon"}
          onClick={() => dispatch(toggleSidebar())}
          className="h-8 w-8 flex items-center justify-center rounded-lg text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 outline-none transition-colors"
          aria-label="Expand sidebar"
        >
          <BiChevronRight className="w-6 h-6" />
        </Button>
      ) : (
        <div className="p-2 overflow-y-auto h-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Flow Builder
            </h2>
            <Button
              size={"icon"}
              onClick={() => dispatch(toggleSidebar())}
              className="h-8 w-8 flex items-center justify-center rounded-lg text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 outline-none transition-colors"
              aria-label="Collapse sidebar"
            >
              <BiChevronLeft className="w-6 h-6" />
            </Button>
          </div>

          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600 hover:shadow-xl transition-all duration-300">
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
                Add Nodes
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  {
                    type: "trigger",
                    icon: (
                      <FiZap className="w-5 h-5 text-green-500 dark:text-green-400" />
                    ),
                    label: "Trigger",
                  },
                  {
                    type: "condition",
                    icon: (
                      <FiGitBranch className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                    ),
                    label: "Condition",
                  },
                  {
                    type: "action",
                    icon: (
                      <FiMessageSquare className="w-5 h-5 text-orange-500 dark:text-orange-400" />
                    ),
                    label: "Action",
                  },
                  {
                    type: "delay",
                    icon: (
                      <FiClock className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    ),
                    label: "Delay",
                  },
                ].map((node) => (
                  <Button
                    key={node.type}
                    onClick={() =>
                      handleAddNode(
                        node.type as
                          | "trigger"
                          | "condition"
                          | "action"
                          | "delay"
                      )
                    }
                    className="flex flex-col items-center gap-2 p-3 rounded-lg text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 outline-none transition-colors text-xs font-medium"
                  >
                    {node.icon}
                    <span>{node.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            <Accordion.Root
              type="single"
              collapsible
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-600"
            >
              <Accordion.Item value="saved-flows">
                <Accordion.Trigger
                  className="w-full flex items-center justify-between p-4 text-sm font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-xl focus:outline-none"
                  aria-label="Toggle saved flows"
                >
                  Saved Flows ({savedFlows.length})
                </Accordion.Trigger>
                <Accordion.Content className="p-4">
                  <div className="space-y-2">
                    {savedFlows.length === 0 ? (
                      <p className="text-xs text-gray-500 dark:text-gray-400 p-2">
                        No saved flows yet
                      </p>
                    ) : (
                      savedFlows.map((flow) => (
                        <Button
                          key={flow.id}
                          onClick={() => handleLoadFlow(flow)}
                          className="w-full flex flex-col items-start p-2 rounded-lg text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 outline-none transition-colors text-left"
                        >
                          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {flow.name}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {flow.nodes.length} nodes •{" "}
                            {new Date(flow.updatedAt).toLocaleDateString()}
                          </span>
                        </Button>
                      ))
                    )}
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlowBuilderSidebar;
