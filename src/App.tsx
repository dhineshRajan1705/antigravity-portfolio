import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider"
import { Background3D } from "@/components/ui/Background3D"
import { Header } from "@/components/layout/Header"
import { Hero } from "@/components/sections/Hero"
import { Experience } from "@/components/sections/Experience"
import { Skills } from "@/components/sections/Skills"
import { Projects } from "@/components/sections/Projects"
import { Contact } from "@/components/sections/Contact"
import "@/i18n/config"

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background font-sans transition-colors duration-300">
        <Toaster position="top-center" richColors />
        <Background3D />
        <Header />
        <main>
          <Hero />
          <Experience />
          <Skills />
          <Projects />
          <Contact />
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App
