
'use client';

import type { Topic } from '@/lib/topics';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Lightbulb, FileQuestion, Book, Video, MoreVertical } from 'lucide-react';
import ExplanationDialog from './ExplanationDialog';
import QuizDialog from './QuizDialog';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import VideoPlayerDialog from './VideoPlayerDialog';


interface TopicCardProps {
  topic: Topic;
  progress: number;
  completedSubTopics: Set<string>;
  onToggleSubTopic: (subTopicId: string) => void;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function TopicCard({
  topic,
  progress,
  completedSubTopics,
  onToggleSubTopic,
  isOpen,
  onOpenChange,
}: TopicCardProps) {
  return (
    <Card className="flex flex-col h-full shadow-md hover:shadow-xl transition-shadow duration-300 bg-card/50 hover:bg-card/90 group">
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
            <topic.icon className="w-8 h-8 text-primary shrink-0" />
          </div>
          <div>
            <CardTitle className="text-xl font-semibold">{topic.title}</CardTitle>
            <CardDescription className="mt-1">{topic.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <Label className="text-sm font-medium">Progress</Label>
            <span className="text-sm font-bold text-primary">{`${Math.round(progress)}%`}</span>
          </div>
          <Progress value={progress} aria-label={`${topic.title} progress`} className="h-2" />
        </div>
        <Accordion 
          type="single" 
          collapsible 
          className="w-full"
          value={isOpen ? 'subtopics' : ''}
          onValueChange={(value) => onOpenChange(value === 'subtopics')}
        >
          <AccordionItem value="subtopics" className="border-none">
            <AccordionTrigger className="font-semibold text-base hover:no-underline pt-4 flex justify-center text-primary/80 hover:text-primary">
              <span className="text-sm">View Learning Path</span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                {topic.subTopics.map(subTopic => (
                  <div key={subTopic.id} className="flex items-center justify-between">
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
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="w-4 h-4" />
                            <span className="sr-only">More options for {subTopic.title}</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent onClick={(e) => e.stopPropagation()} align="end">
                           <ExplanationDialog concept={subTopic.title}>
                              <button className="relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full">
                                <Lightbulb className="mr-2 h-4 w-4" />
                                <span>Explain</span>
                              </button>
                           </ExplanationDialog>
                          {subTopic.resources && subTopic.resources.length > 0 && (
                            <>
                              <DropdownMenuSeparator />
                              {subTopic.resources.map((resource, index) => (
                                <DropdownMenuItem key={index} asChild>
                                  <VideoPlayerDialog
                                    videoUrl={resource.url}
                                    title={resource.title}
                                    subTopicTitle={subTopic.title}
                                  >
                                    <button className="relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full">
                                      <Video className="mr-2 h-4 w-4" />
                                      <span>{resource.title}</span>
                                    </button>
                                  </VideoPlayerDialog>
                                </DropdownMenuItem>
                              ))}
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
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
