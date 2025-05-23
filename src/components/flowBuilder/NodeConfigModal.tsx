import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { updateNode } from '@/redux/slices/flow.slice';
import { closeConfigModal } from '@/redux/slices/flowUI.slice';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const NodeConfigModal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { configModalOpen, selectedNodeId } = useSelector((state: RootState) => state.flowUI);
  const { currentFlow } = useSelector((state: RootState) => state.flow);
  
  const selectedNode = selectedNodeId ? currentFlow.nodes.find(n => n.id === selectedNodeId) : null;
  
  const [config, setConfig] = useState<Record<string, any>>({});

  useEffect(() => {
    if (selectedNode) {
      setConfig(selectedNode.data.config || {});
    }
  }, [selectedNode]);

  const handleSave = () => {
    if (selectedNodeId) {
      const label = generateLabel(selectedNode?.type || '', config);
      dispatch(updateNode({ 
        id: selectedNodeId, 
        updates: { 
          config,
          label 
        } 
      }));
    }
    dispatch(closeConfigModal());
  };

  const generateLabel = (type: string, config: Record<string, any>): string => {
    switch (type) {
      case 'trigger':
        if (config.triggerType === 'comment' && config.keyword) {
          return `Comment: ${config.keyword}`;
        }
        if (config.triggerType === 'dm' && config.keyword) {
          return `DM: ${config.keyword}`;
        }
        return 'Trigger Node';
      case 'condition':
        if (config.conditionType && config.value) {
          return `${config.conditionType}: ${config.value}`;
        }
        return 'Condition Node';
      case 'action':
        if (config.actionType === 'message' && config.message) {
          return `Send: ${config.message.substring(0, 20)}...`;
        }
        return 'Action Node';
      case 'delay':
        if (config.duration) {
          return `Wait ${config.duration} ${config.unit || 'minutes'}`;
        }
        return 'Delay Node';
      default:
        return 'Node';
    }
  };

  const renderTriggerConfig = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="triggerType">Trigger Type</Label>
        <Select value={config.triggerType || ''} onValueChange={(value) => setConfig({...config, triggerType: value})}>
          <SelectTrigger>
            <SelectValue placeholder="Select trigger type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="comment">Comment</SelectItem>
            <SelectItem value="dm">Direct Message</SelectItem>
            <SelectItem value="story">Story</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {config.triggerType && (
        <div>
          <Label htmlFor="keyword">Keyword/Pattern</Label>
          <Input
            id="keyword"
            value={config.keyword || ''}
            onChange={(e) => setConfig({...config, keyword: e.target.value})}
            placeholder="Enter trigger keyword"
          />
        </div>
      )}
      
      <div>
        <Label htmlFor="matchType">Match Type</Label>
        <Select value={config.matchType || 'exact'} onValueChange={(value) => setConfig({...config, matchType: value})}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="exact">Exact Match</SelectItem>
            <SelectItem value="contains">Contains</SelectItem>
            <SelectItem value="emoji">Emoji</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderConditionConfig = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="conditionType">Condition Type</Label>
        <Select value={config.conditionType || ''} onValueChange={(value) => setConfig({...config, conditionType: value})}>
          <SelectTrigger>
            <SelectValue placeholder="Select condition type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hasEmail">Has Email</SelectItem>
            <SelectItem value="hasPhone">Has Phone</SelectItem>
            <SelectItem value="userLocation">User Location</SelectItem>
            <SelectItem value="messagedBefore">Messaged Before</SelectItem>
            <SelectItem value="purchaseHistory">Purchase History</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="value">Value</Label>
        <Input
          id="value"
          value={config.value || ''}
          onChange={(e) => setConfig({...config, value: e.target.value})}
          placeholder="Enter condition value"
        />
      </div>
    </div>
  );

  const renderActionConfig = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="actionType">Action Type</Label>
        <Select value={config.actionType || ''} onValueChange={(value) => setConfig({...config, actionType: value})}>
          <SelectTrigger>
            <SelectValue placeholder="Select action type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="message">Send Message</SelectItem>
            <SelectItem value="tag">Add Tag</SelectItem>
            <SelectItem value="collect">Collect Data</SelectItem>
            <SelectItem value="notify">Notify Team</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {config.actionType === 'message' && (
        <div>
          <Label htmlFor="message">Message</Label>
          <Input
            id="message"
            value={config.message || ''}
            onChange={(e) => setConfig({...config, message: e.target.value})}
            placeholder="Enter message to send"
          />
        </div>
      )}
      
      {config.actionType === 'tag' && (
        <div>
          <Label htmlFor="tag">Tag</Label>
          <Input
            id="tag"
            value={config.tag || ''}
            onChange={(e) => setConfig({...config, tag: e.target.value})}
            placeholder="Enter tag name"
          />
        </div>
      )}
    </div>
  );

  const renderDelayConfig = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="duration">Duration</Label>
        <Input
          id="duration"
          type="number"
          value={config.duration || ''}
          onChange={(e) => setConfig({...config, duration: e.target.value})}
          placeholder="Enter duration"
        />
      </div>
      
      <div>
        <Label htmlFor="unit">Unit</Label>
        <Select value={config.unit || 'minutes'} onValueChange={(value) => setConfig({...config, unit: value})}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="minutes">Minutes</SelectItem>
            <SelectItem value="hours">Hours</SelectItem>
            <SelectItem value="days">Days</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  return (
    <Dialog open={configModalOpen} onOpenChange={() => dispatch(closeConfigModal())}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            Configure {selectedNode?.type?.charAt(0).toUpperCase()}{selectedNode?.type?.slice(1)} Node
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {selectedNode?.type === 'trigger' && renderTriggerConfig()}
          {selectedNode?.type === 'condition' && renderConditionConfig()}
          {selectedNode?.type === 'action' && renderActionConfig()}
          {selectedNode?.type === 'delay' && renderDelayConfig()}
          
          <div className="flex gap-2 pt-4">
            <Button onClick={handleSave} className="flex-1">
              Save
            </Button>
            <Button variant="outline" onClick={() => dispatch(closeConfigModal())} className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NodeConfigModal;
