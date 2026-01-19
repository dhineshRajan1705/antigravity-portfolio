import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X, Layers, Zap, Code2 } from "lucide-react";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";

interface Project {
    id: number;
    title: string;
    category: string;
    image: string;
    description: string;
    longDescription: string;
    features: string[];
    tech: string[];
    demo: string;
    github: string;
}

export function Projects() {
    const { t } = useTranslation();
    const [activeFilter, setActiveFilter] = useState(t('projects.filters.all'));
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    
    const projects: Project[] = [
        {
            id: 1,
            title: t('projects.items.0.title'),
            category: t('projects.filters.fullstack'),
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
            description: t('projects.items.0.description'),
            longDescription: t('projects.items.0.longDescription'),
            features: [
                t('projects.items.0.features.0'),
                t('projects.items.0.features.1'),
                t('projects.items.0.features.2'),
                t('projects.items.0.features.3')
            ],
            tech: ["React", "Zoho Creator API", "Node.js", "Tailwind CSS", "React Query"],
            demo: "#",
            github: "#",
        },
        {
            id: 2,
            title: t('projects.items.1.title'),
            category: t('projects.filters.react'),
            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
            description: t('projects.items.1.description'),
            longDescription: t('projects.items.1.longDescription'),
            features: [
                t('projects.items.1.features.0'),
                t('projects.items.1.features.1'),
                t('projects.items.1.features.2'),
                t('projects.items.1.features.3')
            ],
            tech: ["React", "Redux Toolkit", "TypeScript", "Dnd-kit", "Socket.io"],
            demo: "#",
            github: "#",
        },
        {
            id: 3,
            title: t('projects.items.2.title'),
            category: t('projects.filters.react'),
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
            description: t('projects.items.2.description'),
            longDescription: t('projects.items.2.longDescription'),
            features: [
                t('projects.items.2.features.0'),
                t('projects.items.2.features.1'),
                t('projects.items.2.features.2'),
                t('projects.items.2.features.3')
            ],
            tech: ["React", "Recharts", "Web Workers", "Tailwind CSS", "Vite"],
            demo: "#",
            github: "#",
        },
        {
            id: 4,
            title: t('projects.items.3.title'),
            category: t('projects.filters.lowcode'),
            image: "https://images.unsplash.com/photo-1555421689-d68471e10463?w=800&q=80",
            description: t('projects.items.3.description'),
            longDescription: t('projects.items.3.longDescription'),
            features: [
                t('projects.items.3.features.0'),
                t('projects.items.3.features.1'),
                t('projects.items.3.features.2'),
                t('projects.items.3.features.3')
            ],
            tech: ["Zoho Creator", "Deluge", "JavaScript", "HTML/CSS"],
            demo: "#",
            github: "#",
        }
    ];
    
    const filters = [
        t('projects.filters.all'),
        t('projects.filters.react'),
        t('projects.filters.fullstack'),
        t('projects.filters.lowcode')
    ];

    const filteredProjects = projects.filter((project) =>
        activeFilter === "All" || project.category === activeFilter
    );

    return (
        <section id="projects" className="py-20 bg-slate-50/50 dark:bg-black/20 perspective-1000">
            <div className="container px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">{t('projects.title')}</h2>

                    <div className="flex flex-wrap justify-center gap-2 mb-12">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeFilter === filter
                                    ? "bg-primary text-white shadow-lg scale-105"
                                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Grid */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <motion.div
                                layout
                                key={project.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                whileHover={{ y: -10 }}
                                transition={{ duration: 0.3 }}
                                onClick={() => setSelectedProject(project)}
                                className="group relative rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl cursor-pointer"
                            >
                                {/* Image */}
                                <div className="relative h-[280px] overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity" />
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                    />
                                    <div className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white border border-white/10">
                                        {project.category}
                                    </div>
                                </div>

                                <div className="p-6 relative z-10">
                                    <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-neon-blue transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.slice(0, 3).map((tag) => (
                                            <span key={tag} className="px-2 py-1 text-xs font-semibold rounded-md bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300">
                                                {tag}
                                            </span>
                                        ))}
                                        {project.tech.length > 3 && (
                                            <span className="px-2 py-1 text-xs font-semibold rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500">
                                                +{project.tech.length - 3}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Detailed Modal */}
                <AnimatePresence>
                    {selectedProject && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedProject(null)}
                                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            />
                            <motion.div
                                layoutId={`project-${selectedProject.id}`}
                                className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-3xl shadow-2xl custom-scrollbar"
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            >
                                <div className="relative h-[300px] sm:h-[400px]">
                                    <img
                                        src={selectedProject.image}
                                        alt={selectedProject.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                                    <button
                                        onClick={() => setSelectedProject(null)}
                                        className="absolute top-6 right-6 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-md transition-colors"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                    <div className="absolute bottom-8 left-8 right-8">
                                        <motion.h2
                                            className="text-3xl md:text-5xl font-bold text-white mb-2"
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            {selectedProject.title}
                                        </motion.h2>
                                        <motion.div
                                            className="flex gap-2 text-indigo-200"
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            <span>{selectedProject.category}</span>
                                            <span>•</span>
                                            <span>Featured Project</span>
                                        </motion.div>
                                    </div>
                                </div>

                                <div className="p-8 md:p-12 space-y-12">
                                    <div className="grid md:grid-cols-[2fr,1fr] gap-12">
                                        <div className="space-y-8">
                                            <div>
                                                <h3 className="text-xl font-bold flex items-center gap-2 mb-4 text-slate-900 dark:text-white">
                                                    <Layers className="w-5 h-5 text-indigo-500" />
                                                    Overview
                                                </h3>
                                                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                                                    {selectedProject.longDescription}
                                                </p>
                                            </div>

                                            <div>
                                                <h3 className="text-xl font-bold flex items-center gap-2 mb-4 text-slate-900 dark:text-white">
                                                    <Zap className="w-5 h-5 text-amber-500" />
                                                    {t('projects.features')}
                                                </h3>
                                                <ul className="grid gap-3">
                                                    {selectedProject.features.map((feature, i) => (
                                                        <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-300 group">
                                                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500 group-hover:scale-150 transition-transform" />
                                                            {feature}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="space-y-8">
                                            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                                                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-2">
                                                    <Code2 className="w-4 h-4" />
                                                    {t('projects.techStack')}
                                                </h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {selectedProject.tech.map((tech) => (
                                                        <span key={tech} className="px-3 py-1.5 text-sm font-medium rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 shadow-sm border border-slate-200 dark:border-slate-600">
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-3">
                                                <Button size="lg" className="w-full bg-primary hover:bg-primary/90">
                                                    <ExternalLink className="w-4 h-4 mr-2" />
                                                    {t('projects.demo')}
                                                </Button>
                                                <Button size="lg" variant="outline" className="w-full">
                                                    <Github className="w-4 h-4 mr-2" />
                                                    {t('projects.code')}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
