'use client';

import { useState, useMemo, useEffect } from 'react';
import Header from '@/components/layout/Header';
import TopicCard from '@/components/topics/TopicCard';
import { topics, type SubTopic } from '@/lib/topics';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

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
        <Card className="mb-8 shadow-lg bg-card/70 backdrop-blur-sm border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="text-3xl font-bold tracking-tight">Overall Progress</CardTitle>
            <CardDescription className="text-lg">Your journey to mastering AI, one concept at a time.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Progress value={totalProgress} className="h-4" />
              <span className="font-bold text-xl text-primary">{`${Math.round(totalProgress)}%`}</span>
            </div>
          </CardContent>
        </Card>

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
