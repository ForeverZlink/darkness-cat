import React, { useState, useRef } from 'react';

// A imagem do cachorrinho será acessada a partir da pasta 'public'
const dogImage = process.env.PUBLIC_URL + '/teste3.gif';
const placeholderGif = 'https://i.pinimg.com/originals/15/c1/44/15c144e8dc552a100b3292d268854499.gif';

const darkQuotes = [
  "No silêncio da noite, os segredos sussurram para aqueles que querem ouvir.",
  "Somos almas inquietas, dançando entre a luz e a sombra do desconhecido.",
  "Teu olhar carrega o mistério que incendia minha alma sem queimar.",
  "Entre sombras e suspiros, encontramos a força para continuar lutando.",
  "A escuridão revela o que a luz tenta esconder.",
  "No castelo dos sonhos perdidos, ainda restam promessas não ditas.",
  "Minha sombra caminha ao teu lado, mesmo quando a noite cai mais densa.",
  "O fogo que arde no peito é feito de saudade e desejo contido.",
  "Entre névoas e silêncio, criamos um universo só nosso.",
  "Na solidão da noite, encontro beleza na fragilidade do momento."
];
const BatSilhouette = ({ size = 40, style }) => (
  <svg
    viewBox="0 0 500 300"
    fill="black"
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={(size * 300) / 500}
    style={style}
  >
    <path
      d="M250 50 C 150 100, 50 100, 0 200 C 50 150, 100 120, 150 150 C 160 180, 170 200, 180 220 C 190 230, 200 240, 210 250 C 220 260, 230 270, 240 280 C 250 290, 260 290, 270 280 C 280 270, 290 260, 300 250 C 310 240, 320 230, 330 220 C 340 200, 350 180, 360 150 C 400 120, 450 150, 500 200 C 450 100, 350 100, 250 50 Z"
    />
  </svg>
);
const App = () => {
  const [clicks, setClicks] = useState(0);
  const [hearts, setHearts] = useState([]);
  const [showLargeHeart, setShowLargeHeart] = useState(false);
  const [quote, setQuote] = useState(""); // Frase aleatória
  const appRef = useRef(null);
  const LARGE_HEART_THRESHOLD = 10;

  const handleClick = () => {
    setClicks(prev => prev + 1);

    if (showLargeHeart) return;

    const appRect = appRef.current.getBoundingClientRect();
    const maxX = appRect.width;
    const maxY = appRect.height;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    const newHeart = {
      id: Date.now() + Math.random(),
      x: randomX,
      y: randomY,
      size: Math.random() * 12 + 50,
    };

    setHearts(prevHearts => [...prevHearts, newHeart]);

    setTimeout(() => {
      setHearts(prevHearts => prevHearts.filter(heart => heart.id !== newHeart.id));
    }, 1500);

    if (clicks + 1 >= LARGE_HEART_THRESHOLD) {
      const randomQuote = darkQuotes[Math.floor(Math.random() * darkQuotes.length)];
      setQuote(randomQuote);
      setShowLargeHeart(true);
    }
  };

  // Cria array de morcegos para renderizar
  const bats = Array.from({ length: 12 });

  return (
    <div
      ref={appRef}
      className="min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden relative font-inter cursor-pointer"
      style={{ backgroundColor: "#000000" }}
      onClick={handleClick}
    >
      {/* Estrelas */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(3px 3px at 5% 10%, white, transparent),
              radial-gradient(4px 4px at 15% 30%, white, transparent),
              radial-gradient(2.5px 2.5px at 25% 20%, white, transparent),
              radial-gradient(3.5px 3.5px at 35% 60%, white, transparent),
              radial-gradient(4.5px 4.5px at 45% 40%, white, transparent),
              radial-gradient(2.8px 2.8px at 55% 80%, white, transparent),
              radial-gradient(3.2px 3.2px at 65% 30%, white, transparent),
              radial-gradient(5px 5px at 75% 50%, white, transparent),
              radial-gradient(4.8px 4.8px at 85% 70%, white, transparent),
              radial-gradient(3px 3px at 95% 90%, white, transparent),
              radial-gradient(4px 4px at 50% 10%, white, transparent),
              radial-gradient(5px 5px at 20% 85%, white, transparent),
              radial-gradient(3.7px 3.7px at 80% 25%, white, transparent),
              radial-gradient(3.3px 3.3px at 60% 75%, white, transparent),
              radial-gradient(4.1px 4.1px at 10% 50%, white, transparent)
            `,
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#000000',
          }}
        />
      </div>

      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        {`
        html, body, #root {
            height: 100%;
            margin: 0;
            padding: 0;
            overflow: hidden;
        }
        .min-h-screen {
            min-height: 100vh;
        }

        @import url('https://fonts.googleapis.com/css2?family=UnifrakturCook:wght@700&display=swap');

        .font-inter {
          font-family: 'UnifrakturCook', cursive;
        }

        .heart-animation {
          animation: floatUpFadeOut 1.5s ease-out forwards;
          position: absolute !important;
        }

        @keyframes floatUpFadeOut {
          0% { transform: translateY(0) scale(0); opacity: 1; }
          20% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-150px) scale(0.5); opacity: 0; }
        }

        .large-heart-animation {
          animation: scaleInPulse 1.5s ease-out forwards;
        }

        @keyframes scaleInPulse {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 2s ease forwards;
        }

        /* Animação suave para morcegos */
        @keyframes bat-flap {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-4px) rotate(10deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        `}
      </style>

      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-pink-600 mb-7 text-center drop-shadow-lg" style={{ fontFamily: "cursive" }}>
        Clique na lua
      </h1>

      {/* Cachorro */}
      <div className="relative z-10 p-20 bg-white rounded-full shadow-xl transform transition-all duration-300 hover:scale-105">
        <img
          src={dogImage}
          alt="Cachorrinho Pixelado Fofo"
          className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain"
          onError={(e) => { e.target.onerror = null; e.target.src = placeholderGif; }}
        />
      </div>

      <p
        className="text-xl text-pink-600 mt-10"
        style={{
          fontFamily: "cursive",
          fontSize: "32px",
          position: "relative",
          zIndex: 30, // garante que fique acima
        }}
      >
        Cliques: <span className="font-bold text-white">{clicks}</span>
      </p>

      {/* Corações pequenos */}
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="text-pink-500 heart-animation z-50"
          style={{
            left: heart.x,
            top: heart.y,
            fontSize: heart.size,
            transform: 'translate(-50%, -50%)', fontFamily: "cursive",
          }}
        >
          ❤️ KIM🦇
        </div>
      ))}

      {/* Coração grande + citação */}
      {showLargeHeart && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 z-20 large-heart-animation">
          <div className="relative text-pink-500 text-9xl md:text-[12rem] lg:text-[15rem] drop-shadow-lg">
            {/* Frase Dark */}
            <p
              className="mt-6 text-center text-white italic max-w-2xl px-6 animate-fadeIn"
              style={{ fontFamily: "'MedievalSharp', cursive", fontSize: '2.2rem' }}
            >
              {quote}
            </p>
          </div>

          <button
            onClick={() => {
              setShowLargeHeart(false);
              setClicks(0);
              setHearts([]);
            }}
            style={{ fontFamily: "'MedievalSharp', cursive" }}
            className="mt-8 bg-pink-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-pink-700 transition-colors duration-300 transform hover:scale-105 animate-fadeIn"
          >
            Ousa se aventurar em busca da próxima frase? (Clique me)
          </button>
        </div>
      )}

      {/* Morcegos silhueta na parte inferior */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          gap: '15px',
          padding: '12px 0',
          pointerEvents: 'none',
          userSelect: 'none',
          color: 'white',
          zIndex: 50,
          backgroundColor: 'transparent',
        }}
      >
        {bats.map((_, i) => (
          <BatSilhouette
            key={i}
            size={20 + Math.random() * 20}
            style={{
              opacity: 0.5 + Math.random() * 0.5,
              animation: `bat-flap ${1 + Math.random()}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
