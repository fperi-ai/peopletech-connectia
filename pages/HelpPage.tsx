
import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/shared/Icon';
import Button from '../components/shared/Button';
import { APP_NAME, AI_ASSISTANT_NAME } from '../constants';

const HelpPage: React.FC = () => {
  const faqs = [
    {
      q: `¿Qué es ${APP_NAME}?`,
      a: `${APP_NAME} es la red social interna de People Tech en Inditex, diseñada para conectar a los empleados, fomentar la colaboración y explorar el potencial de la Inteligencia Artificial de una manera divertida y productiva.`,
    },
    {
      q: `¿Cómo puedo usar a ${AI_ASSISTANT_NAME}?`,
      a: `${AI_ASSISTANT_NAME} es tu asistente IA. Puedes interactuar con ${AI_ASSISTANT_NAME} a través del botón flotante en la esquina inferior izquierda para obtener información, generar memes, o simplemente charlar. También encontrarás sugerencias de ${AI_ASSISTANT_NAME} en varias partes de la plataforma.`,
    },
    {
      q: '¿Cómo funcionan los Retos?',
      a: 'En la sección de Retos, encontrarás desafíos diseñados para ayudarte a explorar la plataforma, conectar con otros y aprender. Completar retos te otorga puntos y reconocimiento. ¡Intenta completarlos todos!',
    },
    {
      q: '¿Para qué sirven los Equipos?',
      a: 'Los Equipos son espacios dedicados para grupos con intereses comunes, ya sean proyectos, departamentos, hobbies o temas sociales. Puedes unirte a equipos existentes o, si tienes permisos, crear los tuyos propios.',
    },
    {
      q: '¿Cómo puedo editar mi perfil?',
      a: 'Puedes editar tu perfil haciendo clic en tu avatar en la esquina superior derecha, seleccionando "Ver Perfil" y luego usando el botón "Editar Perfil" en tu página de perfil.',
    },
     {
      q: 'Olvidé mi contraseña, ¿qué hago?',
      a: `Por ahora, esta es una aplicación de demostración con usuarios predefinidos. En un entorno real, habría una opción de "Olvidé mi contraseña". Para esta demo, puedes usar las credenciales de las cuentas demo disponibles en la página de inicio de sesión.`,
    }
  ];

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="text-center mb-10">
        <Icon name="question-mark-circle" className="w-16 h-16 mx-auto text-primary-DEFAULT mb-3" />
        <h1 className="text-3xl font-bold text-neutral-textDark dark:text-neutral-textLight">Centro de Ayuda</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">¿Tienes preguntas? ¡Estamos aquí para ayudarte!</p>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary-DEFAULT">Preguntas Frecuentes (FAQ)</h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-card-light dark:bg-card-dark p-5 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-neutral-textDark dark:text-neutral-textLight mb-1">{faq.q}</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center bg-primary-DEFAULT/10 dark:bg-primary-dark/10 p-6 rounded-lg shadow-inner">
        <h2 className="text-xl font-semibold mb-3 text-primary-dark dark:text-primary-light">¿No encontraste lo que buscabas?</h2>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
          Intenta preguntar directamente a {AI_ASSISTANT_NAME} usando el botón flotante, o contacta con el equipo de People Tech.
        </p>
        <Button onClick={() => alert(`Contactando con soporte (simulado)... ${AI_ASSISTANT_NAME} dice: ¡Estaré encantado de ayudarte si me preguntas por el chat flotante!`)} variant="primary">
          Contactar Soporte (Simulado)
        </Button>
      </section>
      
      <div className="mt-10 text-center">
        <Link to="/">
          <Button variant="ghost">
            <Icon name="home" className="w-4 h-4 mr-2"/>
            Volver al Inicio
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HelpPage;