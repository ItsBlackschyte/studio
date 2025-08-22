import { BotMessageSquare } from 'lucide-react';
import { ThemeToggle } from '../theme-toggle';

export default function Header() {
  return (
    <header className="bg-card/80 border-b sticky top-0 z-20 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <BotMessageSquare className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                AI Navigator
              </h1>
            </div>
            <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
