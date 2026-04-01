// src/App.tsx
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Dashboard from './components/Dashboard'
import RAGDemo from './components/RAGDemo'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'

export default function App() {
  return (
    <div className="min-h-screen bg-surface-light font-body overflow-x-hidden">
      <Toaster position="top-right" />
      <Navbar />
      <Hero />
      <Services />
      <Dashboard />
      <RAGDemo />
      <About />
      <Contact />
      <Footer />
      <Chatbot />
    </div>
  )
}
