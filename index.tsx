import React, { useEffect, useState, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { AstraNameForm } from './src/components/AstraNameForm';

const StarryCanvas = ({ id, starCount, starColor, starSize, animationDuration, reverse, parallaxFactor }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    
    window.addEventListener('resize', () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
        drawStars();
    });

    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * starSize + 0.5,
    }));
    
    const drawStars = () => {
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = starColor;
        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
            ctx.fill();
        });
    };
    
    drawStars();

  }, [starCount, starColor, starSize]);

  const style = {
    '--duration': `${animationDuration}s`,
    '--parallax-factor': parallaxFactor,
    'animationDirection': reverse ? 'reverse' : 'normal'
  } as React.CSSProperties;

  return <canvas ref={canvasRef} className={`star-canvas ${id}`} style={style}></canvas>;
};


const StarryBackground = () => (
  <>
    <StarryCanvas id="stars-bg-1" starCount={100} starColor="white" starSize={1.5} animationDuration={60} reverse={false} parallaxFactor={-15} />
    <StarryCanvas id="stars-bg-2" starCount={150} starColor="white" starSize={1} animationDuration={120} reverse={true} parallaxFactor={-10} />
    <StarryCanvas id="stars-bg-3" starCount={200} starColor="#A8B2D1" starSize={0.5} animationDuration={180} reverse={false} parallaxFactor={-5} />
  </>
);


const MethodologyBlock = () => (
  <section className="content-block" aria-labelledby="methodology-title">
    <h1 id="methodology-title" className="block-title">Сервис подбора гармоничного имени для ребенка</h1>
    <p className="block-subtitle">
      Наша методика — это уникальный синтез четырех мощных дисциплин:.
    </p>
    <div className="cards-container">
      {/* Card 1 */}
      <div className="method-card">
        <div className="card-icon">
             <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 18C22 14.6863 24.6863 12 28 12C31.3137 12 34 14.6863 34 18V46C34 49.3137 31.3137 52 28 52C24.6863 52 22 49.3137 22 46" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 22C14 19.7909 15.7909 18 18 18C20.2091 18 22 19.7909 22 22V42C22 44.2091 20.2091 46 18 46C15.7909 46 14 44.2091 14 42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 26C6 24.8954 6.89543 24 8 24C9.10457 24 10 24.8954 10 26V38C10 39.1046 9.10457 40 8 40C6.89543 40 6 39.1046 6 38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M42 21.3115C48.4273 24.423 52 30.641 52 37.5C52 46.0604 45.0604 53 36.5 53C33.2516 53 30.2583 52.125 27.75 50.625" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M36.5 25C38.9853 25 41 27.0147 41 29.5C41 31.9853 38.9853 34 36.5 34C34.0147 34 32 31.9853 32 29.5C32 27.8938 32.784 26.4746 34 25.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
        </div>
        <h4>Психология звучания</h4>
        <p>Анализируем, как звучит имя, подбирая ассоциации и вибрации, которые соответствуют вашим пожеланиям о характере ребенка.</p>
      </div>
      {/* Card 2 */}
      <div className="method-card">
        <div className="card-icon">
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M32 8L54 22V50L32 64L10 50V22L32 8Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M32 8V27" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 22L32 27" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M54 22L32 27" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 32L16 38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M25 38H16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M36 32V38H42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M36 35H42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M26 49C26 51.2091 24.2091 53 22 53C19.7909 53 18 51.2091 18 49C18 46.7909 19.7909 45 22 45C24.2091 45 26 46.7909 26 49Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
        <h4>Нумерология</h4>
        <p>Рассчитываем Число Жизненного Пути, Души и Судьбы, чтобы имя гармонировало с врожденными талантами и жизненными задачами.</p>
      </div>
      {/* Card 3 */}
      <div className="method-card">
        <div className="card-icon">
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="26" stroke="currentColor" strokeWidth="2.5"/>
                <circle cx="32" cy="32" r="6" stroke="currentColor" strokeWidth="2.5"/>
                <path d="M32 6V14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M32 58V50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M58 32H50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M6 32H14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M49.4975 14.5025L43.8409 20.1591" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M14.5025 49.4975L20.1591 43.8409" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M49.4975 49.4975L43.8409 43.8409" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M14.5025 14.5025L20.1591 20.1591" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="24" cy="15" r="3" stroke="currentColor" strokeWidth="2.5"/>
                <circle cx="49" cy="25" r="3" stroke="currentColor" strokeWidth="2.5"/>
                <path d="M42 53L45 50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M45 53L42 50" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
        </div>
        <h4>Западная астрология</h4>
        <p>Строим натальную карту, чтобы имя гармонично взаимодействовало с гороскопом, усиливая сильные стороны ребенка.</p>
      </div>
      {/* Card 4 */}
      <div className="method-card">
        <div className="card-icon">
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M46 32C46 40.8366 38.8366 48 30 48C21.1634 48 14 40.8366 14 32C14 23.1634 21.1634 16 30 16C32.1264 16 34.156 16.4398 36 17.2288" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M44 14L46.8284 16.8284L44 19.6569L41.1716 16.8284L44 14Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M54 26L56.8284 28.8284L54 31.6569L51.1716 28.8284L54 26Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M51 40L53.8284 42.8284L51 45.6569L48.1716 42.8284L51 40Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M30 6V10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 32H6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M30 58V54" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
        <h4>Ведическая астрология</h4>
        <p>Подбираем благоприятные слоги (Накшатра) для создания защитной вибрации вокруг имени, способствуя росту и процветанию.</p>
      </div>
    </div>
  </section>
);

