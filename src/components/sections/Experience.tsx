import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Experience() {
    const { t } = useTranslation();
    
    const experiences = [
        {
            id: 1,
            role: t('experience.experiences.0.role'),
            company: t('experience.experiences.0.company'),
            date: t('experience.experiences.0.date'),
            description: t('experience.experiences.0.description'),
        },
        {
            id: 2,
            role: t('experience.experiences.1.role'),
            company: t('experience.experiences.1.company'),
            date: t('experience.experiences.1.date'),
            description: t('experience.experiences.1.description'),
        },
        {
            id: 3,
            role: t('experience.experiences.2.role'),
            company: t('experience.experiences.2.company'),
            date: t('experience.experiences.2.date'),
            description: t('experience.experiences.2.description'),
        },
        {
            id: 4,
            role: t('experience.experiences.3.role'),
            company: t('experience.experiences.3.company'),
            date: t('experience.experiences.3.date'),
            description: t('experience.experiences.3.description'),
        },
    ];
    
    return (
        <section id="work" className="py-20 relative">
            <div className="container px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
                        {t('experience.title')}
                    </h2>
                </motion.div>

                <div className="max-w-4xl mx-auto">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative pl-8 pb-12 last:pb-0 border-l-2 border-slate-200 dark:border-slate-800 ml-4 md:ml-0"
                        >
                            <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary dark:bg-neon-blue border-4 border-white dark:border-slate-950" />

                            <div className="bg-white/50 dark:bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-indigo-500/30 transition-colors">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{exp.role}</h3>
                                        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium">
                                            <Briefcase className="w-4 h-4" />
                                            {exp.company}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm bg-slate-100 dark:bg-white/5 px-3 py-1 rounded-full w-fit">
                                        <Calendar className="w-4 h-4" />
                                        {exp.date}
                                    </div>
                                </div>
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                                    {exp.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
