'use client';

import { FormControl, FormItem } from '@/components/ui/form';
import { RadioGroupItem } from '@/components/ui/radio-group';

interface ChannelRadioTypeProps {
  title: string;
  subtitle: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

const ChannelRadioType: React.FC<ChannelRadioTypeProps> = ({
  title,
  subtitle,
  value,
  onChange,
  disabled,
  children,
}) => {
  return (
    <FormItem className="relative flex w-full justify-between rounded-md items-center space-x-3 space-y-0 bg-card/20 text-foreground/70 p-4 cursor-pointer">
      <div
        className="absolute left-0 w-full h-full"
        onClick={() => {
          if (disabled) return;
          onChange(value);
        }}
      />
      <div className="flex items-center gap-4">
        {children}
        <div>
          <h4 className="text-base font-semibold">{title}</h4>
          <p className="text-sm">{subtitle}</p>
        </div>
      </div>
      <FormControl>
        <RadioGroupItem
          className="w-5 h-5 text-foreground/70 border-foreground/70"
          value={value}
          disabled={disabled}
        />
      </FormControl>
    </FormItem>
  );
};

export default ChannelRadioType;