const painPointsData = [
  {
    title: "Перегрузка информацией.",
    text: "Бесконечные списки имен, их значений, советов из интернета... Как не потеряться в этом потоке? Наш алгоритм объединяет психологию, нумерологию и астрологию, чтобы предоставить вам короткий и идеально подходящий список, без лишнего шума."
  },
  {
    title: "Страх ошибиться.",
    text: "Что, если имя не подойдет характеру ребенка? Мы поможем вам избежать этой боли. Наш анализ гарантирует, что имя будет усиливать сильные стороны вашего малыша и гармонично сочетаться с его личностью."
  },
  {
    title: "Конфликт между партнерами.",
    text: "Вы не можете прийти к единому мнению? Наш сервис предоставит вам объективные данные и анализ, которые помогут найти компромиссное решение, устраивающее обоих. Больше никаких споров!"
  },
  {
    title: "Забота о будущем.",
    text: "Вы беспокоитесь, как имя повлияет на судьбу ребенка? Мы поможем подобрать имя, которое не просто красиво звучит, а станет настоящим талисманом, способствующим раскрытию потенциала."
  }
];

const PainPointsBlock = () => (
  <section className="content-block" aria-labelledby="pain-points-title">
    <h2 id="pain-points-title" className="block-title">Решим главные сложности выбора имени</h2>
    <div className="pain-points-container">
      {painPointsData.map((point, index) => (
        <div key={index} className="pain-point-card">
          <h4>{point.title}</h4>
          <p>{point.text}</p>
        </div>
      ))}
    </div>
  </section>
);


