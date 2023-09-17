'use client';

import { useTheme } from 'next-themes';
import ColorPicker, { themes } from 'react-pick-color';
import { FaPen } from '@react-icons/all-files/fa/FaPen';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FormControl } from '@/components/ui/form';

interface RoleColorPickerProps {
  value?: string;
  onChange: (color: string) => void;
}

const RoleColorPicker: React.FC<RoleColorPickerProps> = ({
  value,
  onChange,
}) => {
  const theme = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="block">
        <div
          className="group w-20 h-20 rounded-lg overflow-hidden transition-opacity"
          style={{ backgroundColor: value }}
        >
          <div className="z-10 bg-background/40 h-full opacity-0 flex items-center justify-center text-xl group-hover:opacity-100 transition-opacity">
            <FaPen />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2">
        <FormControl>
          <ColorPicker
            hideInputs
            theme={theme.theme == 'dark' ? themes.dark : themes.light}
            color={value}
            onChange={(c) => onChange(c.hex)}
          />
        </FormControl>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RoleColorPicker;
