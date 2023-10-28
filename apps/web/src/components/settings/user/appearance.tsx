import { ModeToggle } from '@/components/ui/theme-toggle';

interface AppearanceSettingsProps {}

const AppearanceSettings: React.FC<AppearanceSettingsProps> = ({}) => {
  return (
    <div className="space-y-4 py-6">
      <div className="space-y-1 text-foreground/60">
        <h2 className="font-bold text-sm text-foreground/60">THEME</h2>
        <p className="text-sm">Change dark or light mode.</p>
      </div>
      <ModeToggle />
    </div>
  );
};

export default AppearanceSettings;
