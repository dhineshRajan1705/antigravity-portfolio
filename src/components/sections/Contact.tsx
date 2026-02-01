import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Send, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export function Contact() {
    const { t } = useTranslation();
    const formRef = useRef<HTMLFormElement>(null);
    const [isLoading, setIsLoading] = useState(false);

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formRef.current) return;

        setIsLoading(true);

        const serviceId = "service_79btxns";
        const publicKey = "t0SWIpSs5LwIgouuZ";
        const mainTemplate = "template_tbxbtx1";
        const autoReplyTemplate = "template_byuzxnc";

        // Send to owner and sender concurrently
        Promise.all([
            emailjs.sendForm(serviceId, mainTemplate, formRef.current, publicKey),
            emailjs.sendForm(serviceId, autoReplyTemplate, formRef.current, publicKey)
        ])
            .then(
                () => {
                    toast.success(t('contact.form.successTitle'), {
                        description: t('contact.form.successDesc'),
                    });
                    formRef.current?.reset();
                },
                (error) => {
                    console.error("FAILED...", error);
                    toast.error(t('contact.form.errorTitle'), {
                        description: t('contact.form.errorDesc'),
                    });
                }
            )
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <section id="contact" className="py-20 relative overflow-hidden">
            {/* Background Grads */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] -z-10" />

            <div className="container px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">{t('contact.title')}</h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
                        {t('contact.subtitle')}
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="space-y-8"
                    >
                        <div className="flex items-start space-x-4">
                            <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-lg">
                                <Mail className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-1 text-slate-900 dark:text-white">{t('contact.emailTitle')}</h3>
                                <p className="text-slate-600 dark:text-slate-400 mb-2">{t('contact.emailSubtitle')}</p>
                                <a href="mailto:dhineshrajan1994@gmail.com" className="text-primary dark:text-neon-blue hover:underline">dhineshrajan1994@gmail.com</a>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
                                <MessageSquare className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-1 text-slate-900 dark:text-white">{t('contact.connectTitle')}</h3>
                                <p className="text-slate-600 dark:text-slate-400 mb-2">{t('contact.connectSubtitle')}</p>
                                <div className="flex gap-4">
                                    <a href="https://www.linkedin.com/in/dhinesh-rajan-567484137/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">LinkedIn</a>
                                    <a href="https://github.com/dhineshrajan" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">GitHub</a>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="p-8 rounded-3xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 shadow-2xl backdrop-blur-xl"
                    >
                        <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Name</label>
                                    <input
                                        type="text"
                                        name="from_name"
                                        required
                                        className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 dark:text-white"
                                        placeholder={t('contact.form.namePlaceholder')}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                                    <input
                                        type="email"
                                        name="reply_to"
                                        required
                                        className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 dark:text-white"
                                        placeholder={t('contact.form.emailPlaceholder')}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Message</label>
                                <textarea
                                    name="message"
                                    required
                                    rows={4}
                                    className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 dark:text-white resize-none"
                                    placeholder={t('contact.form.messagePlaceholder')}
                                ></textarea>
                            </div>
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0 shadow-lg shadow-indigo-500/30"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        {t('contact.form.sending')}
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4 mr-2" />
                                        {t('contact.form.submitBtn')}
                                    </>
                                )}
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
