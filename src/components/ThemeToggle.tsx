import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-9 h-9 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 shrink-0"
      style={{
        background: isDark
          ? "hsl(0 0% 100% / 0.06)"
          : "hsl(0 0% 0% / 0.06)",
        border: `1px solid ${isDark ? "hsl(0 0% 100% / 0.1)" : "hsl(0 0% 0% / 0.1)"}`,
      }}
      aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
      title={isDark ? "Tema claro" : "Tema escuro"}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.25, 0.8, 0.25, 1] }}
      >
        {isDark ? (
          <Moon className="w-4 h-4" style={{ color: "hsl(0 0% 80%)" }} />
        ) : (
          <Sun className="w-4 h-4" style={{ color: "hsl(40 95% 50%)" }} />
        )}
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
