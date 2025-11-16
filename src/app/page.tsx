import { ChatPanel } from "@/app/components/chat-panel";
import { Icons } from "@/app/components/icons";

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-background text-foreground font-body">
      <header className="flex items-center justify-between p-4 border-b border-border shadow-sm">
        <div className="flex items-center gap-3">
          <Icons.logo className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-semibold tracking-tighter font-headline">
            ChainGPT
          </h1>
        </div>
      </header>
      <ChatPanel />
    </div>
  );
}
