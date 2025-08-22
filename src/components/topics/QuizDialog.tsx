
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
import { Loader2, ArrowLeft, ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { Card, CardContent } from '../ui/card';
import { Progress } from '../ui/progress';
import { cn } from '@/lib/utils';

interface QuizDialogProps {
  topic: string;
  children: React.ReactNode;
}

export default function QuizDialog({ topic, children }: QuizDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [error, setError] = useState('');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [checkedAnswers, setCheckedAnswers] = useState<Record<number, boolean>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { toast } = useToast();

  const handleGenerateQuiz = async () => {
    setIsLoading(true);
    setError('');
    setQuestions([]);
    setSelectedAnswers({});
    setCheckedAnswers({});
    setCurrentQuestionIndex(0);
    try {
      const result = await generateQuiz({ topic });
      const quizData = typeof result.quiz === 'string' ? JSON.parse(result.quiz) : result.quiz;
      setQuestions(quizData);
    } catch (e) {
      console.error(e);
      const errorMessage = (e as Error).message || 'Please try again.';
      setError(`Failed to generate quiz. ${errorMessage}`);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate quiz. Your API key might be invalid or not configured correctly.',
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
        setCheckedAnswers({});
        setCurrentQuestionIndex(0);
    }
  }

  const handleAnswerChange = (questionIndex: number, answer: string) => {
    setSelectedAnswers(prev => ({...prev, [questionIndex]: answer}));
  }

  const handleCheckAnswer = () => {
    setCheckedAnswers(prev => ({...prev, [currentQuestionIndex]: true}));
  }
  
  const currentQuestion = questions[currentQuestionIndex];
  const isCurrentQuestionChecked = checkedAnswers[currentQuestionIndex];
  const progress = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;

  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Quiz on {topic}</DialogTitle>
          <DialogDescription>
              {questions.length > 0 ? `Question ${currentQuestionIndex + 1} of ${questions.length}` : "Test your knowledge with a generated quiz."}
          </DialogDescription>
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
              <div className="space-y-4">
                 <Progress value={progress} className="h-2" />
                 <Card>
                    <CardContent className="p-6">
                        <p className="font-semibold mb-4 text-lg">{currentQuestion.question}</p>
                        <RadioGroup 
                            value={selectedAnswers[currentQuestionIndex] || ''}
                            onValueChange={(value) => handleAnswerChange(currentQuestionIndex, value)}
                            disabled={isCurrentQuestionChecked}
                        >
                            {currentQuestion.options.map((option, oIndex) => {
                                const isSelected = selectedAnswers[currentQuestionIndex] === option;
                                const isCorrect = option === currentQuestion.answer;
                                
                                return (
                                <div 
                                    key={oIndex} 
                                    className={cn(
                                        "flex items-center space-x-3 p-3 rounded-md transition-colors",
                                        !isCurrentQuestionChecked && "hover:bg-muted/50",
                                        isCurrentQuestionChecked && isCorrect && "bg-green-100 dark:bg-green-900/30 border-green-500 border",
                                        isCurrentQuestionChecked && isSelected && !isCorrect && "bg-red-100 dark:bg-red-900/30 border-destructive border",
                                    )}
                                >
                                    <RadioGroupItem value={option} id={`q${currentQuestionIndex}o${oIndex}`} />
                                    <Label htmlFor={`q${currentQuestionIndex}o${oIndex}`} className="flex-1 text-base cursor-pointer">{option}</Label>
                                     {isCurrentQuestionChecked && isCorrect && <CheckCircle className="h-5 w-5 text-green-500" />}
                                     {isCurrentQuestionChecked && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-destructive" />}
                                </div>
                            )})}
                        </RadioGroup>
                    </CardContent>
                 </Card>
              </div>
          )}

          {!isLoading && !error && questions.length === 0 && (
             <div className="flex flex-col items-center justify-center h-full text-center">
                <p className="text-muted-foreground">Click the button below to start your quiz.</p>
            </div>
          )}
        </div>
        <DialogFooter className="sm:justify-between">
          {questions.length > 0 && !isLoading ? (
            <div className="flex w-full justify-between items-center">
              <Button 
                variant="outline"
                onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                disabled={currentQuestionIndex === 0}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>

              <Button 
                onClick={handleCheckAnswer}
                disabled={!selectedAnswers[currentQuestionIndex] || isCurrentQuestionChecked}
              >
                Check Answer
              </Button>

              <Button 
                variant="outline"
                onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                disabled={currentQuestionIndex === questions.length - 1}
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="w-full flex justify-end gap-2">
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
                <Button variant="secondary" onClick={() => handleOpen(false)}>Close</Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
