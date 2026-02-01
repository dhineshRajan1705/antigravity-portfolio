import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail, Heart, X } from "lucide-react";
import Typewriter from "typewriter-effect";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "../../lib/supabase";

export function Hero() {
    const { t } = useTranslation();
    const [likeCount, setLikeCount] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);
    const [showNameModal, setShowNameModal] = useState(false);
    const [userName, setUserName] = useState("");


    useEffect(() => {
        // Check if user has already liked (from localStorage)
        const userLiked = localStorage.getItem('hasLiked') === 'true';
        setHasLiked(userLiked);

        // Load saved name
        const savedName = localStorage.getItem('userName') || '';
        setUserName(savedName);

        // Fetch current like count
        fetchLikeCount();

        // Only subscribe to real-time updates if Supabase is configured
        if (!isSupabaseConfigured) {
            return;
        }

        // Subscribe to real-time updates
        const channel = supabase
            .channel('site_likes_changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'site_likes'
                },
                (payload: any) => {
                    if (payload.new && typeof payload.new === 'object' && 'like_count' in payload.new) {
                        setLikeCount(payload.new.like_count as number);
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const fetchLikeCount = async () => {
        // If Supabase is not configured, use localStorage only
        if (!isSupabaseConfigured) {
            const localCount = parseInt(localStorage.getItem('likeCount') || '0', 10);
            setLikeCount(localCount);
            return;
        }

        try {
            const { data, error } = await supabase
                .from('site_likes')
                .select('like_count')
                .eq('id', 1)
                .single();

            if (error) throw error;

            if (data) {
                setLikeCount(data.like_count);
            }
        } catch (error) {
            console.error('Error fetching like count:', error);
            // Fallback to localStorage if database fails
            const localCount = parseInt(localStorage.getItem('likeCount') || '0', 10);
            setLikeCount(localCount);
        }
    };

    const handleLike = async () => {
        const newLikedState = !hasLiked;

        // If liking for the first time and no name saved, show modal
        if (newLikedState && !userName) {
            setShowNameModal(true);
            return;
        }

        await performLike(newLikedState);
    };

    const performLike = async (newLikedState: boolean) => {
        const increment = newLikedState ? 1 : -1;

        // Optimistic update
        setHasLiked(newLikedState);
        setLikeCount(prev => prev + increment);
        localStorage.setItem('hasLiked', newLikedState.toString());

        // If Supabase is not configured, only use localStorage
        if (!isSupabaseConfigured) {
            localStorage.setItem('likeCount', (likeCount + increment).toString());
            return;
        }

        try {
            // Update database
            const { error } = await supabase.rpc('increment_likes', {
                row_id: 1,
                increment_value: increment
            });

            if (error) throw error;

            // If liking, save the name to database
            if (newLikedState && userName) {
                await supabase.from('likes_log').insert({
                    user_name: userName,
                    liked_at: new Date().toISOString()
                });
            }
        } catch (error) {
            console.error('Error updating like count:', error);
            // Revert on error
            setHasLiked(!newLikedState);
            setLikeCount(prev => prev - increment);
            localStorage.setItem('hasLiked', (!newLikedState).toString());
        }
    };

    const handleNameSubmit = () => {
        if (userName.trim()) {
            localStorage.setItem('userName', userName.trim());
            setShowNameModal(false);
            performLike(true);
        }
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] animate-pulse-glow" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-neon-blue/20 rounded-full blur-[100px] animate-pulse-glow delay-1000" />
            </div>

            {/* Like Button - Responsive positioning */}
            <motion.button
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                onClick={handleLike}
                className="fixed bottom-4 left-1/2 -translate-x-1/2 md:left-8 md:translate-x-0 md:bottom-8 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-pink-500/10 to-rose-500/10 dark:from-pink-500/20 dark:to-rose-500/20 border border-pink-200 dark:border-pink-800 hover:from-pink-500/20 hover:to-rose-500/20 dark:hover:from-pink-500/30 dark:hover:to-rose-500/30 transition-all duration-300 hover:scale-110 cursor-pointer group relative backdrop-blur-sm"
            >
                <Heart
                    className={`w-5 h-5 transition-all duration-300 ${hasLiked
                        ? 'text-pink-500 fill-pink-500 scale-110'
                        : 'text-pink-400 dark:text-pink-500 group-hover:fill-pink-400 dark:group-hover:fill-pink-500'
                        }`}
                />
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {likeCount}
                </span>

                {/* Hover Tooltip */}
                <span className="absolute bottom-full mb-2 md:left-full md:bottom-auto md:ml-3 md:mb-0 px-3 py-1.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                    {hasLiked ? '💔 Unlike' : '❤️ Like this site!'}
                </span>
            </motion.button>

            {/* Name Input Modal */}
            <AnimatePresence>
                {showNameModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
                        onClick={() => setShowNameModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                                    ❤️ Thanks for the love!
                                </h3>
                                <button
                                    onClick={() => setShowNameModal(false)}
                                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5 text-slate-500" />
                                </button>
                            </div>

                            <p className="text-slate-600 dark:text-slate-400 mb-6">
                                Mind sharing your name? I'd love to know who's supporting my work! 🙏
                            </p>

                            <input
                                type="text"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleNameSubmit()}
                                placeholder="Your name (optional)"
                                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 mb-4"
                                autoFocus
                            />

                            <div className="flex gap-3">
                                <button
                                    onClick={() => {
                                        setShowNameModal(false);
                                        performLike(true);
                                    }}
                                    className="flex-1 px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium"
                                >
                                    Skip
                                </button>
                                <button
                                    onClick={handleNameSubmit}
                                    className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600 transition-all font-medium shadow-lg hover:shadow-xl"
                                >
                                    Submit ❤️
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-8">

                {/* Intro Tag */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="inline-block px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-4"
                >
                    {t('hero.badge')}
                </motion.div>

                {/* Main Heading */}
                <div className="space-y-4 max-w-4xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-4xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white"
                    >
                        {t('hero.greeting')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-400">{t('hero.name')}</span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-2xl md:text-5xl font-bold text-slate-600 dark:text-slate-300 h-[60px] md:h-[80px]"
                    >
                        <Typewriter
                            options={{
                                strings: [
                                    t('hero.roles.role1'),
                                    t('hero.roles.role2'),
                                    t('hero.roles.role3'),
                                    t('hero.roles.role4')
                                ],
                                autoStart: true,
                                loop: true,
                                deleteSpeed: 50,
                                delay: 50,
                            }}
                        />
                    </motion.div>
                </div>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="max-w-2xl text-lg text-slate-600 dark:text-slate-400 leading-relaxed"
                >
                    {t('hero.tagline')} <span className="text-slate-900 dark:text-white font-semibold">{t('hero.taglineBold')}</span>.
                    {' '}{t('hero.description')}
                </motion.p>

                {/* Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 pt-4"
                >
                    <a href="#contact">
                        <Button size="lg" variant="neon" className="group">
                            <Mail className="mr-2 h-4 w-4" />
                            {t('hero.contactBtn')}
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </a>
                    <Button size="lg" variant="outline" className="border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800">
                        <Download className="mr-2 h-4 w-4" />
                        {t('hero.downloadBtn')}
                    </Button>
                </motion.div>

                {/* Social Links */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9, duration: 1 }}
                    className="flex gap-6 mt-12 text-slate-400"
                >
                    {[
                        { Icon: Github, href: "https://github.com/dhineshrajan" }, // Assuming github, fallback to # if unknown
                        { Icon: Linkedin, href: "https://www.linkedin.com/in/dhinesh-rajan-567484137/" },
                        { Icon: Mail, href: "mailto:dhineshrajan1994@gmail.com" }
                    ].map(({ Icon, href }, i) => (
                        <a key={i} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="hover:text-primary dark:hover:text-neon-blue transition-colors hover:scale-110 transform duration-200">
                            <Icon className="w-6 h-6" />
                        </a>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
