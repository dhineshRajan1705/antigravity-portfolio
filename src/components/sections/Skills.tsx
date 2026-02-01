import { motion } from "framer-motion";
import { Database, Layout, Smartphone, Terminal, Cpu } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Skills() {
    const { t } = useTranslation();

    const skills = [
        {
            category: t('skills.categories.frontend'),
            icon: Layout,
            items: ["React.js", "TypeScript", "Redux", "Styled-components", "HTML5/CSS3", "Hooks"],
            color: "text-blue-500",
            bg: "bg-blue-500/10",
        },
        {
            category: t('skills.categories.backend'),
            icon: Database,
            items: ["Node.js", "Docker", "REST APIs", "JSON", "Linux", "Software Design"],
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
        },
        {
            category: t('skills.categories.lowcode'),
            icon: Terminal,
            items: ["Zoho Creator", "Zoho Projects", "Low-Code Platform"],
            color: "text-orange-500",
            bg: "bg-orange-500/10",
        },
        {
            category: t('skills.categories.platform'),
            icon: Cpu,
            items: ["Palantir Foundry", "Workshop", "Pipeline Builder", "AIP", "Palantir APIs"],
            color: "text-indigo-500",
            bg: "bg-indigo-500/10",
        },
        {
            category: t('skills.categories.mobile'),
            icon: Smartphone,
            items: ["Responsive Design", "Front-End Development", "Teamwork", "Communication"],
            color: "text-purple-500",
            bg: "bg-purple-500/10",
        },
    ];

    return (
        <section id="expertise" className="py-20 relative">
            <div className="container px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16 space-y-4"
                >
                    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
                        {t('skills.title')}
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        {t('skills.subtitle')}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <div className="h-full p-6 rounded-2xl bg-white/5 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-sm hover:border-indigo-500/50 dark:hover:border-neon-blue/50 transition-colors group hover:-translate-y-2 duration-300 shadow-lg hover:shadow-xl">
                                <div className={`w-12 h-12 rounded-lg ${skill.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                    <skill.icon className={`w-6 h-6 ${skill.color}`} />
                                </div>
                                <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-100">{skill.category}</h3>
                                <ul className="space-y-2">
                                    {skill.items.map((item) => (
                                        <li key={item} className="flex items-center text-slate-600 dark:text-slate-400 text-sm">
                                            <span className={`w-1.5 h-1.5 rounded-full mr-2 ${skill.bg.replace('/10', '')}`} />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
