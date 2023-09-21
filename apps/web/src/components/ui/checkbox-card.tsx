import { Switch } from './switch';

interface CheckboxCardProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  title?: string;
  description?: string;
}

const CheckboxCard: React.FC<CheckboxCardProps> = ({
  checked,
  onCheckedChange,
  title,
  description,
}) => {
  return (
    <div className="border-2 border-foreground/5 p-6 space-y-3 rounded-md">
      <div className="flex gap-3 items-center">
        <Switch checked={checked} onCheckedChange={onCheckedChange} />
        {title && <h1 className="text-lg font-semibold">{title}</h1>}
      </div>
      {description && (
        <p className="text-sm text-foreground/60">{description}</p>
      )}
    </div>
  );
};

export default CheckboxCard;
