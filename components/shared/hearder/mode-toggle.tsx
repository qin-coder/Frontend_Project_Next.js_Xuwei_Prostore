'use client';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from '@radix-ui/react-dropdown-menu';
import { Button } from '@/components/ui/button';
import { SunIcon, MoonIcon, SunMoon, Check } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

const ModeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const themes = [
    { label: 'System', value: 'system' },
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          {theme === 'system' ? (
            <SunMoon className="h-5 w-5" />
          ) : theme === 'dark' ? (
            <MoonIcon className="h-5 w-5" />
          ) : (
            <SunIcon className="h-5 w-5" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="rounded-xl p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
        sideOffset={6}
      >
        <DropdownMenuLabel className="text-base font-medium text-gray-600 dark:text-gray-300 px-2 pb-2">
          Appearance
        </DropdownMenuLabel>

        {themes.map(({ label, value }) => (
          <DropdownMenuCheckboxItem
            key={value}
            checked={theme === value}
            onClick={() => setTheme(value)}
            className="flex items-center px-2 py-2 rounded-md text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 space-x-2"
          >
            {/* 固定宽度占位容器 */}
            <span className="w-4 h-4 flex items-center justify-center">
              {theme === value && <Check className="h-4 w-4 text-primary" />}
            </span>
            <span className="flex-1 text-left">{label}</span>
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ModeToggle;
