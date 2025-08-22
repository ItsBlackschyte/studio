'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { KeyRound } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const API_KEY_STORAGE_KEY = 'user-ai-api-key';
const isServerKeyConfigured = process.env.NEXT_PUBLIC_API_KEY_CONFIGURED === 'true';


interface ApiKeyDialogProps {
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  promptText?: string;
}

export default function ApiKeyDialog({ isOpen: controlledIsOpen, onOpenChange: controlledOnOpenChange, promptText }: ApiKeyDialogProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const { toast } = useToast();

  const isOpen = controlledIsOpen ?? internalIsOpen;
  const setIsOpen = controlledOnOpenChange ?? setInternalIsOpen;

  useEffect(() => {
    if (isOpen) {
      const storedKey = localStorage.getItem(API_KEY_STORAGE_KEY);
      if (storedKey) {
        setApiKey(storedKey);
      }
    }
  }, [isOpen]);

  const handleSave = () => {
    localStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
    toast({
      title: 'API Key Saved',
      description: "Your AI API key has been saved. You can now use the AI features.",
    });
    setIsOpen(false);
    // Reload to apply the key if it was missing.
    window.location.reload();
  };

  const handleCancel = () => {
    if (!localStorage.getItem(API_KEY_STORAGE_KEY)) {
        toast({
            variant: 'destructive',
            title: 'API Key Required',
            description: 'You need to set an API key to use AI features.',
        });
    }
    setIsOpen(false)
  }

  const dialogContent = (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Set Your AI API Key</DialogTitle>
        <DialogDescription>
          {promptText || 'Enter your personal AI API key to use the generative features. This key is stored securely in your browser and is never sent to our servers.'}
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="api-key" className="text-right">
            API Key
          </Label>
          <Input
            id="api-key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="col-span-3"
            type="password"
            placeholder="Enter your API key"
          />
        </div>
      </div>
      <DialogFooter>
        <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleSave}>Save Key</Button>
      </DialogFooter>
    </DialogContent>
  );
  
  // If isOpen is controlled, we don't need the trigger.
  if (controlledIsOpen !== undefined) {
    return (
       <Dialog open={isOpen} onOpenChange={setIsOpen}>
          {dialogContent}
        </Dialog>
    )
  }
  
  // Don't show the trigger if the server key is configured
  if (isServerKeyConfigured) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <KeyRound className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Set API Key</span>
        </Button>
      </DialogTrigger>
      {dialogContent}
    </Dialog>
  );
}
