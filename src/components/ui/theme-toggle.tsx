import { Moon, Sun } from "lucide-react";
import { useTheme } from "../theme-provider";
import { Button } from "./button";
import { motion } from "framer-motion";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="relative w-10 h-10 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/20 hover:scale-105 transition-transform"
        >
            <motion.div
                initial={false}
                animate={{
                    scale: theme === "dark" ? 1 : 0,
                    rotate: theme === "dark" ? 0 : 90,
                }}
                transition={{ duration: 0.2 }}
                className="absolute"
            >
                <Moon className="h-[1.2rem] w-[1.2rem] text-neon-blue" />
                <span className="sr-only">Toggle theme</span>
            </motion.div>
            <motion.div
                initial={false}
                animate={{
                    scale: theme === "light" ? 1 : 0,
                    rotate: theme === "light" ? 0 : -90,
                }}
                transition={{ duration: 0.2 }}
                className="absolute"
            >
                <Sun className="h-[1.2rem] w-[1.2rem] text-orange-400" />
            </motion.div>
        </Button>
    );
}
