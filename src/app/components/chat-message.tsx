import { cn } from '@/lib/utils';
import type { Message } from '@/lib/types';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot, Check, User } from 'lucide-react';

const LoadingIndicator = () => (
  <div className="flex items-center gap-1.5">
    <span className="h-2 w-2 animate-[pulse_0.5s_ease-in-out_infinite] rounded-full bg-current" />
    <span className="h-2 w-2 animate-[pulse_0.5s_ease-in-out_0.1s_infinite] rounded-full bg-current" />
    <span className="h-2 w-2 animate-[pulse_0.5s_ease-in-out_0.2s_infinite] rounded-full bg-current" />
  </div>
);

export function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === 'user';
  const isProcessing = message.status === 'processing';
  const isError = message.status === 'error';

  return (
    <div
      className={cn('flex items-start gap-4', {
        'justify-end': isUser,
      })}
    >
      {!isUser && (
        <Avatar className="h-9 w-9 border border-border">
          <AvatarFallback className="bg-card">
            <Bot className="h-5 w-5 text-primary" />
          </AvatarFallback>
        </Avatar>
      )}

      <div
        className={cn(
          'max-w-[80%] rounded-lg p-3 px-4 text-sm md:text-base animate-in fade-in slide-in-from-bottom-2',
          {
            'bg-card shadow-sm': !isUser,
            'bg-primary/20': isUser,
            'bg-destructive/20 text-destructive-foreground': isError,
          }
        )}
      >
        {isProcessing ? <LoadingIndicator /> : <p className="whitespace-pre-wrap">{message.content}</p>}
        {isUser && (
            <div className="mt-2 flex items-center gap-2 text-xs text-primary/80">
                <Check className="h-3 w-3" />
                <span>On-chain</span>
                <span className="font-mono text-primary/60">Tx: {message.id.substring(0, 8)}...</span>
            </div>
        )}
      </div>

      {isUser && (
        <Avatar className="h-9 w-9 border border-border">
          <AvatarFallback className="bg-primary/20">
            <User className="h-5 w-5 text-primary" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
