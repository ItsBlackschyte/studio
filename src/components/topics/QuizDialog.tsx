'use client';

import { useState } from 'react';
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
import { generateQuiz } from '@/ai/flows/generate-quiz';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import ApiKeyDialog from '../layout/ApiKeyDialog';

interface QuizDialogProps {
  topic: string;
  children: React.ReactNode;
}

const API_KEY_STORAGE_KEY = 'user-ai-api-key';

export default function QuizDialog({ topic, children }: QuizDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [quizContent, setQuizContent] = useState('');
  const [error, setError] = useState('');
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  const { toast } = useToast();

  const handleGenerateQuiz = async () => {
    const apiKey = localStorage.getItem(API_KEY_STORAGE_KEY);
    if (!apiKey) {
      setShowApiKeyDialog(true);
      return;
    }
    setIsLoading(true);
    setError('');
    setQuizContent('');
    try {
      const result = await generateQuiz({ topic, apiKey });
      setQuizContent(result.quiz);
    } catch (e) {
      console.error(e);
      setError('Failed to generate quiz. Please try again.');
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate quiz. Your API key might be invalid.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpen = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
        setQuizContent('');
        setError('');
    }
  }

  if (showApiKeyDialog) {
    return <ApiKeyDialog
      isOpen={showApiKeyDialog}
      onOpenChange={setShowApiKeyDialog}
      promptText="Please add your AI API key to generate a quiz."
     />
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Quiz on {topic}</DialogTitle>
          <DialogDescription>
            Test your knowledge with a generated quiz. Click the button below to start.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          {isLoading && (
            <div className="flex items-center justify-center h-40">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="ml-2">Generating your quiz...</p>
            </div>
          )}
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {quizContent && (
            <div className="max-h-[50vh] overflow-y-auto rounded-md border p-4 bg-muted/50">
                <pre className="whitespace-pre-wrap font-sans text-sm">{quizContent}</pre>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>Close</Button>
          <Button onClick={handleGenerateQuiz} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
                quizContent ? 'Generate New Quiz' : 'Generate Quiz'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
