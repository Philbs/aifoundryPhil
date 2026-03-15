import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Hotel, Cpu, Rocket } from 'lucide-react';

const MainMenu = ({ onSelectModule }) => {
  const modules = [
    { id: 'm1', title: 'MODULO 01', subtitle: 'Introdução ao AI Foundry', icon: <Cpu />, bg: 'linear-gradient(135deg, #3b82f6, #06b6d4)' },
    { id: 'm2', title: 'MODULO 02', subtitle: 'Building Hotel Agents', icon: <Hotel />, bg: 'linear-gradient(135deg, #a855f7, #6366f1)' },
    { id: 'm3', title: 'MODULO 03', subtitle: 'AI Services Enhancement', icon: <BookOpen />, bg: 'linear-gradient(135deg, #10b981, #14b8a6)' },
    { id: 'm4', title: 'MODULO 04', subtitle: 'Professional Development', icon: <Rocket />, bg: 'linear-gradient(135deg, #f59e0b, #ef4444)' },
  ];

  return (
    <div className="menu-container">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center"
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <h1 className="menu-title">AI Foundry Course</h1>
        <p className="menu-subtitle">
          Selecione um módulo para iniciar sua jornada no desenvolvimento de agentes inteligentes avançados com Azure AI Foundry.
        </p>
      </motion.div>

      <div className="modules-grid">
        {modules.map((mod, index) => (
          <motion.div
            key={mod.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index }}
            onClick={() => onSelectModule(mod.id)}
            className="module-card glass-panel"
          >
            <div className="module-icon" style={{ background: mod.bg }}>
              {mod.icon}
            </div>
            <h2 className="module-card-title">{mod.title}</h2>
            <p className="module-card-subtitle">{mod.subtitle}</p>
            
            <div className="start-button">
              Iniciar Aula
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1 }}
        style={{ marginTop: '4rem', color: '#64748b', fontSize: '0.8rem' }}
      >
        © 2026 AI Foundry Presentation - Microsoft Learn Edition
      </motion.footer>
    </div>
  );
};

export default MainMenu;
