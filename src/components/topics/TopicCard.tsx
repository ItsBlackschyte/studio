'use client';

import type { Topic } from '@/lib/topics';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Lightbulb, FileQuestion, ExternalLink } from 'lucide-react';
import ExplanationDialog from './ExplanationDialog';
import QuizDialog from './QuizDialog';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface TopicCardProps {
  topic: Topic;
  progress: number;
  completedSubTopics: Set<string>;
  onToggleSubTopic: (subTopicId: string) => void;
}

export default function TopicCard({
  topic,
  progress,
  completedSubTopics,
  onToggleSubTopic,
}: TopicCardProps) {
  return (
    <Card className="flex flex-col h-full shadow-md hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <topic.icon className="w-8 h-8 text-primary shrink-0" />
          </div>
          <div>
            <CardTitle>{topic.title}</CardTitle>
            <CardDescription>{topic.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <Label className="text-sm font-medium">Progress</Label>
            <span className="text-sm font-bold text-primary">{`${Math.round(progress)}%`}</span>
          </div>
          <Progress value={progress} aria-label={`${topic.title} progress`} />
        </div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="subtopics" className="border-t">
            <AccordionTrigger className="font-semibold text-base hover:no-underline pt-4">
              Learning Path
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                {topic.subTopics.map(subTopic => (
                  <div key={subTopic.id} className="flex items-center justify-between group">
                    <div
                      className="flex items-center gap-3 cursor-pointer"
                      onClick={() => onToggleSubTopic(subTopic.id)}
                    >
                      <Checkbox
                        id={subTopic.id}
                        checked={completedSubTopics.has(subTopic.id)}
                        onCheckedChange={() => onToggleSubTopic(subTopic.id)}
                        aria-labelledby={`label-${subTopic.id}`}
                      />
                      <Label
                        htmlFor={subTopic.id}
                        id={`label-${subTopic.id}`}
                        className={cn(
                          "text-sm font-medium transition-colors cursor-pointer",
                          completedSubTopics.has(subTopic.id) && "line-through text-muted-foreground"
                        )}
                      >
                        {subTopic.title}
                      </Label>
                    </div>
                    <div className="flex items-center">
                      {subTopic.resources && subTopic.resources.length > 0 && (
                          <Link href={subTopic.resources[0].url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-50 group-hover:opacity-100 transition-opacity">
                                <ExternalLink className="w-4 h-4" />
                                <span className="sr-only">Resource for {subTopic.title}</span>
                            </Button>
                          </Link>
                      )}
                      <ExplanationDialog concept={subTopic.title}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-50 group-hover:opacity-100 transition-opacity">
                          <Lightbulb className="w-4 h-4" />
                          <span className="sr-only">Explain {subTopic.title}</span>
                        </Button>
                      </ExplanationDialog>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter>
        <QuizDialog topic={topic.title}>
            <Button className="w-full bg-primary/90 hover:bg-primary text-primary-foreground">
              <FileQuestion className="mr-2 h-4 w-4" />
              Test Your Knowledge
            </Button>
        </QuizDialog>
      </CardFooter>
    </Card>
  );
}
