'use client';

import { BotMessageSquare } from 'lucide-react';
import { ThemeToggle } from '../theme-toggle';
import ApiKeyDialog from './ApiKeyDialog';

export default function Header() {
  return (
    <header className="bg-card/80 border-b border-border/50 sticky top-0 z-20 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <BotMessageSquare className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              AI Navigator
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <ApiKeyDialog />
          </div>
        </div>
      </div>
    </header>
  );
}
