import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { APP_NAME, DEMO_USERS } from '../constants';
import Icon from '../components/shared/Icon';
import { User, UserRole } from '../types';

// New Welcome Page Components
import DynamicGreeting from '../components/welcome/DynamicGreeting';
import ConnieQuote from '../components/welcome/ConnieQuote';


// Local types and constants to fix missing imports
interface CompanyValue {
  title: string;
  description: string;
  emoji: string;
}

interface Feature {
  text: string;
  icon: string;
}

const COMPANY_VALUES: CompanyValue[] = [
  { title: 'Innovación Constante', description: 'Buscamos y aplicamos las últimas tendencias para mejorar continuamente.', emoji: '🚀' },
  { title: 'Colaboración Radical', description: 'Creemos que juntos somos más fuertes y fomentamos la comunicación abierta.', emoji: '🤝' },
  { title: 'Foco en las Personas', description: 'El bienestar y desarrollo de nuestro equipo es nuestra máxima prioridad.', emoji: '❤️' },
];

const FEATURES: Feature[] = [
    { text: "Comparte actualizaciones en el Feed y reacciona a las de otros.", icon: "chat-bubble" },
    { text: `Infórmate de anuncios importantes de la compañía en El Altavoz.`, icon: "megaphone" },
    { text: `Participa en retos divertidos en Retos ${APP_NAME} para ganar puntos.`, icon: "trophy" },
    { text: "Únete a equipos o comunidades de interés y colabora en sus propios espacios.", icon: "users" },
    { text: `Prueba nuestro asistente IA para generar memes o descubrir datos curiosos.`, icon: "robot" }
];

const COMPANY_LEADERS = DEMO_USERS.filter(u => u.role === UserRole.ADMIN || u.role === UserRole.MANAGER).slice(0, 3);

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();
  const { setFirstLoginComplete } = useAuth();

  const handleContinue = () => {
    setFirstLoginComplete();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-neutral-bgLight dark:bg-neutral-bgDark flex flex-col items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center">
        
        {/* RF-02, RF-03, RF-04, RF-05, RF-10, RF-11: New Hero Section */}
        <div className="w-full flex justify-center">
          <header className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16 w-full max-w-7xl mx-auto">
          <div className="text-center">
            <DynamicGreeting baseText={`${APP_NAME}: Innovación con Alma`} />
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-xl mx-auto md:mx-0">
              Descubre una nueva forma de conectar, colaborar y crecer en PeopleTech.
            </p>
            <div className="mt-8 flex flex-col items-center space-y-4">
              <button 
                onClick={handleContinue}
                className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-400 dark:text-white font-bold px-8 py-3 text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 w-full sm:w-auto"
              >
                Comenzar ahora
              </button>
              <ConnieQuote />
            </div>
          </div>
          <div className="hidden md:flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-lg p-8 w-full lg:w-1/2 aspect-square">
            {/* TODO: Reemplazar con una imagen real de la red social */}
            <img src="/images/welcome-peopletech-connectia.jpg" alt="Ilustración de red social" className="max-w-full max-h-full object-contain rounded-lg" />
          </div>
        </header>
        </div>

        {/* RF-06, RF-09: Compacted and interactive sections */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-center text-neutral-textDark dark:text-neutral-textLight mb-6">Nuestra Cultura</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COMPANY_VALUES.map((value: CompanyValue) => (
              <div key={value.title} className="p-6 bg-card-light dark:bg-card-dark rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <h3 className="font-bold text-lg text-neutral-textDark dark:text-neutral-textLight">{value.emoji} {value.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* RF-07: Soft separator */}
        <hr className="my-12 border-gray-200 dark:border-gray-700" />

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center text-neutral-textDark dark:text-neutral-textLight mb-6">Conoce al Equipo Directivo</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {COMPANY_LEADERS.map((leader: User) => (
              <div key={leader.name} className="p-4 text-center bg-card-light dark:bg-card-dark shadow-lg rounded-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <img src={leader.avatar} alt={`Avatar de ${leader.name}`} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-primary-light" />
                <h3 className="font-semibold text-neutral-textDark dark:text-neutral-textLight">{leader.name}</h3>
                <p className="text-sm text-primary-DEFAULT dark:text-primary-light">{leader.roleDescription}</p>
                <p className="text-sm italic mt-2 text-gray-700 dark:text-gray-100">"{leader.quote}"</p>
              </div>
            ))}
          </div>
        </section>

        {/* RF-08: Video Section */}
        <section className="my-12">
          <h2 className="text-3xl font-bold text-center text-neutral-textDark dark:text-neutral-textLight mb-6">Inspírate en PeopleTech Connectia</h2>
          <div className="aspect-w-16 aspect-h-9 max-w-4xl mx-auto">
            <video src="/videos/peopletech-connectia-intro.mp4" controls className="w-full h-full rounded-lg shadow-xl"></video>
          </div>
        </section>

        <section className="bg-card-light dark:bg-card-dark shadow-xl rounded-lg p-6 sm:p-8 mt-12">
          <h2 className="text-2xl font-semibold mb-5 text-center text-neutral-textDark dark:text-neutral-textLight">¿Qué puedes hacer en {APP_NAME}?</h2>
          <ul className="space-y-4 max-w-2xl mx-auto">
            {FEATURES.map((feature: Feature) => (
              <li key={feature.text} className="flex items-start p-3 bg-neutral-bgLight dark:bg-neutral-bgDark/50 rounded-md hover:bg-neutral-bgLight/80 dark:hover:bg-neutral-bgDark/70 transition-colors">
                <Icon name={feature.icon as any} className="text-2xl mr-4 flex-shrink-0 text-primary-DEFAULT dark:text-primary-light" />
                <span className="text-neutral-textDark dark:text-black font-medium">{feature.text}</span>
              </li>
            ))}
          </ul>
        </section>

      </div>
    </div>
  );
};

export default WelcomePage;
