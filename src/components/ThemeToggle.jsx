"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <Button
        variant="other"
        size="text-xl"
        className="flex items-center justify-center p-2 transition-colors rounded-full w-9 h-9 hover:bg-muted"
      >
        <span className="w-7.5 h-7.5" />
      </Button>
    );
  }

  return (
    <Button
      onClick={toggleTheme}
      variant="other"
      size="text-xl"
      className="flex items-center justify-center p-2 transition-colors rounded-full w-9 h-9 hover:bg-muted"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <FiMoon
          size={20}
          className="transition-colors text-muted-foreground hover:text-foreground"
        />
      ) : (
        <FiSun
          size={20}
          className="transition-colors text-muted-foreground hover:text-foreground"
        />
      )}
    </Button>
  );
}
