
import React, { useState } from 'react';

import { MEME_TEMPLATES, AI_ASSISTANT_NAME } from '../constants';
import { MemeTemplate } from '../types';
import Button from '../components/shared/Button';
import Icon from '../components/shared/Icon';
import { generateMemeWithGemini, simulateMemeGeneration } from '../services/geminiService'; 

const MemeGeneratorPage: React.FC = () => {
  const [idea, setIdea] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<MemeTemplate | null>(MEME_TEMPLATES[0]);
  const [generatedMemeUrl, setGeneratedMemeUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const handleGenerateMeme = async () => {
    if (!idea.trim() && !selectedTemplate) {
      setError("Necesitas una idea o una plantilla para el meme 🤔");
      return;
    }
    setError(null);
    setIsLoading(true);
    setGeneratedMemeUrl(null);

    try {
      const memePrompt = selectedTemplate ? `Meme con plantilla "${selectedTemplate.name}" e idea: "${idea}"` : `Meme con idea: "${idea}"`;
      let resultUrl: string | null;

      if (process.env.API_KEY) { 
        resultUrl = await generateMemeWithGemini(memePrompt, selectedTemplate?.imageUrl);
      } else {
        resultUrl = await simulateMemeGeneration(idea, selectedTemplate?.imageUrl);
      }
      
      if (resultUrl) {
        setGeneratedMemeUrl(resultUrl);
      } else {
        setError(`¡${AI_ASSISTANT_NAME} no pudo generar el meme! Intenta otra idea.`);
      }
    } catch (e) {
      console.error("Meme generation error:", e);
      setError("Algo salió mal. Inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleShareToFeed = () => {
    if (generatedMemeUrl) {
      console.log("Share to feed:", generatedMemeUrl);
      alert("¡Meme listo para compartir! (Funcionalidad de compartir en feed no implementada en esta demo)");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary-DEFAULT mb-2 flex items-center justify-center">
          <Icon name="face-smile" className="w-8 h-8 mr-2 text-secondary-DEFAULT" /> Generador de Memes IA con {AI_ASSISTANT_NAME}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">¡Demuestra tu creatividad y arranca risas!</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-card-light dark:bg-card-dark shadow-xl rounded-lg p-6">
          <div className="mb-6">
            <label htmlFor="idea" className="block text-sm font-medium mb-1 text-neutral-textDark dark:text-neutral-textLight">Tu idea para el meme:</label>
            <textarea
              id="idea"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="Ej: Cuando es lunes y la IA se queda dormida..."
              className="w-full p-2 border border-neutral-borderLight dark:border-neutral-borderDark rounded-md focus:ring-primary-DEFAULT focus:border-primary-DEFAULT bg-neutral-bgLight dark:bg-neutral-bgDark text-neutral-textDark dark:text-neutral-textLight"
              rows={3}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1 text-neutral-textDark dark:text-neutral-textLight">Elige una plantilla (opcional):</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-60 overflow-y-auto p-2 border border-neutral-borderLight dark:border-neutral-borderDark rounded-md">
              {MEME_TEMPLATES.map(template => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template)}
                  className={`rounded-md overflow-hidden border-2 transition-all ${selectedTemplate?.id === template.id ? 'border-primary-DEFAULT ring-2 ring-primary-DEFAULT' : 'border-transparent hover:border-primary-DEFAULT/50'}`}
                >
                  <img src={template.imageUrl} alt={template.name} className="w-full h-20 object-cover" />
                  <p className="text-xs p-1 bg-black/50 text-white truncate">{template.name}</p>
                </button>
              ))}
            </div>
             {selectedTemplate && <Button variant="ghost" size="sm" onClick={() => setSelectedTemplate(null)} className="mt-2 text-xs">Quitar plantilla</Button>}
          </div>
          
          {error && <p className="text-sm text-error mb-3 bg-error/10 p-2 rounded-md">{error}</p>}

          <Button onClick={handleGenerateMeme} isLoading={isLoading} className="w-full text-lg py-3" leftIcon={<Icon name="robot" className="w-5 h-5"/>}>
            {isLoading ? `${AI_ASSISTANT_NAME} está pensando...` : 'Generar Meme'}
          </Button>
        </div>

        <div className="bg-card-light dark:bg-card-dark shadow-xl rounded-lg p-6 flex flex-col items-center justify-center min-h-[300px]">
          {isLoading && (
            <div className="text-center">
              <Icon name="robot" className="w-16 h-16 animate-bounce text-primary-DEFAULT mx-auto" />
              <p className="mt-2 text-lg text-neutral-textDark dark:text-neutral-textLight">Cargando risas... {Math.floor(Math.random()*100)}%</p>
            </div>
          )}
          {!isLoading && generatedMemeUrl && (
            <>
              <img src={generatedMemeUrl} alt="Meme generado" className="max-w-full max-h-80 rounded-md shadow-md mb-4 border border-neutral-borderLight dark:border-neutral-borderDark" />
              <div className="flex space-x-3 mt-4">
                <Button onClick={handleShareToFeed} variant="primary">Compartir en Feed</Button>
                <a href={generatedMemeUrl} download="connectia-meme.jpg">
                  <Button variant="secondary">Descargar</Button>
                </a>
              </div>
               <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">Creado con {AI_ASSISTANT_NAME} ✨</p>
            </>
          )}
          {!isLoading && !generatedMemeUrl && (
            <div className="text-center text-gray-500 dark:text-gray-400">
              <Icon name="face-smile" className="w-16 h-16 opacity-50 mx-auto" />
              <p className="mt-2">Tu obra maestra aparecerá aquí.</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default MemeGeneratorPage;