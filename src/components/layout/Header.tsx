import { useState } from "react";
import { ThemeToggle } from "../ui/theme-toggle";
import { LanguageSwitcher } from "../ui/language-switcher";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const navItems = [
    { name: "header.skills", href: "#expertise" },
    { name: "header.experience", href: "#work" },
    { name: "header.projects", href: "#projects" },
    { name: "header.contact", href: "#contact" },
];

export function Header() {
    const { t } = useTranslation();
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
        setScrolled(latest > 50);
    });

    return (
        <motion.header
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300",
                scrolled ? "glass dark:glass-dark" : "bg-transparent"
            )}
        >
            {/* Name / Logo */}
            <motion.a
                href="#"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="text-xl font-bold tracking-tight flex-1 cursor-pointer"
            >
                <span className="text-slate-800 dark:text-slate-100">Senior</span>
                <span className="text-primary dark:text-teal-400">.Dev</span>
            </motion.a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex flex-1 justify-center items-center gap-8">
                {navItems.map((item, i) => (
                    <motion.a
                        key={item.name}
                        href={item.href}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * i, duration: 0.5 }}
                        className="relative text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-neon-blue transition-colors group"
                    >
                        {t(item.name)}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary dark:bg-neon-blue transition-all duration-300 group-hover:w-full" />
                    </motion.a>
                ))}
            </nav>

            {/* Actions */}
            <div className="flex flex-1 items-center justify-end gap-4">
                <LanguageSwitcher />
                <ThemeToggle />
                <motion.a
                    href="#contact"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="hidden md:block px-4 py-2 text-sm font-semibold text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 rounded-full hover:scale-105 transition-transform"
                >
                    Let's Talk
                </motion.a>
            </div>
        </motion.header>
    );
}
