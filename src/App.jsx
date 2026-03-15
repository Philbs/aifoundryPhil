import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Home, Download } from 'lucide-react';
import Slide from './components/Slide';
import MainMenu from './components/MainMenu';
import { slidesData } from './data/slidesData';

const App = () => {
  const [activeModule, setActiveModule] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const slidesContent = activeModule ? slidesData[activeModule] : [];
  
  const getPptxName = (id) => {
    const names = {
      'm1': 'Modulo_01',
      'm2': 'Modulo_02',
      'm3': 'Modulo_03',
      'm4': 'Modulo_04'
    };
    return `Apresentacao_Foundry_${names[id]}.pptx`;
  };

  const paginate = (newDirection) => {
    if (currentSlide + newDirection >= 0 && currentSlide + newDirection < slidesContent.length) {
      setDirection(newDirection);
      setCurrentSlide(prev => prev + newDirection);
    }
  };

  const handleKeyDown = (e) => {
    if (!activeModule) return;
    if (e.key === 'ArrowRight') paginate(1);
    if (e.key === 'ArrowLeft') paginate(-1);
    if (e.key === 'Escape') setActiveModule(null);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, activeModule]);

  const selectModule = (id) => {
    setActiveModule(id);
    setCurrentSlide(0);
  };

  if (!activeModule) {
    return <MainMenu onSelectModule={selectModule} />;
  }

  const progress = ((currentSlide + 1) / slidesContent.length) * 100;

  return (
    <div className="app-container">
      <div className="progress-bar" style={{ width: `${progress}%` }} />
      
      <header className="module-header glass-effect">
        <button className="btn-home" onClick={() => setActiveModule(null)}>
          <Home size={20} />
          <span>Início</span>
        </button>
        <span className="module-title">
          {activeModule.toUpperCase().replace('M', 'MÓDULO ')}
        </span>
        <a 
          href={`${import.meta.env.BASE_URL}${getPptxName(activeModule)}`} 
          download 
          className="btn-download"
          title="Baixar PPTX"
        >
          <Download size={20} />
          <span>PPTX</span>
        </a>
      </header>

      <main className="slide-view">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <Slide 
            key={`${activeModule}-${currentSlide}`} 
            content={slidesContent[currentSlide]} 
            direction={direction} 
          />
        </AnimatePresence>
      </main>

      <div className="nav-container glass-effect">
        <button 
          className="btn-nav" 
          onClick={() => paginate(-1)} 
          disabled={currentSlide === 0}
          style={{ opacity: currentSlide === 0 ? 0.3 : 1 }}
        >
          <ChevronLeft size={24} />
        </button>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0 1rem' }}>
            <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'white' }}>
                {currentSlide + 1} / {slidesContent.length}
            </span>
        </div>

        <button 
          className="btn-nav" 
          onClick={() => paginate(1)} 
          disabled={currentSlide === slidesContent.length - 1}
          style={{ opacity: currentSlide === slidesContent.length - 1 ? 0.3 : 1 }}
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <style jsx>{`
        .module-header {
          position: fixed;
          top: 1rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 100;
          display: flex;
          align-items: center;
          gap: 2rem;
          padding: 0.75rem 1.5rem;
          border-radius: 99px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
        }
        .btn-home {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: white;
          padding: 0.4rem 1rem;
          border-radius: 12px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.2s;
        }
        .btn-home:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        .btn-download {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #2f9e44;
          border: none;
          color: white;
          padding: 0.4rem 1rem;
          border-radius: 12px;
          cursor: pointer;
          font-size: 0.8rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
        }
        .btn-download:hover {
          background: #2b8a3e;
          transform: scale(1.05);
        }
        .module-title {
          font-weight: 700;
          letter-spacing: 1px;
          color: #4dabf7;
          flex: 1;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default App;
