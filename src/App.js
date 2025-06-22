import React, { useState, useEffect, useRef } from 'react';

// A imagem do cachorrinho será acessada a partir da pasta 'public'
// Usamos process.env.PUBLIC_URL para garantir que o caminho funcione corretamente
// em ambientes de desenvolvimento e build do Create React App.
const dogImage = process.env.PUBLIC_URL + '/image_975ea4.png';
const placeholderGif = 'https://i.pinimg.com/originals/15/c1/44/15c144e8dc552a100b3292d268854499.gif';
const largeHeartImage = 'https://i.pinimg.com/736x/56/be/e1/56bee1dc11ee62dd0caacab75a79a157.jpg';

const App = () => {
  const [clicks, setClicks] = useState(0);
  const [hearts, setHearts] = useState([]);
  const [showLargeHeart, setShowLargeHeart] = useState(false);
  const appRef = useRef(null); // Referência ao container principal do app
  const LARGE_HEART_THRESHOLD = 20; // Número de cliques para o coração grande

  const handleClick = (e) => {
    // Incrementa o contador de cliques em 1
    setClicks(prev => prev + 1);

    if (showLargeHeart) {
      return; // Se o coração grande já está na tela, não emite mais corações pequenos
    }

    // Obtém as dimensões do container do app para gerar posições aleatórias dentro dele
    const appRect = appRef.current.getBoundingClientRect();
    const maxX = appRect.width;
    const maxY = appRect.height;

    // Gera coordenadas X e Y aleatórias dentro das dimensões do app
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    // Cria um novo objeto coração com ID único e posição aleatória
    const newHeart = {
      id: Date.now() + Math.random(), // ID único para cada coração
      x: randomX, // Posição X aleatória
      y: randomY, // Posição Y aleatória
      size: Math.random() * 12 + 50, // Tamanho aleatório entre 50 e 62 pixels para corações pequenos
    };

    // Adiciona o novo coração ao array de corações
    setHearts(prevHearts => [...prevHearts, newHeart]);

    // Remove o coração após um curto período para permitir a animação
    setTimeout(() => {
      setHearts(prevHearts => prevHearts.filter(heart => heart.id !== newHeart.id));
    }, 1500); // Duração da animação do coração em milissegundos

    // Verifica se o limite de cliques para o coração grande foi atingido
    if (clicks + 1 >= LARGE_HEART_THRESHOLD) {
      setShowLargeHeart(true);
    }
  };

  return (
    <div
      ref={appRef} // Atribui a referência ao container principal
      className="min-h-screen bg-pink-100 flex flex-col items-center justify-center p-4 overflow-hidden relative font-inter cursor-pointer"
      onClick={handleClick} // Agora os cliques em qualquer lugar do app geram corações
    >
      {/* Tailwind CSS CDN e estilos personalizados para animações dos corações */}
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        {`
        /* Estilos globais para garantir que o app ocupe 100% da viewport */
        html, body, #root {
            height: 100%;
            margin: 0;
            padding: 0;
            overflow: hidden; /* Garante que não haja barras de rolagem indesejadas */
        }
        .min-h-screen {
            min-height: 100vh; /* Garante que o container principal ocupe toda a altura da viewport */
        }

        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
        .font-inter {
          font-family: 'Inter', sans-serif;
        }
        .heart-animation {
          animation: floatUpFadeOut 1.5s ease-out forwards;
          position: absolute !important; /* Garante que a posição absoluta funcione corretamente */
        }

        @keyframes floatUpFadeOut {
          0% {
            transform: translateY(0) scale(0);
            opacity: 1;
          }
          20% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-150px) scale(0.5);
            opacity: 0;
          }
        }

        .large-heart-animation {
          animation: scaleInPulse 1.5s ease-out forwards;
        }

        @keyframes scaleInPulse {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        `}
      </style>

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-pink-600 mb-4 text-center drop-shadow-lg">
        Dog simulator
      </h1>

      <p className="text-md md:text-lg text-gray-700 mb-8 text-center max-w-2xl px-4">
            Faça carinho no cachorro e ganhe uma recompensa!
      </p>

      {/* Container da imagem do cachorro com a sua imagem PNG */}
      <div
        className="relative z-10 p-4 bg-white rounded-full shadow-xl transform transition-all duration-300 hover:scale-105"
      >
        <img
          src={dogImage} // Usa a imagem PNG que você enviou
          alt="Cachorrinho Pixelado Fofo"
          className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain"
          onError={(e) => { e.target.onerror = null; e.target.src = placeholderGif; }} // Fallback se a imagem não carregar
        />
      </div>

      <p className="text-xl text-gray-700 mt-4">
        Cliques: <span className="font-bold text-pink-500">{clicks}</span>
      </p>

      {/* Renderiza os corações pequenos individuais */}
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="text-pink-500 heart-animation z-0"
          style={{
            left: heart.x,
            top: heart.y,
            fontSize: heart.size,
            transform: 'translate(-50%, -50%)', // Centraliza o coração em sua posição
          }}
        >
          ❤️
        </div>
      ))}

      {/* Renderiza o coração grande se showLargeHeart for true */}
      {showLargeHeart && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 z-20 large-heart-animation">
          <div className="relative text-pink-500 text-9xl md:text-[12rem] lg:text-[15rem] drop-shadow-lg">
            <img
              src={largeHeartImage} // Usa a imagem do coração grande
              alt="Coração Grande de Amor"
              className="w-full h-full object-contain"
            />
          </div>
          <button
            onClick={() => {
              setShowLargeHeart(false);
              setClicks(0);
              setHearts([]);
            }}
            className="mt-8 bg-pink-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-pink-700 transition-colors duration-300 transform hover:scale-105"
          >
            Começar de Novo
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
