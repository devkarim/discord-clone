import { Button } from '@/components/ui/button';

interface SaveChangesToastProps {
  isOpen: boolean;
  loading?: boolean;
  onSaveChanges: () => void;
  onReset: () => void;
}

const SaveChangesToast: React.FC<SaveChangesToastProps> = ({
  isOpen,
  loading,
  onSaveChanges,
  onReset,
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute bottom-4 w-10/12 shadow-lg rounded-md p-3 bg-white dark:bg-black flex items-center justify-between">
      <p>Careful ─ you have unsaved changes!</p>
      <div className="flex gap-2">
        <Button variant="link" onClick={onReset} disabled={loading}>
          Reset
        </Button>
        <Button variant="success" onClick={onSaveChanges} loading={loading}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default SaveChangesToast;
