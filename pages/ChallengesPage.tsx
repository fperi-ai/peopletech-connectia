import React, { useState } from 'react'
import { INITIAL_CHALLENGES } from '../constants'
import { useAuth } from '../contexts/AuthContext'
import Icon from '../components/shared/Icon'
import Button from '../components/shared/Button'
import Modal from '../components/shared/Modal'
import { ChallengesSidebar } from '../components/challenges/sidebar/ChallengesSidebar'
import { useChallengesSidebarState } from '../components/challenges/sidebar/hooks/useChallengesSidebarState'
import { Challenge, UserRole } from '../types'

const ChallengesPage: React.FC = () => {
  const { currentUser } = useAuth()
  const { isOpen } = useChallengesSidebarState()
  const [challenges, setChallenges] = useState<Challenge[]>(INITIAL_CHALLENGES)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [newChallengeTitle, setNewChallengeTitle] = useState('')
  const [newChallengeDescription, setNewChallengeDescription] = useState('')
  const [newChallengePoints, setNewChallengePoints] = useState(50)

  if (!currentUser) return null

  const userPoints = challenges.reduce((acc, ch) => {
    return acc + (ch.isCompleted && ch.isCompleted(currentUser) ? ch.points : 0)
  }, 0)
  const userLevel = Math.floor(userPoints / 100) + 1
  const pointsForNextLevel = userLevel * 100 - userPoints + 1

  const canCreateChallenge =
    currentUser.role === UserRole.ADMIN ||
    currentUser.role === UserRole.MANAGER

  const handleCreateChallenge = () => {
    if (
      !currentUser ||
      !newChallengeTitle.trim() ||
      !newChallengeDescription.trim()
    )
      return

    const newChallenge: Challenge = {
      id: `challenge-${Date.now()}`,
      title: newChallengeTitle.trim(),
      description: newChallengeDescription.trim(),
      points: newChallengePoints,
      isCompleted: () => false,
      progress: () => 0,
    }

    setChallenges((prev) => [newChallenge, ...prev])
    setNewChallengeTitle('')
    setNewChallengeDescription('')
    setNewChallengePoints(50)
    setIsCreateModalOpen(false)
  }

  const resetForm = () => {
    setNewChallengeTitle('')
    setNewChallengeDescription('')
    setNewChallengePoints(50)
  }

  return (
    <>
      <div className="container mx-auto px-4 md:px-6 pb-32 relative">
        <ChallengesSidebar />
        <div
          className={`transition-all duration-300 ${
            isOpen ? 'lg:pr-80' : 'lg:pr-0'
          }`}
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-primary-DEFAULT flex items-center">
                <Icon
                  name="trophy"
                  className="w-8 h-8 mr-2 text-secondary-DEFAULT"
                />{' '}
                Retos ConnectIA
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                ¡Participa, aprende y gana reconocimiento!
              </p>
            </div>
            {canCreateChallenge && (
              <Button
                leftIcon={<Icon name="plus-circle" className="w-4 h-4" />}
                onClick={() => setIsCreateModalOpen(true)}
              >
                Nuevo Reto
              </Button>
            )}
          </div>

          {/* Nivel y progreso */}
          <div className="bg-card-light dark:bg-card-dark shadow-xl rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-neutral-textDark dark:text-neutral-textLight">
                  Nivel {userLevel} - Entusiasta ConnectIA
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Puntos acumulados: {userPoints} pts
                </p>
              </div>
              <Icon
                name="robot"
                className="w-10 h-10 text-secondary-DEFAULT"
              />
            </div>
            <div className="mt-4">
              <div className="w-full bg-neutral-borderLight dark:bg-neutral-borderDark rounded-full h-2.5">
                <div
                  className="bg-accent-DEFAULT h-2.5 rounded-full"
                  style={{
                    width: `${((userLevel * 100 - pointsForNextLevel) /
                      (userLevel * 100)) *
                      100}%`,
                  }}
                />
              </div>
              <p className="text-xs text-right mt-1 text-gray-500 dark:text-gray-400">
                {pointsForNextLevel} pts para el siguiente nivel
              </p>
            </div>
            <div className="mt-4 flex space-x-2">
              <span className="text-xs bg-secondary-DEFAULT/20 text-secondary-dark dark:text-secondary-DEFAULT/80 px-2 py-1 rounded-full">
                🏅 Primer Reto
              </span>
              {currentUser.bio && (
                <span className="text-xs bg-success/20 text-green-700 dark:text-success/80 px-2 py-1 rounded-full">
                  👤 Perfil Completo
                </span>
              )}
            </div>
          </div>

          {/* Lista de retos */}
          <h2 className="text-2xl font-semibold mb-4 text-neutral-textDark dark:text-neutral-textLight">
            Retos Actuales
          </h2>
          <div className="space-y-4">
            {challenges.map((ch) => {
              const completed = ch.isCompleted
                ? ch.isCompleted(currentUser)
                : false
              const progress = ch.progress
                ? ch.progress(currentUser)
                : completed
                ? 100
                : 0
              return (
                <div
                  key={ch.id}
                  className={`bg-card-light dark:bg-card-dark shadow-lg rounded-lg p-5 border-l-4 ${
                    completed ? 'border-success' : 'border-secondary-DEFAULT'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-textDark dark:text-neutral-textLight">
                        {ch.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {ch.description}
                      </p>
                    </div>
                    <span
                      className={`font-bold text-lg ${
                        completed ? 'text-success' : 'text-secondary-DEFAULT'
                      }`}
                    >
                      +{ch.points} pts
                    </span>
                  </div>
                  <div className="mt-3">
                    <div className="w-full bg-neutral-borderLight dark:bg-neutral-borderDark rounded-full h-2 overflow-hidden">
                      <div
                        className={`${
                          completed ? 'bg-success' : 'bg-secondary-DEFAULT'
                        } h-2 rounded-full`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-right mt-1 text-gray-500 dark:text-gray-400">
                      {progress}% completado
                    </p>
                  </div>
                  {completed ? (
                    <p className="text-sm text-success mt-2 font-semibold">
                      ¡Completado! 🎉
                    </p>
                  ) : null}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Modal de creación de retos */}
      {isCreateModalOpen && (
        <Modal
          isOpen={isCreateModalOpen}
          title="Crear Nuevo Reto"
          onClose={() => {
            setIsCreateModalOpen(false)
            resetForm()
          }}
        >
          <div className="space-y-4 p-1">
            <div>
              <label
                htmlFor="challenge-title"
                className="block text-sm font-medium text-neutral-textDark dark:text-neutral-textLight mb-1"
              >
                Título
              </label>
              <input
                type="text"
                id="challenge-title"
                value={newChallengeTitle}
                onChange={(e) => setNewChallengeTitle(e.target.value)}
                className="w-full p-2 border rounded text-neutral-textDark dark:text-neutral-textLight bg-neutral-bgLight dark:bg-neutral-bgDark border-neutral-borderLight dark:border-neutral-borderDark focus:ring-primary-DEFAULT focus:border-primary-DEFAULT"
                placeholder="Título del reto"
              />
            </div>
            <div>
              <label
                htmlFor="challenge-description"
                className="block text-sm font-medium text-neutral-textDark dark:text-neutral-textLight mb-1"
              >
                Descripción
              </label>
              <textarea
                id="challenge-description"
                value={newChallengeDescription}
                onChange={(e) =>
                  setNewChallengeDescription(e.target.value)
                }
                rows={3}
                className="w-full p-2 border rounded text-neutral-textDark dark:text-neutral-textLight bg-neutral-bgLight dark:bg-neutral-bgDark border-neutral-borderLight dark:border-neutral-borderDark focus:ring-primary-DEFAULT focus:border-primary-DEFAULT"
                placeholder="Describe en qué consiste el reto..."
              />
            </div>
            <div>
              <label
                htmlFor="challenge-points"
                className="block text-sm font-medium text-neutral-textDark dark:text-neutral-textLight mb-1"
              >
                Puntos
              </label>
              <input
                type="number"
                id="challenge-points"
                value={newChallengePoints}
                onChange={(e) =>
                  setNewChallengePoints(
                    Math.max(1, parseInt(e.target.value) || 0),
                  )
                }
                min="1"
                max="100"
                className="w-full p-2 border rounded text-neutral-textDark dark:text-neutral-textLight bg-neutral-bgLight dark:bg-neutral-bgDark border-neutral-borderLight dark:border-neutral-borderDark focus:ring-primary-DEFAULT focus:border-primary-DEFAULT"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="ghost"
                onClick={() => {
                  setIsCreateModalOpen(false)
                  resetForm()
                }}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleCreateChallenge}
                disabled={
                  !newChallengeTitle.trim() ||
                  !newChallengeDescription.trim()
                }
              >
                Crear Reto
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}

export default ChallengesPage;