const ExampleBlock = () => {
    const [activeTab, setActiveTab] = useState('psychology');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'numerology':
                return (
                    <div className="tab-content">
                        <h4>✔ Нумерология</h4>
                        <p><strong>Число Имени: 5.</strong> Это число свободы, путешествий, перемен и острого ума. Оно наделяет владельца гибкостью и умением адаптироваться.</p>
                        <p><strong>Гармония с датой рождения:</strong> Ваше Число Жизненного Пути — 8 (целеустремленность, власть). Число 5 имени "Артур" добавляет к восьмерке необходимую легкость и широту взглядов, создавая идеальный баланс.</p>
                    </div>
                );
            case 'astrology':
                return (
                    <div className="tab-content">
                        <h4>✔ Астрология</h4>
                        <p><strong>Знак Зодиака ребенка:</strong> Лев ♌.</p>
                        <p><strong>Планета-управитель имени:</strong> Юпитер (планета удачи и расширения).</p>
                        <p><strong>Анализ:</strong> В натальной карте вашего ребенка Юпитер находится в сильной позиции. Имя "Артур" активирует эту энергию, принося удачу в начинаниях.</p>
                    </div>
                );
             case 'jyotish':
                return (
                    <div className="tab-content">
                        <h4>✔ Джйотиш</h4>
                         <p><strong>Накшатра (Лунная стоянка):</strong> Магха. Управляется Кету, символизирует трон, власть и наследие.</p>
                         <p><strong>Благоприятный слог:</strong> "Ма". Имя "Артур" не начинается с этого слога, но его общая вибрация и нумерологический код компенсируют это, создавая мощную синергию с энергией накшатры.</p>
                    </div>
                );
            case 'psychology':
            default:
                return (
                    <div className="tab-content">
                        <h4>✔ Психология</h4>
                        <p><strong>Звучание:</strong> Твердое, уверенное, но с мягким окончанием. Сочетание "Ар-тур" вызывает ассоциации с надежностью, честью и силой.</p>
                        <p><strong>Совместимость:</strong> Отлично гармонирует с отчеством "Михайлович".</p>
                        <p><strong>Соответствие запросу:</strong> Полностью соответствует вашему желанию подобрать "сильное и благородное" имя.</p>
                    </div>
                );
        }
    };
    
    return (
      <section className="content-block" aria-labelledby="example-title">
        <h2 id="example-title" className="block-title">Пример анализа индекса гармонии по оценке "Astra Name"</h2>
        <p className="block-example-context">Пример для мальчика, рожденного 10.08.2025, родители Анна и Михаил</p>
        
        <div className="name-card">
          <div className="name-card-header">
              <div>
                  <h3>Артур</h3>
                  <p>Имя, несущее благородство, силу и творческую энергию. Идеально для будущего лидера и первооткрывателя.</p>
              </div>
              <div className="harmony-dial">
                  <svg viewBox="0 0 100 100">
                      <defs>
                          <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#f0c34a" />
                              <stop offset="100%" stopColor="#d4af37" />
                          </linearGradient>
                      </defs>
                      <circle cx="50" cy="50" r="45" className="dial-track"/>
                      <circle cx="50" cy="50" r="45" className="dial-progress" style={{'--progress': 92} as React.CSSProperties}/>
                  </svg>
                  <div className="dial-text">
                      <strong>92%</strong>
                      <span>Индекс Гармонии</span>
                  </div>
              </div>
          </div>

          <div className="name-card-tabs">
              <button onClick={() => setActiveTab('psychology')} className={activeTab === 'psychology' ? 'active' : ''}>Психология</button>
              <button onClick={() => setActiveTab('numerology')} className={activeTab === 'numerology' ? 'active' : ''}>Нумерология</button>
              <button onClick={() => setActiveTab('astrology')} className={activeTab === 'astrology' ? 'active' : ''}>Астрология</button>
              <button onClick={() => setActiveTab('jyotish')} className={activeTab === 'jyotish' ? 'active' : ''}>Джйотиш</button>
          </div>
          {renderTabContent()}
        </div>
        
        <p className="block-closing-text">Вы получите не просто имя, а глубокую историю о потенциале вашего ребенка и о том, как имя поможет ему раскрыться.</p>
        <button className="cta-button glow-button">Заполнить анкету и получить свой анализ</button>
      </section>
    );
};

