
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { APP_NAME, AI_ASSISTANT_NAME, DEMO_USERS, CONNIE_QUOTES } from '../constants';
import Button from '../components/shared/Button';
import Icon from '../components/shared/Icon';
import Avatar from '../components/shared/Avatar';
import { UserRole } from '../types';

const WelcomePage: React.FC = () => {
  const { currentUser, setFirstLoginComplete } = useAuth();
  const navigate = useNavigate();
  const [currentBenefitIndex, setCurrentBenefitIndex] = useState(0);
  const [typewriterText, setTypewriterText] = useState('');
  const typewriterTargetText = "Conectar, Colaborar, Crear...";
  const typewriterRef = useRef(0);

  const benefits = [
    `${APP_NAME}: Innovación con Alma.`,
    "Descubre una nueva forma de trabajar juntos.",
    "La IA a tu servicio, de forma amigable.",
    "¡Prepárate para sorprenderte!"
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentBenefitIndex((prevIndex) => (prevIndex + 1) % benefits.length);
    }, 3000);
    return () => clearTimeout(timer);
  }, [currentBenefitIndex, benefits.length]);

  useEffect(() => {
    typewriterRef.current = 0; 
    setTypewriterText(''); 
    const typeInterval = setInterval(() => {
      setTypewriterText((prev) => {
        const nextChar = typewriterTargetText[typewriterRef.current];
        if (nextChar) {
          typewriterRef.current += 1;
          return prev + nextChar;
        } else {
          clearInterval(typeInterval);
          return prev;
        }
      });
    }, 100);
    return () => clearInterval(typeInterval);
  }, [typewriterTargetText]);


  const handleContinue = () => {
    setFirstLoginComplete();
    navigate('/');
  };

  if (!currentUser) {
    navigate('/login');
    return null;
  }
  
  const peopleTechLeaders = DEMO_USERS.filter(u => u.role === UserRole.ADMIN || u.role === UserRole.MANAGER).slice(0,3);

  const features = [
    { text: "Comparte actualizaciones en el Feed y reacciona a las de otros.", icon: "chat-bubble" as const, emoji: "💬" },
    { text: `Infórmate de anuncios importantes de la compañía en El Altavoz (la sección de anuncios corporativos).`, icon: "megaphone" as const, emoji: "📢" },
    { text: `Participa en retos divertidos en Retos ${APP_NAME} para ganar puntos y reconocimientos.`, icon: "trophy" as const, emoji: "🏆" },
    { text: "Únete a equipos o comunidades de interés y colabora en sus propios espacios.", icon: "users" as const, emoji: "🧑‍🤝‍🧑" },
    { text: `Prueba nuestro asistente IA “${AI_ASSISTANT_NAME}” para generar memes o descubrir datos curiosos sobre tus compañeros (¡siempre con respeto y humor!).`, icon: "robot" as const, emoji: "✨" }
  ];
  
  return (
    <div className="min-h-screen bg-neutral-bgLight dark:bg-neutral-bgDark text-neutral-textDark dark:text-neutral-textLight py-12 px-4 sm:px-6 lg:px-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-2">
            ¡Bienvenido, {currentUser.name}! 👋
          </h1>
          <p className="text-2xl text-primary-DEFAULT dark:text-primary-light mb-2">
            {APP_NAME}: Innovación con Alma.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-400 min-h-[2.5rem]">
            {typewriterText}
            <span className="animate-ping">_</span>
          </p>
          <p className="text-md text-gray-600 dark:text-gray-300 mt-2">
            {benefits[currentBenefitIndex]}
          </p>
           <p className="text-md text-gray-500 dark:text-gray-400 mt-3">
            La red donde las personas y la inteligencia artificial innovan juntas en Inditex.
          </p>
        </header>

        <section className="bg-card-light dark:bg-card-dark shadow-xl rounded-lg p-6 sm:p-8 mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-primary-DEFAULT">Misión y Visión PeopleTech</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            People Tech es el área de Inditex que impulsa la transformación digital de nuestros equipos. {APP_NAME} nace para acercar la IA a cada persona, facilitando la colaboración, la creatividad y el aprendizaje dentro de nuestra gran familia.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-6 text-center text-primary-DEFAULT">Valores y Cultura</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Innovación', text: `Adoptamos tecnologías emergentes (¡hola ${AI_ASSISTANT_NAME}!) para mejorar nuestro día a día.`, iconName: "robot" as const },
              { title: 'Colaboración', text: 'Una sola voz: comparte, comenta y construye en equipo.', iconName: "users" as const },
              { title: 'Humor y Humanidad', text: 'La tecnología con calidez humana; porque trabajar también puede ser divertido.', iconName: "face-smile" as const },
            ].map(value => (
              <div key={value.title} className="bg-card-light dark:bg-card-dark shadow-lg rounded-lg p-6 text-center transition-all hover:shadow-xl hover:scale-105">
                <div className="flex justify-center mb-4">
                    <Icon name={value.iconName} className="w-10 h-10 text-secondary-DEFAULT" />
                </div>
                <h3 className="text-xl font-medium mb-2 text-neutral-textDark dark:text-neutral-textLight">{value.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{value.text}</p>
              </div>
            ))}
          </div>
        </section>
        
        <section className="mb-10 bg-primary-DEFAULT/5 dark:bg-primary-dark/10 p-6 sm:p-8 rounded-lg shadow-inner">
          <h2 className="text-2xl font-semibold mb-6 text-center text-primary-dark dark:text-primary-light">Conoce al Equipo Líder (PeopleTech)</h2>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            {peopleTechLeaders.map(leader => (
              <div key={leader.id} className="bg-card-light dark:bg-card-dark shadow-lg rounded-lg p-4 w-full sm:w-56 text-center transform transition-transform hover:scale-105">
                <Avatar src={leader.avatar} alt={leader.name} size="lg" className="mx-auto mb-3 ring-2 ring-primary-DEFAULT/30" />
                <h3 className="font-semibold text-neutral-textDark dark:text-neutral-textLight">{leader.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{leader.role} - People Tech</p>
                <p className="text-xs italic mt-2 text-gray-600 dark:text-gray-300">"Creemos en el potencial de nuestra gente potenciado por IA."</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-card-light dark:bg-card-dark shadow-xl rounded-lg p-6 sm:p-8 mb-10">
          <h2 className="text-2xl font-semibold mb-5 text-primary-DEFAULT">¿Qué puedes hacer en {APP_NAME}?</h2>
          <ul className="space-y-4">
            {features.map(feature => (
              <li key={feature.text} className="flex items-start p-3 bg-neutral-bgLight dark:bg-neutral-bgDark/50 rounded-md hover:bg-neutral-bgLight/80 dark:hover:bg-neutral-bgDark/70 transition-colors">
                <span className="text-2xl mr-3 flex-shrink-0">{feature.emoji}</span>
                <span className="text-gray-700 dark:text-gray-300">{feature.text}</span>
              </li>
            ))}
          </ul>
        </section>
        
        <div className="fixed bottom-5 right-5 bg-secondary-DEFAULT text-white p-3 rounded-full shadow-lg flex items-center motion-safe:animate-bounce z-50">
            <Icon name="robot" className="w-6 h-6 mr-2"/>
            <span className="text-sm hidden sm:inline">¡{AI_ASSISTANT_NAME} está aquí si necesitas ayuda o un meme graciosillo 😊!</span>
            <span className="text-sm sm:hidden">{AI_ASSISTANT_NAME} aquí 😊</span>
        </div>

        <div className="text-center mt-12 mb-6">
          <Button onClick={handleContinue} size="lg" className="px-10 py-4 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
            ¡Vamos allá! Entrar a {APP_NAME}
            <Icon name="home" className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;