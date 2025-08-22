
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ApiKeyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (apiKey: string) => void;
}

export default function ApiKeyDialog({ isOpen, onClose, onSave }: ApiKeyDialogProps) {
  const [key, setKey] = useState('');

  const handleSave = () => {
    if (key) {
      onSave(key);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enter Your Gemini API Key</DialogTitle>
          <DialogDescription>
            To use the AI features, please enter your Google Gemini API key. 
            You can get a key from Google AI Studio. The key will only be stored for your current session.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="api-key" className="text-right">
              API Key
            </Label>
            <Input
              id="api-key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="col-span-3"
              placeholder="Enter your API key"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSave} disabled={!key}>
            Save Key
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
