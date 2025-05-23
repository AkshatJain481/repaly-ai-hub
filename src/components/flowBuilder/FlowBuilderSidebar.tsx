
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { addNode, setCurrentFlow } from '@/redux/slices/flow.slice';
import { toggleSidebar } from '@/redux/slices/flowUI.slice';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { X, Plus, MessageSquare, GitBranch, Zap, Clock } from 'lucide-react';

const FlowBuilderSidebar: React.FC = () => {
  const dispatch = useDispatch();
  const { sidebarCollapsed } = useSelector((state: RootState) => state.flowUI);
  const { savedFlows } = useSelector((state: RootState) => state.flow);

  const handleAddNode = (type: 'trigger' | 'condition' | 'action' | 'delay') => {
    const position = {
      x: Math.random() * 400 + 100,
      y: Math.random() * 400 + 100,
    };
    dispatch(addNode({ type, position }));
  };

  const handleLoadFlow = (flow: any) => {
    dispatch(setCurrentFlow(flow));
  };

  if (sidebarCollapsed) {
    return (
      <div className="w-12 bg-white border-r border-gray-200 p-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => dispatch(toggleSidebar())}
          className="w-8 h-8"
        >
          <Plus size={16} />
        </Button>
      </div>
    );
  }

  return (
    <div className="w-80 bg-white border-r border-gray-200 p-4 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Flow Builder</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => dispatch(toggleSidebar())}
          className="w-8 h-8"
        >
          <X size={16} />
        </Button>
      </div>

      <div className="space-y-4">
        <Card className="p-4">
          <h3 className="text-sm font-medium mb-3">Add Nodes</h3>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleAddNode('trigger')}
              className="flex items-center gap-2 h-auto p-3 flex-col"
            >
              <Zap size={20} className="text-green-500" />
              <span className="text-xs">Trigger</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleAddNode('condition')}
              className="flex items-center gap-2 h-auto p-3 flex-col"
            >
              <GitBranch size={20} className="text-blue-500" />
              <span className="text-xs">Condition</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleAddNode('action')}
              className="flex items-center gap-2 h-auto p-3 flex-col"
            >
              <MessageSquare size={20} className="text-orange-500" />
              <span className="text-xs">Action</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleAddNode('delay')}
              className="flex items-center gap-2 h-auto p-3 flex-col"
            >
              <Clock size={20} className="text-gray-500" />
              <span className="text-xs">Delay</span>
            </Button>
          </div>
        </Card>

        <Accordion type="single" collapsible>
          <AccordionItem value="saved-flows">
            <AccordionTrigger className="text-sm font-medium">
              Saved Flows ({savedFlows.length})
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {savedFlows.map((flow) => (
                  <Button
                    key={flow.id}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLoadFlow(flow)}
                    className="w-full justify-start text-left h-auto p-2"
                  >
                    <div>
                      <div className="text-sm font-medium">{flow.name}</div>
                      <div className="text-xs text-gray-500">
                        {flow.nodes.length} nodes • {new Date(flow.updatedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </Button>
                ))}
                {savedFlows.length === 0 && (
                  <p className="text-xs text-gray-500 p-2">No saved flows yet</p>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default FlowBuilderSidebar;