const faqData = [
  {
    question: "Это научно?",
    answer: "Наш метод не является строгой научной дисциплиной. Это \"алгоритмическая объективность\" — последовательная система, основанная на четких правилах нумерологии, астрологии и психологии звучания имени. Результат — это \"Индекс Гармонии\", который позволяет сравнить имена между собой, а не строгое научное доказательство."
  },
  {
    question: "Какие данные мне нужно предоставить для подбора имени?",
    answer: "Чтобы наш алгоритм работал максимально точно, нам потребуется информация о предполагаемом поле ребенка, его фамилия и отчество. Для нумерологического и астрологического анализа необходимы даты, время и места рождения ребенка и его родителей."
  },
  {
    question: "Сколько имен я получу в итоге?",
    answer: "Вы получите короткий, но тщательно подобранный список из 5-10 имен. Мы сфокусированы не на количестве, а на качестве, чтобы предоставить вам только те варианты, которые максимально соответствуют вашим критериям."
  },
  {
    question: "Как долго ждать результат?",
    answer: "Наш алгоритм обрабатывает данные в режиме реального времени. Вы получите готовый анализ и список рекомендованных имен сразу после заполнения анкеты."
  },
  {
    question: "Что такое \"Индекс Гармонии\"?",
    answer: "Это наш уникальный показатель, который наглядно отображает процент совместимости имени с данными вашего ребенка и вашими предпочтениями. Он рассчитывается на основе взвешенной оценки по всем четырем нашим методикам."
  },
  {
    question: "Почему вы используете именно эти четыре методики?",
    answer: "Мы считаем, что идеальный выбор имени требует комплексного подхода. Мы объединили мудрость древних знаний (нумерология, западная и ведическая астрология) и современные знания о психологии, чтобы имя было не только красивым, но и гармонировало с характером, судьбой и энергетикой ребенка."
  },
  {
    question: "Чем ваш сервис отличается от других?",
    answer: "Мы не просто предлагаем списки популярных имен. Наш сервис проводит глубокий персонализированный анализ на основе уникальных данных вашей семьи. Вы получаете не просто имя, а подробную историю о его потенциале и о том, как оно поможет раскрыться вашему ребенку."
  },
  {
    question: "Можно ли использовать сервис, если я не знаю точное время рождения ребенка?",
    answer: "Да. Вы можете указать примерный промежуток времени, и наш алгоритм учтет эту погрешность. Однако для максимально точных астрологических расчетов точное время рождения имеет большое значение."
  },
  {
    question: "Имеет ли значение, что я уже выбрал имя?",
    answer: "Даже если у вас уже есть имя-фаворит, вы можете использовать наш сервис для его анализа. Мы покажем его \"Индекс Гармонии\" и дадим подробное описание, чтобы вы были полностью уверены в своем выборе."
  },
  {
    question: "Что делать после получения списка имен?",
    answer: "Список и анализ служат источником вдохновения. Изучите подробные отчеты, обсудите их с партнером и доверьтесь своей интуиции. Окончательный выбор всегда за вами."
  }
];

const FAQBlock = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="content-block" aria-labelledby="faq-title">
            <h2 id="faq-title" className="block-title">Часто задаваемые вопросы</h2>
            <div className="faq-container">
                {faqData.map((faq, index) => (
                    <div key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
                        <button className="faq-question" onClick={() => toggleFAQ(index)} aria-expanded={activeIndex === index}>
                            <span>{faq.question}</span>
                            <span className="faq-icon" aria-hidden="true"></span>
                        </button>
                        <div className="faq-answer">
                            <p>{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};


const App = () => {
  const mousePos = useRef({x: 0, y: 0});

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    
    let animationFrameId: number;

    const updateParallax = () => {
        const { x, y } = mousePos.current;
        const { innerWidth, innerHeight } = window;
        const normalizedX = (x / innerWidth - 0.5) * 2;
        const normalizedY = (y / innerHeight - 0.5) * 2;
        
        document.documentElement.style.setProperty('--mouse-x', `${normalizedX}`);
        document.documentElement.style.setProperty('--mouse-y', `${normalizedY}`);
        
        animationFrameId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationFrameId = requestAnimationFrame(updateParallax);
    
    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <StarryBackground />
      <main className="container">
        <MethodologyBlock />
        <PainPointsBlock />
        <ExampleBlock />
        <AstraNameForm />
        <FAQBlock />
      </main>
    </>
  );
};

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(<App />);
}
