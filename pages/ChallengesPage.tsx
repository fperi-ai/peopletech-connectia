
import React from 'react';
import { INITIAL_CHALLENGES, DEMO_USERS } from '../constants';
import { useAuth } from '../contexts/AuthContext';
import Icon from '../components/shared/Icon';
import Avatar from '../components/shared/Avatar';

const ChallengesPage: React.FC = () => {
  const { currentUser } = useAuth();
  const challenges = INITIAL_CHALLENGES; 

  if (!currentUser) return null;

  const userPoints = challenges.reduce((acc, ch) => {
    return acc + (ch.isCompleted && ch.isCompleted(currentUser) ? ch.points : 0);
  }, 0);
  const userLevel = Math.floor(userPoints / 100) + 1; 
  const pointsForNextLevel = (userLevel * 100) - userPoints +1;
  
  const leaderboard = DEMO_USERS.slice(0,3).map((u,idx) => ({
      ...u,
      points: (5-idx) * 75 + Math.floor(Math.random()*50) 
  })).sort((a,b) => b.points - a.points);


  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-primary-DEFAULT mb-2 flex items-center">
        <Icon name="trophy" className="w-8 h-8 mr-2 text-secondary-DEFAULT" /> Retos ConnectIA
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">¡Participa, aprende y gana reconocimiento!</p>

      <div className="bg-card-light dark:bg-card-dark shadow-xl rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between">
            <div>
                <h2 className="text-xl font-semibold text-neutral-textDark dark:text-neutral-textLight">Nivel {userLevel} - Entusiasta ConnectIA</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Puntos acumulados: {userPoints} pts</p>
            </div>
            <Icon name="robot" className="w-10 h-10 text-secondary-DEFAULT" />
        </div>
        <div className="mt-4">
          <div className="w-full bg-neutral-borderLight dark:bg-neutral-borderDark rounded-full h-2.5">
            <div className="bg-accent-DEFAULT h-2.5 rounded-full" style={{ width: `${(100 - (pointsForNextLevel / (userLevel*100))*100 )}%` }}></div>
          </div>
          <p className="text-xs text-right mt-1 text-gray-500 dark:text-gray-400">{pointsForNextLevel} pts para el siguiente nivel</p>
        </div>
        <div className="mt-4 flex space-x-2">
            <span className="text-xs bg-secondary-DEFAULT/20 text-secondary-dark dark:text-secondary-DEFAULT/80 px-2 py-1 rounded-full">🏅 Primer Reto</span>
            {currentUser.bio && <span className="text-xs bg-success/20 text-green-700 dark:text-success/80 px-2 py-1 rounded-full">👤 Perfil Completo</span>}
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-neutral-textDark dark:text-neutral-textLight">Retos Actuales</h2>
      <div className="space-y-4">
        {challenges.map(ch => {
          const completed = ch.isCompleted ? ch.isCompleted(currentUser) : false;
          const progress = ch.progress ? ch.progress(currentUser) : (completed ? 100 : 0);
          return (
            <div key={ch.id} className={`bg-card-light dark:bg-card-dark shadow-lg rounded-lg p-5 border-l-4 ${completed ? 'border-success' : 'border-secondary-DEFAULT'}`}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-textDark dark:text-neutral-textLight">{ch.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{ch.description}</p>
                </div>
                <span className={`font-bold text-lg ${completed ? 'text-success' : 'text-secondary-DEFAULT'}`}>+{ch.points} pts</span>
              </div>
              <div className="mt-3">
                <div className="w-full bg-neutral-borderLight dark:bg-neutral-borderDark rounded-full h-2">
                  <div className={`${completed ? 'bg-success' : 'bg-secondary-DEFAULT'} h-2 rounded-full`} style={{ width: `${progress}%` }}></div>
                </div>
                <p className="text-xs text-right mt-1 text-gray-500 dark:text-gray-400">{progress}% completado</p>
              </div>
              {!completed && ch.actionLink && <a href={ch.actionLink} className="text-sm text-primary-DEFAULT hover:underline mt-2 inline-block">Completar Reto</a>}
              {completed && <p className="text-sm text-success mt-2 font-semibold">¡Completado! 🎉</p>}
            </div>
          );
        })}
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-center text-neutral-textDark dark:text-neutral-textLight">🏆 Leaderboard 🏆</h2>
        <div className="bg-card-light dark:bg-card-dark shadow-xl rounded-lg p-6">
            {leaderboard.map((user, index) => (
                <div key={user.id} className={`flex items-center justify-between p-3 rounded-md mb-2 ${index < 3 ? 'bg-secondary-DEFAULT/10 dark:bg-secondary-dark/20' : 'hover:bg-neutral-bgLight/50 dark:hover:bg-neutral-bgDark/30'}`}>
                    <div className="flex items-center">
                        <span className={`font-bold mr-3 text-lg w-6 ${index < 3 ? 'text-secondary-dark dark:text-secondary-DEFAULT' : 'text-neutral-textDark dark:text-neutral-textLight'}`}>{index + 1}.</span>
                        <Avatar src={user.avatar} alt={user.name} size="sm" />
                        <span className="ml-3 font-medium text-neutral-textDark dark:text-neutral-textLight">{user.name}</span>
                    </div>
                    <span className="font-semibold text-primary-DEFAULT">{user.points} pts</span>
                </div>
            ))}
        </div>
      </div>

    </div>
  );
};

export default ChallengesPage;