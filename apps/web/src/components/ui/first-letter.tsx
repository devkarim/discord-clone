import { cn } from '@/lib/utils';

interface FirstLetterProps {
  text: string;
  className?: string;
}

const FirstLetter: React.FC<FirstLetterProps> = ({ text, className }) => {
  return (
    <p
      className={cn(
        'opacity-60 text-2xl uppercase group-hover:opacity-100 transition-opacity',
        className
      )}
    >
      {text[0]}
    </p>
  );
};

export default FirstLetter;
