'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { generateVideoTranscript } from '@/ai/flows/generate-transcript';
import { Loader2, Clapperboard } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface VideoPlayerDialogProps {
  videoUrl: string;
  title: string;
  subTopicTitle: string;
  children: React.ReactNode;
}

function extractVideoId(url: string) {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

export default function VideoPlayerDialog({
  videoUrl,
  title,
  subTopicTitle,
  children,
}: VideoPlayerDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState('');

  const videoId = extractVideoId(videoUrl);
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : '';

  const handleGenerateTranscript = async () => {
    setIsLoading(true);
    setError('');
    setTranscript('');
    try {
      const result = await generateVideoTranscript({
        videoTitle: title,
        topic: subTopicTitle,
      });
      setTranscript(result.transcript);
    } catch (e) {
      console.error(e);
      setError('Failed to generate transcript. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleOpen = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
        setTranscript('');
        setError('');
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogTrigger asChild onClick={(e) => {e.stopPropagation(); setIsOpen(true); }}>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Video lesson on {subTopicTitle}.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div className="aspect-video">
                {embedUrl ? (
                <iframe
                    width="100%"
                    height="100%"
                    src={embedUrl}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
                ) : (
                <div className="bg-muted w-full h-full flex items-center justify-center">
                    <p>Invalid video URL</p>
                </div>
                )}
            </div>
            <div className="flex flex-col">
                <h3 className="text-lg font-semibold mb-2">Transcript</h3>
                <ScrollArea className="h-[250px] w-full rounded-md border p-4 bg-muted/50">
                {isLoading && (
                    <div className="flex items-center justify-center h-full">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="ml-2">Generating transcript...</p>
                    </div>
                )}
                {error && (
                    <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                {transcript && (
                    <pre className="whitespace-pre-wrap font-sans text-sm">{transcript}</pre>
                )}
                {!transcript && !isLoading && !error && (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <Clapperboard className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">Click below to generate an AI-powered transcript for this video.</p>
                    </div>
                )}
                </ScrollArea>
                 <Button onClick={handleGenerateTranscript} disabled={isLoading} className="mt-4 w-full">
                    {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                    </>
                    ) : (
                        transcript ? 'Regenerate Transcript' : 'Generate Transcript'
                    )}
                </Button>
            </div>
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
