// Frases motivacionales divertidas para mostrar en la pantalla de login
export const motivationalPhrases = [
  "La IA puede ser tu mejor colega – nunca se come tu yogurt del frigorífico 🥣",
  "Conectando personas y algoritmos desde 2023. Los algoritmos son más predecibles 😉",
  "En ConnectIA, los robots y humanos trabajamos juntos. ¡Excepto los lunes por la mañana!",
  "¿Sabías que Connie nunca pide días libres? Aunque a veces necesita reiniciarse 🤖",
  "Únete a la revolución digital donde las máquinas aprenden y los humanos... bueno, también 📚",
  "ConnectIA: donde tu jefe podría ser un algoritmo, pero al menos no te pide que trabajes en fin de semana",
  "Aquí la IA no viene a quitarte el trabajo, sino a ayudarte a tener tiempo para el café ☕",
  "Nuestro asistente virtual Connie tiene un CI altísimo, pero aún no entiende los memes de Los Simpson",
  "En ConnectIA no discriminamos: nos gustan todos los formatos de datos por igual 📊",
  "La única red social donde está bien hablar con robots. ¡Incluso te responden!"
];

// Función para obtener una frase aleatoria
export const getRandomPhrase = (): string => {
  const randomIndex = Math.floor(Math.random() * motivationalPhrases.length);
  return motivationalPhrases[randomIndex];
};
