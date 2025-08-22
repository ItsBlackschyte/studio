
'use client';

import { useState, useMemo, useEffect } from 'react';
import Header from '@/components/layout/Header';
import TopicCard from '@/components/topics/TopicCard';
import { topics, type SubTopic } from '@/lib/topics';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const [completedSubTopics, setCompletedSubTopics] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    const savedProgress = localStorage.getItem('aiNavigatorProgress');
    if (savedProgress) {
      setCompletedSubTopics(new Set(JSON.parse(savedProgress)));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'aiNavigatorProgress',
      JSON.stringify(Array.from(completedSubTopics))
    );
  }, [completedSubTopics]);


  const handleToggleSubTopic = (subTopicId: string) => {
    setCompletedSubTopics(prev => {
      const newSet = new Set(prev);
      if (newSet.has(subTopicId)) {
        newSet.delete(subTopicId);
      } else {
        newSet.add(subTopicId);
      }
      return newSet;
    });
  };

  const { totalProgress, topicProgress } = useMemo(() => {
    const allSubTopics: SubTopic[] = topics.flatMap(t => t.subTopics);
    const totalProgress =
      allSubTopics.length > 0
        ? (completedSubTopics.size / allSubTopics.length) * 100
        : 0;

    const topicProgress = new Map<string, number>();
    topics.forEach(topic => {
      const completedInTopic = topic.subTopics.filter(st =>
        completedSubTopics.has(st.id)
      ).length;
      const progress =
        topic.subTopics.length > 0
          ? (completedInTopic / topic.subTopics.length) * 100
          : 0;
      topicProgress.set(topic.id, progress);
    });

    return { totalProgress, topicProgress };
  }, [completedSubTopics]);

  return (
    <div className="bg-background min-h-screen text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tighter bg-gradient-to-r from-primary via-accent to-secondary text-transparent bg-clip-text">
                        Master the World of AI
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Your personalized roadmap to understanding complex AI topics. Track your progress, get AI-powered explanations, and test your knowledge.
                    </p>
                    <Button size="lg" className="group">
                        Start Learning
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                </div>
                <div className="relative h-64 md:h-80 rounded-xl overflow-hidden shadow-2xl">
                   <Image 
                     src="https://www.atomcamp.com/wp-content/uploads/2024/01/image-1-1024x705.png"
                     alt="AI Learning Path"
                     layout="fill"
                     objectFit="cover"
                     data-ai-hint="abstract technology"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
                </div>
            </div>
            <Card className="mt-12 shadow-lg bg-card/70 backdrop-blur-sm border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold tracking-tight">Overall Progress</CardTitle>
                <CardDescription className="text-sm">Your journey to mastering AI, one concept at a time.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Progress value={totalProgress} className="h-3" />
                  <span className="font-bold text-lg text-primary">{`${Math.round(totalProgress)}%`}</span>
                </div>
              </CardContent>
            </Card>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topics.map(topic => (
            <TopicCard
              key={topic.id}
              topic={topic}
              progress={topicProgress.get(topic.id) || 0}
              completedSubTopics={completedSubTopics}
              onToggleSubTopic={handleToggleSubTopic}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
