'use client';

import { useState, useRef, useEffect } from 'react';
import type { Message } from '@/lib/types';
import { getAiResponse } from '@/app/actions';
import { ChatMessage } from './chat-message';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { SendHorizonal, Bot } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const WelcomeMessage = () => (
  <div className="flex flex-col items-center justify-center h-full text-center">
    <Bot className="h-16 w-16 text-primary/50 mb-4" />
    <h2 className="text-3xl font-headline font-semibold text-primary mb-2">
      Welcome to ChainGPT
    </h2>
    <p className="text-muted-foreground max-w-md">
      Submit your prompts to the blockchain and receive AI-generated responses.
      What will you create today?
    </p>
  </div>
);

export function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const prompt = formData.get('prompt')?.toString().trim();

    if (!prompt) return;

    setIsLoading(true);
    e.currentTarget.reset();

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: prompt,
    };
    const processingMessage: Message = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: '',
      status: 'processing',
    };

    setMessages((prev) => [...prev, userMessage, processingMessage]);

    const result = await getAiResponse(prompt);

    if (result.success) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === processingMessage.id
            ? { ...msg, content: result.response, status: undefined }
            : msg
        )
      );
    } else {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === processingMessage.id
            ? { ...msg, content: result.response, status: 'error' }
            : msg
        )
      );
      toast({
        title: 'Error',
        description: 'Failed to get AI response. Please try again.',
        variant: 'destructive',
      });
    }

    setIsLoading(false);
  };

  return (
    <>
      <main ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-8">
        {messages.length === 0 ? (
          <WelcomeMessage />
        ) : (
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)
        )}
      </main>
      <footer className="p-4 border-t border-border bg-background">
        <div className="max-w-3xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="relative flex items-center gap-2"
          >
            <Textarea
              name="prompt"
              placeholder="Enter your on-chain prompt..."
              rows={1}
              className="resize-none flex-1 pr-16 rounded-full"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  (e.target as HTMLTextAreaElement).form?.requestSubmit();
                }
              }}
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              variant="ghost"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-accent-foreground/60 hover:text-accent-foreground hover:bg-accent rounded-full disabled:bg-transparent"
              disabled={isLoading}
              aria-label="Send prompt"
            >
              <SendHorizonal className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </footer>
    </>
  );
}
