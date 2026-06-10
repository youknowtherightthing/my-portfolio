import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import P1 from './pages/P1'
import P2 from './pages/P2'
import P3 from './pages/P3'
import P4 from './pages/P4'
import Storage from './pages/Storage'

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <div>
          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </div>
      } />
      <Route path="/p1" element={<P1 />} />
      <Route path="/p2" element={<P2 />} />
      <Route path="/p3" element={<P3 />} />
      <Route path="/p4" element={<P4 />} />
      <Route path="/storage" element={<Storage />} />
    </Routes>
  )
}

export default App