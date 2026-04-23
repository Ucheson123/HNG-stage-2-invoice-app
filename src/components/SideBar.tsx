import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function Sidebar() {
  const { theme, toggleTheme } = useContext(AppContext);

  return (
    <aside className="sidebar">
      
      {/* LOGO AREA */}
      <div className="sidebar-logo">
        <h2 style={{ color: 'white' }}>Logo</h2>
      </div>

      {/* BOTTOM / RIGHT AREA */}
      <div className="sidebar-controls">
        
        <button 
          onClick={toggleTheme}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.25rem' }}
          aria-label="Toggle Dark Mode"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>

        <div className="sidebar-divider"></div>

        <img 
          src="/image-avatar.jpg" 
          alt="User Avatar"
          style={{ width: '32px', height: '32px', borderRadius: '50%' }}
        />
      </div>

    </aside>
  );
}