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
import { Loader2, ArrowLeft, ArrowRight } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import ApiKeyDialog from '../layout/ApiKeyDialog';
import { ScrollArea } from '../ui/scroll-area';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { Card, CardContent } from '../ui/card';
import { Progress } from '../ui/progress';

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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
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
    setCurrentQuestionIndex(0);
    try {
      const result = await generateQuiz({ topic });
      // Handle cases where the result might be a stringified JSON
      const quizData = typeof result.quiz === 'string' ? JSON.parse(result.quiz) : result.quiz;
      setQuestions(quizData);
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
        setCurrentQuestionIndex(0);
    }
  }

  const handleAnswerChange = (questionIndex: number, answer: string) => {
    setSelectedAnswers(prev => ({...prev, [questionIndex]: answer}));
  }

  const handleSubmitQuiz = () => {
    setShowResults(true);
  }

  const calculateScore = () => {
    if (questions.length === 0) return 0;
    let correctCount = 0;
    questions.forEach((q, index) => {
        if(selectedAnswers[index] === q.answer) {
            correctCount++;
        }
    });
    return Math.round((correctCount / questions.length) * 100);
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;

  if (showApiKeyDialog) {
    return <ApiKeyDialog
      isOpen={showApiKeyDialog}
      onOpenChange={setShowApiKeyDialog}
      promptText="Please add your AI API key to generate a quiz."
     />
  }

  const renderResults = () => (
    <ScrollArea className="max-h-[60vh] pr-4">
      <div className="space-y-6">
      {questions.map((q, qIndex) => (
          <Card key={qIndex} className={selectedAnswers[qIndex] === q.answer ? 'border-green-500' : 'border-destructive'}>
              <CardContent className="p-4">
                  <p className="font-semibold mb-3">{qIndex + 1}. {q.question}</p>
                  <RadioGroup 
                      value={selectedAnswers[qIndex] || ''}
                      disabled
                  >
                      {q.options.map((option, oIndex) => (
                          <div key={oIndex} className="flex items-center space-x-2">
                              <RadioGroupItem value={option} id={`result-q${qIndex}o${oIndex}`} />
                              <Label htmlFor={`result-q${qIndex}o${oIndex}`} className={`flex-1 ${option === q.answer ? 'text-green-600 font-bold' : ''}`}>{option}</Label>
                          </div>
                      ))}
                  </RadioGroup>
                  {selectedAnswers[qIndex] !== q.answer && (
                      <p className="text-sm mt-2 text-destructive">Correct answer: <span className="font-semibold">{q.answer}</span></p>
                  )}
              </CardContent>
          </Card>
      ))}
      </div>
    </ScrollArea>
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Quiz on {topic}</DialogTitle>
           {showResults ? (
            <DialogDescription>
                You scored {calculateScore()}%! Review your answers below.
            </DialogDescription>
           ) : (
            <DialogDescription>
                {questions.length > 0 ? `Question ${currentQuestionIndex + 1} of ${questions.length}` : "Test your knowledge with a generated quiz."}
            </DialogDescription>
           )}
        </DialogHeader>
        <div className="py-4 space-y-4 min-h-[20rem]">
          {isLoading && (
            <div className="flex items-center justify-center h-full">
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

          {!isLoading && !error && questions.length > 0 && (
            <>
            {showResults ? renderResults() : (
              <div className="space-y-4">
                 <Progress value={progress} className="h-2" />
                 <Card>
                    <CardContent className="p-6">
                        <p className="font-semibold mb-4 text-lg">{currentQuestion.question}</p>
                        <RadioGroup 
                            value={selectedAnswers[currentQuestionIndex] || ''}
                            onValueChange={(value) => handleAnswerChange(currentQuestionIndex, value)}
                        >
                            {currentQuestion.options.map((option, oIndex) => (
                                <div key={oIndex} className="flex items-center space-x-3 p-3 rounded-md hover:bg-muted/50 transition-colors">
                                    <RadioGroupItem value={option} id={`q${currentQuestionIndex}o${oIndex}`} />
                                    <Label htmlFor={`q${currentQuestionIndex}o${oIndex}`} className="flex-1 text-base cursor-pointer">{option}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </CardContent>
                 </Card>
              </div>
            )}
            </>
          )}

          {!isLoading && !error && questions.length === 0 && (
             <div className="flex flex-col items-center justify-center h-full text-center">
                <p className="text-muted-foreground">Click the button below to start.</p>
            </div>
          )}
        </div>
        <DialogFooter>
          {questions.length === 0 && !isLoading && (
            <Button onClick={handleGenerateQuiz}>Generate Quiz</Button>
          )}

          {questions.length > 0 && !showResults && (
            <div className="flex w-full justify-between">
              <Button 
                variant="outline"
                onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                disabled={currentQuestionIndex === 0}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              {currentQuestionIndex < questions.length - 1 ? (
                <Button onClick={() => setCurrentQuestionIndex(prev => prev + 1)}>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmitQuiz}>Submit Quiz</Button>
              )}
            </div>
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
          <Button variant="secondary" onClick={() => handleOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
