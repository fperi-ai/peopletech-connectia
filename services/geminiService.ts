
import { GoogleGenAI, GenerateContentResponse, Part } from "@google/genai";
// Note: Actual image generation with text overlay is complex.
// Gemini's image models (like Imagen) generate images from text, not typically overlay text on existing templates.
// For text overlay on a template, client-side canvas or a different backend service would be common.
// This service will demonstrate text-to-image if no template, or just return template if provided for simplicity.

// This function simulates meme generation for when API_KEY is not available
// or for a simpler frontend-only demo.
export const simulateMemeGeneration = async (idea: string, templateImageUrl?: string): Promise<string | null> => {
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
  if (templateImageUrl) {
    // For demo, if a template is provided, just return it.
    // A real simulation would overlay 'idea' text onto the image.
    // This could be done with HTML5 Canvas on the client-side.
    // For now, we'll just show the template as the "meme".
    // Or, construct a placeholder image with the idea text.
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return templateImageUrl; // fallback to template if canvas fails

    const img = new Image();
    img.crossOrigin = "anonymous"; // Important if templateImageUrl is from another domain

    return new Promise((resolve) => {
        img.onload = () => {
            canvas.width = img.width > 0 ? img.width : 400;
            canvas.height = img.height > 0 ? img.height : 300;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            
            // Basic text overlay
            ctx.fillStyle = 'white';
            ctx.strokeStyle = 'black';
            ctx.lineWidth = Math.max(1, canvas.width / 150);
            ctx.textAlign = 'center';
            
            const fontSize = Math.max(16, canvas.width / 15);
            ctx.font = `bold ${fontSize}px Impact, Arial, sans-serif`;

            // Simple text split for top/bottom based on idea
            const lines = idea.split('//').map(line => line.trim());
            const topText = lines[0] || idea;
            const bottomText = lines[1] || '';

            if (topText) {
                ctx.fillText(topText.toUpperCase(), canvas.width / 2, fontSize * 1.5);
                ctx.strokeText(topText.toUpperCase(), canvas.width / 2, fontSize * 1.5);
            }
            if (bottomText) {
                ctx.fillText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - fontSize * 0.5);
                ctx.strokeText(bottomText.toUpperCase(), canvas.width / 2, canvas.height - fontSize * 0.5);
            }
            resolve(canvas.toDataURL('image/jpeg'));
        };
        img.onerror = () => {
            // Fallback if image fails to load
            resolve(`https://picsum.photos/seed/${encodeURIComponent(idea)}/400/300`);
        };
        img.src = templateImageUrl;
    });

  }
  // If no template, generate a placeholder image URL
  return `https://picsum.photos/seed/${encodeURIComponent(idea)}/400/300`;
};


export const generateMemeWithGemini = async (prompt: string, templateImageUrl?: string): Promise<string | null> => {
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    console.warn("API_KEY not found in environment. Falling back to simulation.");
    return simulateMemeGeneration(prompt, templateImageUrl);
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    // If a template is provided, the task is more complex.
    // Gemini's 'imagen' model is for text-to-image. It doesn't edit existing images directly by adding text overlays in a simple API call.
    // You might use a multimodal model to *describe* how to caption a template, or generate text content for it.
    // For this demo, if a template is given, we'll assume the prompt is to *generate an image inspired by the template and idea*.
    // Or, we could just use the text part of the prompt to generate a new image.

    let finalPrompt = prompt;
    if (templateImageUrl) {
        // This is a simplification. True template usage with Gemini would be more involved.
        // e.g., "Generate an image in the style of [template name/description] with the text/idea: [idea]"
        finalPrompt = `Create a new humorous meme image. If relevant, be inspired by the style or concept of a meme that might use an image like "${templateImageUrl}". The core idea for the meme is: "${prompt}". Ensure the output is a single, complete meme image.`;
    } else {
        finalPrompt = `Create a humorous meme image based on the idea: "${prompt}". The image should be suitable for a corporate social network. Ensure the output is a single, complete meme image.`;
    }

    const response = await ai.models.generateImages({
        model: 'imagen-3.0-generate-002', 
        prompt: finalPrompt,
        config: { numberOfImages: 1, outputMimeType: 'image/jpeg' },
    });

    if (response.generatedImages && response.generatedImages.length > 0 && response.generatedImages[0].image.imageBytes) {
      const base64ImageBytes = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    }
    console.error("Gemini image generation response did not contain an image:", response);
    return null;
  } catch (error) {
    console.error("Error generating meme with Gemini:", error);
    // Fallback to simulation on API error
    return simulateMemeGeneration(prompt, templateImageUrl);
  }
};

// Example function for text generation (e.g., for Connie or other text tasks)
export const generateTextWithGemini = async (prompt: string): Promise<string> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return "API Key not configured. This is a simulated response from Connie.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-04-17', // Corrected model name
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating text with Gemini:", error);
    return "Connie is having a moment... please try again later.";
  }
};
