import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import Logo from './Logo';
import Icon, { IconName } from './Icon';
import Avatar from './Avatar';
import { APP_NAME } from '../../constants';

interface NavItem {
  label: string;
  path: string;
  icon: IconName;
}

interface HeaderProps {
  glassmorphic?: boolean;
}

interface MockNotification {
  id: string;
  text: string;
  link?: string;
  read?: boolean;
}

const Header: React.FC<HeaderProps> = ({ glassmorphic = true }) => {
  const { theme, toggleTheme } = useTheme();
  const { currentUser, logout } = useAuth();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationMenuOpen, setIsNotificationMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const userMenuRef = useRef<HTMLDivElement>(null);
  const notificationMenuRef = useRef<HTMLDivElement>(null);
  const userAvatarButtonRef = useRef<HTMLButtonElement>(null);
  const notificationButtonRef = useRef<HTMLButtonElement>(null);


  const [mockNotifications, setMockNotifications] = useState<MockNotification[]>([
    { id: 'notif1', text: `Nuevo anuncio: Plan de Verano en ${APP_NAME}`, link: '/announcements', read: false },
    { id: 'notif2', text: 'Eva Empleado comentó tu último post.', link: '/', read: false },
    { id: 'notif3', text: 'Has completado el reto "Perfil Completo" ¡Felicidades!', link: '/challenges', read: true },
  ]);
  const unreadNotificationCount = mockNotifications.filter(n => !n.read).length;

  const navItems: NavItem[] = [
    { label: 'Inicio', path: '/', icon: 'home' },
    { label: 'El Altavoz', path: '/announcements', icon: 'megaphone' }, // Name already "El Altavoz"
    { label: 'Retos', path: '/challenges', icon: 'trophy' },
    { label: 'Equipos', path: '/teams', icon: 'users' },
    { label: 'Memes IA', path: '/meme-generator', icon: 'face-smile' },
  ];

  const handleLogout = () => {
    if (window.confirm('¿Seguro que quieres cerrar sesión?')) {
      logout(); 
      setIsUserMenuOpen(false); 
    }
  };

  const handleToggleUserMenu = () => {
    setIsUserMenuOpen(prev => !prev);
    if (isNotificationMenuOpen) setIsNotificationMenuOpen(false);
  };
  
  const handleToggleNotificationMenu = () => {
    setIsNotificationMenuOpen(prev => !prev);
    if (isUserMenuOpen) setIsUserMenuOpen(false);
    setMockNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isUserMenuOpen && userMenuRef.current && !userMenuRef.current.contains(event.target as Node) && userAvatarButtonRef.current && !userAvatarButtonRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (isNotificationMenuOpen && notificationMenuRef.current && !notificationMenuRef.current.contains(event.target as Node) && notificationButtonRef.current && !notificationButtonRef.current.contains(event.target as Node) ) {
        setIsNotificationMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isUserMenuOpen, isNotificationMenuOpen]);


  const baseLinkClasses = "px-3 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-all duration-200";
  const activeLinkClasses = glassmorphic 
    ? "bg-white bg-opacity-25 dark:bg-primary-DEFAULT dark:bg-opacity-30 text-primary-dark dark:text-white backdrop-blur-md border border-white border-opacity-20 dark:border-white dark:border-opacity-10 shadow-glass-sm" 
    : "bg-primary-DEFAULT bg-opacity-20 dark:bg-primary-DEFAULT dark:bg-opacity-30 text-primary-dark dark:text-white";
  const inactiveLinkClasses = glassmorphic 
    ? "text-neutral-textDark dark:text-neutral-textLight hover:bg-white hover:bg-opacity-15 dark:hover:bg-neutral-textLight dark:hover:bg-opacity-10 backdrop-blur-sm" 
    : "text-neutral-textDark dark:text-neutral-textLight hover:bg-primary-DEFAULT hover:bg-opacity-10 dark:hover:bg-primary-DEFAULT dark:hover:bg-opacity-20";
  
  return (
    <header className={`${glassmorphic ? 'glass-navbar backdrop-blur-xl' : 'bg-neutral-bgLight bg-opacity-90 dark:bg-neutral-bgDark dark:bg-opacity-90'} sticky top-0 z-50 shadow-md`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" aria-label={`${APP_NAME} - Ir al inicio`}>
              <Logo isDarkMode={theme === 'dark'} className="h-8 md:h-10 w-auto"/>
            </NavLink>
            <nav className="hidden md:ml-6 md:flex md:space-x-2 lg:space-x-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.path}
                  className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon name={item.icon} className="text-lg" titleAccess={item.label} glassmorphic={glassmorphic} />
                  <span className="hidden lg:inline">{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </div>
          
          <div className="hidden md:flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
            <div className="max-w-lg w-full lg:max-w-xs">
              <label htmlFor="search" className="sr-only">Buscar</label>
              <div className="relative text-gray-400 focus-within:text-gray-600">
                <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Icon name="search" className="text-lg" />
                </div>
                <input
                  id="search"
                  className="glass-input block w-full py-2 pl-10 pr-3 leading-5 placeholder-gray-500 dark:placeholder-gray-400 sm:text-sm text-neutral-textDark dark:text-neutral-textLight"
                  placeholder="Buscar..."
                  type="search"
                  name="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>


          <div className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={toggleTheme}
              className="glass p-2 rounded-full hover:bg-white hover:bg-opacity-25 dark:hover:bg-neutral-textLight dark:hover:bg-opacity-15 text-neutral-textDark dark:text-neutral-textLight focus:outline-none"
              aria-label={theme === 'dark' ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            >
              <Icon name={theme === 'dark' ? 'sun' : 'moon'} className="text-lg" glassmorphic={glassmorphic} />
            </button>

            {currentUser && (
              <>
                {/* Notification Button */}
                <div className="relative">
                  <button
                    ref={notificationButtonRef}
                    onClick={handleToggleNotificationMenu}
                    className={`${glassmorphic ? 'glass backdrop-blur-sm border border-white border-opacity-20 dark:border-white dark:border-opacity-10' : 'bg-neutral-bgLight dark:bg-neutral-bgDark border border-neutral-borderLight dark:border-neutral-borderDark'} p-2 rounded-full hover:bg-white hover:bg-opacity-25 dark:hover:bg-neutral-textLight dark:hover:bg-opacity-15 text-neutral-textDark dark:text-neutral-textLight focus:outline-none shadow-glass-sm`}
                    aria-label={`Notificaciones ${unreadNotificationCount > 0 ? `, ${unreadNotificationCount} nuevas` : ''}`}
                    aria-haspopup="true"
                    aria-expanded={isNotificationMenuOpen}
                  >
                    <Icon name="bell" className="text-lg" glassmorphic={glassmorphic} />
                    {unreadNotificationCount > 0 && (
                      <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-card-light dark:ring-card-dark bg-error" /> 
                    )}
                  </button>
                  {isNotificationMenuOpen && (
                    <div 
                        ref={notificationMenuRef}
                        className={`${glassmorphic ? 'glass backdrop-blur-lg bg-white/20 dark:bg-neutral-bgDark/30 border border-white/20 dark:border-white/10' : 'bg-neutral-bgLight dark:bg-neutral-bgDark border border-neutral-borderLight dark:border-neutral-borderDark'} origin-top-right absolute right-0 mt-2 w-72 sm:w-80 shadow-glass py-1 z-50 max-h-96 overflow-y-auto rounded-xl`}
                        role="menu" aria-orientation="vertical" aria-labelledby="notification-menu-button"
                    >
                        <div className="px-4 py-2 text-sm font-semibold text-neutral-textDark dark:text-neutral-textLight border-b border-neutral-borderLight dark:border-neutral-borderDark">Notificaciones</div>
                        {mockNotifications.length === 0 ? (
                            <p className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">No hay notificaciones.</p>
                        ) : (
                            mockNotifications.map(notif => (
                            <Link
                                key={notif.id}
                                to={notif.link || '#'}
                                className={`block px-4 py-3 text-sm hover:bg-primary-DEFAULT/10 dark:hover:bg-primary-dark/20 ${notif.read ? 'text-gray-500 dark:text-gray-400' : 'text-neutral-textDark dark:text-neutral-textLight font-medium'}`}
                                role="menuitem"
                                onClick={() => setIsNotificationMenuOpen(false)}
                            >
                                {notif.text}
                            </Link>
                            ))
                        )}
                    </div>
                  )}
                </div>

                {/* User Avatar and Menu */}
                <div className="relative">
                  <button 
                    ref={userAvatarButtonRef}
                    onClick={handleToggleUserMenu} 
                    className={`${glassmorphic ? 'glass backdrop-blur-sm' : 'bg-neutral-bgLight dark:bg-neutral-bgDark'} flex items-center p-1 rounded-full hover:bg-white hover:bg-opacity-25 dark:hover:bg-neutral-textLight dark:hover:bg-opacity-15 focus:outline-none shadow-glass-sm`}
                    aria-label="Abrir menú de usuario"
                    aria-haspopup="true"
                    aria-expanded={isUserMenuOpen}
                   >
                    <Avatar src={currentUser.avatar} alt={currentUser.name} size="sm" />
                  </button>
                  {isUserMenuOpen && (
                    <div 
                        ref={userMenuRef}
                        className={`${glassmorphic ? 'glass backdrop-blur-lg bg-white/20 dark:bg-neutral-bgDark/30 border border-white/20 dark:border-white/10' : 'bg-neutral-bgLight dark:bg-neutral-bgDark border border-neutral-borderLight dark:border-neutral-borderDark'} origin-top-right absolute right-0 mt-2 w-56 shadow-glass py-1 focus:outline-none z-50 rounded-xl`}
                        role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button"
                    >
                      <div className="px-4 py-3 border-b border-neutral-borderLight dark:border-neutral-borderDark">
                        <p className="text-sm font-semibold text-neutral-textDark dark:text-neutral-textLight" role="none">{currentUser.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate" role="none">{currentUser.email}</p>
                      </div>
                      <NavLink to={`/profile/${currentUser.id}`} className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-textDark dark:text-neutral-textLight hover:bg-primary-DEFAULT/10 dark:hover:bg-primary-dark/20 w-full text-left" role="menuitem" onClick={()=>setIsUserMenuOpen(false)}>
                        <Icon name="users" className="text-lg" glassmorphic={glassmorphic}/> Ver Perfil
                      </NavLink>
                      <NavLink to="/welcome" className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-textDark dark:text-neutral-textLight hover:bg-primary-DEFAULT/10 dark:hover:bg-primary-dark/20 w-full text-left" role="menuitem" onClick={()=>setIsUserMenuOpen(false)}>
                        <Icon name="information-circle" className="text-lg" glassmorphic={glassmorphic}/> Acerca de
                      </NavLink>
                      <Link to="/help" className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-textDark dark:text-neutral-textLight hover:bg-primary-DEFAULT/10 dark:hover:bg-primary-dark/20 w-full text-left" role="menuitem" onClick={()=>setIsUserMenuOpen(false)}>
                        <Icon name="question-mark-circle" className="text-lg" glassmorphic={glassmorphic}/> Ayuda
                      </Link>
                      <button onClick={handleLogout} className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-error hover:bg-error/10" role="menuitem">
                        <Icon name="logout" className="text-base" glassmorphic={glassmorphic}/> Cerrar Sesión
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
            
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`${glassmorphic ? 'glass backdrop-blur-sm border border-white border-opacity-20 dark:border-white dark:border-opacity-10' : 'bg-neutral-bgLight dark:bg-neutral-bgDark border border-neutral-borderLight dark:border-neutral-borderDark'} p-2 rounded-xl text-neutral-textDark dark:text-neutral-textLight hover:bg-white hover:bg-opacity-25 dark:hover:bg-neutral-textLight dark:hover:bg-opacity-15 focus:outline-none shadow-glass-sm`}
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
                aria-label="Abrir menú principal"
              >
                {isMobileMenuOpen ? (
                  <Icon name="close" className="block text-xl" glassmorphic={glassmorphic} />
                ) : (
                  // Hamburger icon SVG
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className={`${glassmorphic ? 'glass md:hidden backdrop-blur-lg bg-white/20 dark:bg-neutral-bgDark/30 border-t border-white/20 dark:border-white/10' : 'bg-neutral-bgLight dark:bg-neutral-bgDark border-t border-neutral-borderLight dark:border-neutral-borderDark'} md:hidden`} id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
             <div className="px-1 py-2">
                <label htmlFor="search-mobile" className="sr-only">Buscar</label>
                <div className="relative text-gray-400 focus-within:text-gray-600">
                    <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Icon name="search" className="text-lg" glassmorphic={glassmorphic} />
                    </div>
                    <input
                    id="search-mobile"
                    className="glass-input block w-full py-2 pl-10 pr-3 leading-5 placeholder-gray-500 dark:placeholder-gray-400 sm:text-sm text-neutral-textDark dark:text-neutral-textLight"
                    placeholder="Buscar..."
                    type="search"
                    name="search_mobile"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) => `block ${baseLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}
              >
                <Icon name={item.icon} className="text-lg" titleAccess={item.label} />
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;