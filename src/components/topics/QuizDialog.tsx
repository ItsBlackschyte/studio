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
import { generateQuiz, type QuizQuestion } from '@/ai/flows/generate-quiz';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import ApiKeyDialog from '../layout/ApiKeyDialog';
import { ScrollArea } from '../ui/scroll-area';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { Card, CardContent } from '../ui/card';

interface QuizDialogProps {
  topic: string;
  children: React.ReactNode;
}

const API_KEY_STORAGE_KEY = 'user-ai-api-key';

export default function QuizDialog({ topic, children }: QuizDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [error, setError] = useState('');
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  const handleGenerateQuiz = async () => {
    const apiKey = localStorage.getItem(API_KEY_STORAGE_KEY);
    if (!apiKey && !process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      setShowApiKeyDialog(true);
      return;
    }
    setIsLoading(true);
    setError('');
    setQuestions([]);
    setSelectedAnswers({});
    setShowResults(false);
    try {
      const result = await generateQuiz({ topic });
      setQuestions(result.quiz);
    } catch (e) {
      console.error(e);
      setError('Failed to generate quiz. Please try again.');
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate quiz. Your API key might be invalid or not configured correctly for the deployed environment.',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleOpen = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
        setQuestions([]);
        setError('');
        setSelectedAnswers({});
        setShowResults(false);
    }
  }

  const handleAnswerChange = (questionIndex: number, answer: string) => {
    setSelectedAnswers(prev => ({...prev, [questionIndex]: answer}));
  }

  const handleSubmitQuiz = () => {
    setShowResults(true);
  }

  const calculateScore = () => {
    let correctCount = 0;
    questions.forEach((q, index) => {
        if(selectedAnswers[index] === q.answer) {
            correctCount++;
        }
    });
    return Math.round((correctCount / questions.length) * 100);
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
           {showResults && (
            <DialogDescription>
                You scored {calculateScore()}%! Review your answers below.
            </DialogDescription>
           )}
           {!showResults && (
            <DialogDescription>
                Test your knowledge with a generated quiz. Click the button below to start.
            </DialogDescription>
           )}
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
          {questions.length > 0 && (
            <ScrollArea className="max-h-[50vh] pr-4">
                <div className="space-y-6">
                {questions.map((q, qIndex) => (
                    <Card key={qIndex} className={showResults ? (selectedAnswers[qIndex] === q.answer ? 'border-green-500' : 'border-destructive') : ''}>
                        <CardContent className="p-4">
                            <p className="font-semibold mb-3">{qIndex + 1}. {q.question}</p>
                            <RadioGroup 
                                value={selectedAnswers[qIndex] || ''}
                                onValueChange={(value) => handleAnswerChange(qIndex, value)}
                                disabled={showResults}
                            >
                                {q.options.map((option, oIndex) => (
                                    <div key={oIndex} className="flex items-center space-x-2">
                                        <RadioGroupItem value={option} id={`q${qIndex}o${oIndex}`} />
                                        <Label htmlFor={`q${qIndex}o${oIndex}`} className={`flex-1 ${showResults && option === q.answer ? 'text-green-600 font-bold' : ''}`}>{option}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                            {showResults && selectedAnswers[qIndex] !== q.answer && (
                                <p className="text-sm mt-2 text-destructive">Correct answer: {q.answer}</p>
                            )}
                        </CardContent>
                    </Card>
                ))}
                </div>
            </ScrollArea>
          )}
        </div>
        <DialogFooter>
          {questions.length > 0 && !showResults && (
            <Button onClick={handleSubmitQuiz}>Submit Quiz</Button>
          )}
          {showResults && (
             <Button onClick={handleGenerateQuiz} disabled={isLoading}>
                {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                </>
                ) : (
                    'Generate New Quiz'
                )}
            </Button>
          )}
          {questions.length === 0 && (
            <Button onClick={handleGenerateQuiz} disabled={isLoading}>
                {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                </>
                ) : (
                    'Generate Quiz'
                )}
            </Button>
          )}
          <Button variant="secondary" onClick={() => handleOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
