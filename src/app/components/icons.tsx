import { Blocks, Sparkles, type LucideProps } from 'lucide-react';

export const Icons = {
  logo: (props: LucideProps) => (
    <div {...props} className="relative flex items-center justify-center w-8 h-8">
      <Blocks className="absolute h-8 w-8 text-current" />
      <Sparkles className="absolute h-5 w-5 text-current/80" />
    </div>
  ),
};
