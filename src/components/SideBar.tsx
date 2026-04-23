import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import logoImg from '../assets/image/logo.png.png'

export default function Sidebar() {
  const { theme, toggleTheme } = useContext(AppContext);

  return (
    <aside className="sidebar">
      {/* 2. Replace the "Logo" text with your image */}
      <div className="sidebar-logo" style={{ padding: 0, overflow: 'hidden' }}>
        <img 
          src={logoImg} 
          alt="Invoice App Logo" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
      </div>

      <div className="sidebar-controls">
        {/* Theme Toggle Button */}
        <button 
          onClick={toggleTheme} 
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.25rem' }}
          aria-label="Toggle Dark Mode"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>

        <div className="sidebar-divider"></div>

        {/* 3. Fix the broken user avatar with a placeholder! */}
        <div className="user-avatar" style={{ cursor: 'pointer' }}>
          <img 
            src="https://i.pravatar.cc/150?img=11" 
            alt="User Avatar" 
            style={{ width: '32px', height: '32px', borderRadius: '50%' }}
          />
        </div>
      </div>
    </aside>
  );
}