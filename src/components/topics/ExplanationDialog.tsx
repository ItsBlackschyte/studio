'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { simplifyExplanation } from '@/ai/flows/simplify-explanation';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import ApiKeyDialog from '../layout/ApiKeyDialog';

interface ExplanationDialogProps {
  concept: string;
  children: React.ReactNode;
}

const API_KEY_STORAGE_KEY = 'user-ai-api-key';

export default function ExplanationDialog({ concept, children }: ExplanationDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [explanation, setExplanation] = useState('');
  const [error, setError] = useState('');
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  const { toast } = useToast();

  const handleOpenChange = async (open: boolean) => {
    setIsOpen(open);
    if (open && !explanation) { // Only fetch if opening and no explanation exists
      const apiKey = localStorage.getItem(API_KEY_STORAGE_KEY);
      if (!apiKey && !process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
        setShowApiKeyDialog(true);
        return;
      }
      setIsLoading(true);
      setError('');
      try {
        const result = await simplifyExplanation({ concept });
        setExplanation(result.simplifiedExplanation);
      } catch (e) {
        console.error(e);
        setError('Failed to simplify explanation. Please try again.');
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to simplify explanation. Your API key might be invalid or not configured correctly for the deployed environment.',
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (showApiKeyDialog) {
    return <ApiKeyDialog
      isOpen={showApiKeyDialog}
      onOpenChange={setShowApiKeyDialog}
      promptText="Please add your AI API key to get an explanation."
     />
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild onClick={(e) => { e.stopPropagation(); }}>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Simplified: {concept}</DialogTitle>
          <DialogDescription>
            An AI-powered explanation to help you grasp the core idea.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4 min-h-[10rem] flex items-center justify-center">
          {isLoading && (
            <div className="flex items-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="ml-2">Simplifying...</p>
            </div>
          )}
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {explanation && (
            <p className="leading-relaxed text-card-foreground/90">{explanation}</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
