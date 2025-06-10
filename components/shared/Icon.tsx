import React from 'react';

// Iconos con emojis
const SunIcon: React.FC = () => (
  <span className="flex items-center justify-center" role="img" aria-label="Sol">☀️</span>
);

const MoonIcon: React.FC = () => (
  <span className="flex items-center justify-center" role="img" aria-label="Luna">🌙</span>
);

const HomeIcon: React.FC = () => (
  <span className="flex items-center justify-center" role="img" aria-label="Inicio">🏠</span>
);

const MegaphoneIcon: React.FC = () => (
  <span className="flex items-center justify-center" role="img" aria-label="Megáfono">📢</span>
);

const UsersIcon: React.FC = () => (
  <span className="flex items-center justify-center" role="img" aria-label="Usuarios">👥</span>
);

const RobotIcon: React.FC = () => ( 
  <span className="flex items-center justify-center" role="img" aria-label="Robot">🤖</span>
);

const AccessibilityIcon: React.FC = () => (
  <span className="flex items-center justify-center" role="img" aria-label="Accesibilidad">♿</span>
);

const SearchIcon: React.FC = () => ( 
  <span className="flex items-center justify-center" role="img" aria-label="Buscar">🔍</span>
);

const EditIcon: React.FC = () => (
  <span className="flex items-center justify-center" role="img" aria-label="Editar">✏️</span>
);

const TrophyIcon: React.FC = () => (
  <span className="flex items-center justify-center" role="img" aria-label="Trofeo">🏆</span>
);

const FaceSmileIcon: React.FC = () => (
  <span className="flex items-center justify-center" role="img" aria-label="Sonrisa">😊</span>
);

const LogoutIcon: React.FC = () => (
  <span className="flex items-center justify-center" role="img" aria-label="Salir">🚪</span>
);

const ChatBubbleIcon: React.FC = () => (
  <span className="flex items-center justify-center" role="img" aria-label="Chat">💬</span>
);

const CloseIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const LockClosedIcon: React.FC = () => (
  <span className="flex items-center justify-center" role="img" aria-label="Bloqueado">🔒</span>
);

const CheckIcon: React.FC = () => (
  <span className="flex items-center justify-center" role="img" aria-label="Verificado">✅</span>
);

const TrashIcon: React.FC = () => (
  <span className="flex items-center justify-center" role="img" aria-label="Eliminar">🗑️</span>
);

const PlusCircleIcon: React.FC = () => (
  <span className="flex items-center justify-center" role="img" aria-label="Añadir">➕</span>
);

const ArrowLeftOnRectangleIcon: React.FC = () => (
  <span className="flex items-center justify-center" role="img" aria-label="Salir">🚪</span>
);

const BellIcon: React.FC = () => (
  <span className="flex items-center justify-center" role="img" aria-label="Notificaciones">🔔</span>
);

const QuestionMarkCircleIcon: React.FC = () => (
  <span className="flex items-center justify-center" role="img" aria-label="Ayuda">❓</span>
);

const InformationCircleIcon: React.FC = () => (
  <span className="flex items-center justify-center" role="img" aria-label="Información">ℹ️</span>
);

const PhotoIcon: React.FC = () => (
  <span className="flex items-center justify-center" role="img" aria-label="Foto">📷</span>
);

const ChevronRightIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

const ChevronLeftIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const PencilIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
  </svg>
);

const CodeIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
  </svg>
);

const ChartBarIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
);


export type IconName = 
  'sun' | 'moon' | 'home' | 'megaphone' | 'trophy' | 'users' | 
  'face-smile' | 'robot' | 'logout' | 'accessibility' | 'chat-bubble' | 
  'close' | 'lock-closed' | 'check' | 'search' | 'edit' | 'trash' |
  'plus-circle' | 'arrow-left-on-rectangle' | 'bell' | 'question-mark-circle' |
  'information-circle' | 'photo' | 'chevron-right' | 'chevron-left' | 'pencil' |
  'code' | 'chart-bar';

interface IconProps {
  name: IconName;
  className?: string;
  titleAccess?: string;
  glassmorphic?: boolean;
}

const Icon: React.FC<IconProps> = ({ name, className, titleAccess, glassmorphic = false }) => {
  const iconMap: Record<IconName, React.FC> = {
    sun: SunIcon,
    moon: MoonIcon,
    home: HomeIcon,
    megaphone: MegaphoneIcon,
    trophy: TrophyIcon,
    users: UsersIcon,
    'face-smile': FaceSmileIcon,
    robot: RobotIcon,
    logout: LogoutIcon,
    accessibility: AccessibilityIcon,
    'chat-bubble': ChatBubbleIcon,
    close: CloseIcon,
    'lock-closed': LockClosedIcon,
    check: CheckIcon,
    search: SearchIcon,
    edit: EditIcon,
    trash: TrashIcon,
    'plus-circle': PlusCircleIcon,
    'arrow-left-on-rectangle': ArrowLeftOnRectangleIcon,
    bell: BellIcon,
    'question-mark-circle': QuestionMarkCircleIcon,
    'information-circle': InformationCircleIcon,
    photo: PhotoIcon,
    'chevron-right': ChevronRightIcon,
    'chevron-left': ChevronLeftIcon,
    'pencil': PencilIcon,
    'code': CodeIcon,
    'chart-bar': ChartBarIcon,
  };

  const SelectedIcon = iconMap[name];

  if (!SelectedIcon) {
    return <span className={`text-red-500 font-bold p-1 ${className || 'w-6 h-6'}`} aria-label="Icono no encontrado">X</span>;
  }

  const glassClasses = glassmorphic ? 'backdrop-blur-sm bg-white/10 dark:bg-neutral-bgDark/20 p-1 rounded-full border border-white/20 dark:border-white/10 shadow-glass-sm' : '';
  
  return (
    <div 
      className={`text-2xl flex items-center justify-center ${glassClasses} ${className}`} 
      title={titleAccess} 
      {...(titleAccess ? {'aria-label': titleAccess, role: 'img'} : {'aria-hidden': true})}
    >
      <SelectedIcon />
    </div>
  );
};

export default Icon;
