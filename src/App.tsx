import { useState, useEffect, useRef } from 'react';

// ============================================
// ЭЛЕГАНТНЫЕ SVG-ИКОНКИ
// ============================================
const LuxuryIcon = ({ name, className = "w-6 h-6" }: { name: string; className?: string }) => {
  const icons: Record<string, JSX.Element> = {
    diamond: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M6 3h12l4 6-10 13L2 9z" />
        <path d="M12 22L6 9" />
        <path d="M12 22l6-13" />
        <path d="M2 9h20" />
        <path d="M8 3l-2 6" />
        <path d="M16 3l2 6" />
      </svg>
    ),
    clock: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    thread: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M12 2v20" />
        <path d="M2 12h20" />
        <circle cx="12" cy="12" r="3" />
        <path d="M5 5l14 14" />
        <path d="M19 5L5 19" />
      </svg>
    ),
    wallet: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="2" y="6" width="20" height="14" rx="1" />
        <path d="M2 10h20" />
        <circle cx="17" cy="15" r="1.5" />
        <path d="M6 6V4a2 2 0 012-2h8a2 2 0 012 2v2" />
      </svg>
    ),
    check: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M9 12l2 2 4-4" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
    scissors: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <path d="M20 4L8.12 15.88" />
        <path d="M14.47 14.48L20 20" />
        <path d="M8.12 8.12L12 12" />
      </svg>
    ),
    dress: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M8 2l4 4 4-4" />
        <path d="M6 8l6 2 6-2" />
        <path d="M6 8v14h12V8" />
        <path d="M10 14h4" />
      </svg>
    ),
    tag: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
        <circle cx="7" cy="7" r="1.5" />
      </svg>
    ),
    suit: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M8 2l-4 6v14h16V8l-4-6" />
        <path d="M12 2v8" />
        <path d="M8 2l4 6 4-6" />
        <path d="M4 8h16" />
      </svg>
    ),
    location: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    phone: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
    globe: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    )
  };
  
  return icons[name] || null;
};

// ============================================
// ДАННЫЕ ДЛЯ БЛОКА ОБЪЯВЛЕНИЙ / ПОЗДРАВЛЕНИЙ
// ============================================
const announcements = [
  {
    id: 1,
    title: "С наступающим Новым годом!",
    text: "Дорогие клиенты! Поздравляем вас с наступающим Новым годом! Желаем, чтобы 2026 год был полон элегантности, красоты и безупречного стиля.",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&h=500&fit=crop",
    date: "25 декабря 2025",
    type: "greeting"
  },
  {
    id: 2,
    title: "Новая коллекция тканей из Европы",
    text: "В наш салон тканей поступила новая коллекция эксклюзивных тканей от лучших фабрик Италии, Франции, Англии и Швейцарии.",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=500&fit=crop",
    date: "15 января 2026",
    type: "announcement"
  },
  {
    id: 3,
    title: "С 8 Марта!",
    text: "Прекрасные дамы, поздравляем вас с Международным женским днём! Скидка 10% на пошив в праздничные дни!",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=500&fit=crop",
    date: "8 марта 2026",
    type: "greeting"
  }
];

// ============================================
// ПРЕИМУЩЕСТВА АТЕЛЬЕ
// ============================================
const advantages = [
  {
    icon: "diamond",
    title: "25 лет безупречной работы",
    description: "Мы занимаемся индивидуальным пошивом и ремонтом одежды с 1998 года"
  },
  {
    icon: "clock",
    title: "Экспресс и Стандарт",
    description: "Два вида сроков на все услуги — выберите удобный для вас вариант"
  },
  {
    icon: "thread",
    title: "10 000+ наименований",
    description: "Ткани и фурнитура из Европы: Италия, Франция, Англия, Швейцария"
  },
  {
    icon: "wallet",
    title: "Доступные цены",
    description: "Безупречное качество премиум-класса по честным ценам"
  },
  {
    icon: "check",
    title: "Гарантия на все услуги",
    description: "Мы уверены в качестве нашей работы и даём гарантию на все виды услуг"
  }
];

// ============================================
// УСЛУГИ АТЕЛЬЕ
// ============================================
const services = [
  {
    icon: "dress",
    title: "Пошив женской одежды",
    description: "Индивидуальный пошив женской одежды любой сложности — от деловых костюмов до вечерних и свадебных нарядов.",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&h=800&fit=crop"
  },
  {
    icon: "tag",
    title: "Отшив коллекций для бренда",
    description: "Профессиональный отшив коллекций одежды для брендов. Работаем с дизайнерами и модными домами.",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=800&fit=crop"
  },
  {
    icon: "scissors",
    title: "Ремонт одежды",
    description: "Профессиональный ремонт одежды любой сложности: от замены молнии до полной реставрации изделий.",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=800&fit=crop"
  },
  {
    icon: "suit",
    title: "Подгонка мужской одежды",
    description: "Идеальная посадка мужских костюмов, пиджаков, брюк и рубашек. Профессиональная подгонка.",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop"
  }
];

// ============================================
// ТКАНИ ИЗ ЕВРОПЫ
// ============================================
const fabrics = [
  {
    title: "Эксклюзивные ткани",
    description: "Уникальные ткани от лучших европейских производителей",
    image: "https://image.qwenlm.ai/generated-images/9e7aa561-3c85-4af6-9762-b6403bf22017/_result.png"
  },
  {
    title: "Натуральный шёлк",
    description: "Изысканный шёлк высочайшего качества для особых случаев",
    image: "https://image.qwenlm.ai/generated-images/ffe380b4-38f1-48e9-8e12-ba85a3459bd6/_result.png"
  },
  {
    title: "Пальтовые ткани",
    description: "Премиальные ткани для пошива пальто и верхней одежды",
    image: "https://image.qwenlm.ai/generated-images/e2039cf0-8bc3-49f9-b1e6-e7ea74253354/_result.png"
  },
  {
    title: "Букле Шанель",
    description: "Легендарная ткань для создания костюмов в стиле Шанель",
    image: "https://image.qwenlm.ai/generated-images/21d5727b-4836-43e3-a2ae-dbfa39021b8e/_result.png"
  }
];

// ============================================
// ГАЛЕРЕЯ РАБОТ
// ============================================
const galleryImages = [
  "https://premium-fabric.kz/images/home_11_67_prev.jpg",
  "https://premium-fabric.kz/images/home_11_63_prev.jpg",
  "https://premium-fabric.kz/images/home_11_64_prev.jpg",
  "https://premium-fabric.kz/images/home_11_60_prev.jpg",
  "https://premium-fabric.kz/images/home_11_62_prev.jpg",
  "https://premium-fabric.kz/images/home_11_61_prev.jpg",
  "https://premium-fabric.kz/images/home_11_58_prev.jpg",
  "https://premium-fabric.kz/images/home_11_59_prev.jpg",
  "https://premium-fabric.kz/images/home_11_53_prev.jpg",
  "https://premium-fabric.kz/images/home_11_55_prev.jpg",
  "https://premium-fabric.kz/images/home_11_52_prev.jpg",
  "https://premium-fabric.kz/images/home_11_51_prev.jpg",
];

// ============================================
// КОМПОНЕНТЫ
// ============================================

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Главная', href: '#главная' },
    { name: 'Услуги', href: '#услуги' },
    { name: 'О нас', href: '#о-нас' },
    { name: 'Ткани', href: '#ткани' },
    { name: 'Работы', href: '#работы' },
    { name: 'Контакты', href: '#контакты' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-ivory border-b border-sand' : 'bg-ivory/95 backdrop-blur-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#" className="flex items-center gap-2">
            <span className="font-serif text-2xl md:text-3xl font-semibold tracking-[0.15em] text-charcoal">
              PREMIUM FABRIC
            </span>
          </a>
          
          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="font-sans text-base font-medium tracking-[0.1em] uppercase text-charcoal/70 hover:text-primary transition-colors duration-300"
              >
                {item.name}
              </a>
            ))}
          </nav>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-charcoal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-ivory border-t border-sand">
          <div className="px-6 py-6 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block font-sans text-lg tracking-[0.1em] uppercase text-charcoal hover:text-primary transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="главная" className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&h=1080&fit=crop"
          alt="Ателье Premium Fabric"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="animate-fade-in-up">
          {/* Elegant backdrop with accent border */}
          <div className="relative bg-gradient-to-br from-charcoal/95 via-charcoal/90 to-charcoal/95 backdrop-blur-md p-10 md:p-16 lg:p-20 border-2 border-primary/40 shadow-2xl">
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-primary"></div>
            <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-primary"></div>
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-primary"></div>
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-primary"></div>

          <p className="text-primary-light font-sans text-base md:text-lg tracking-[0.4em] uppercase mb-8">
            Ателье Премиум класса · Алматы
          </p>            
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-semibold text-white mb-8 leading-[1.1] tracking-wide">
              PREMIUM FABRIC
            </h1>
            
            <div className="gold-divider w-32 mx-auto mb-8"></div>
            
            <p className="text-white text-xl md:text-2xl font-light max-w-2xl mx-auto mb-4 leading-relaxed font-serif italic">
              Индивидуальный пошив и ремонт одежды с 1998 года
            </p>
            
            <p className="text-white/70 text-base md:text-lg font-light max-w-xl mx-auto mb-12 leading-relaxed">
              Более 10 000 наименований тканей и фурнитуры из Италии, Франции, Англии и Швейцарии
            </p>
            
            <a
              href="#услуги"
              className="inline-block px-12 py-4 bg-primary text-white hover:bg-primary-dark transition-all duration-500 text-base tracking-[0.3em] uppercase font-sans font-medium shadow-lg hover:shadow-xl"
            >
              Наши услуги
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-primary animate-pulse"></div>
      </div>
    </section>
  );
}

// ============================================
// БЛОК ОБЪЯВЛЕНИЙ
// ============================================
function AnnouncementsBanner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % announcements.length);
    }, 6000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const goTo = (index: number) => {
    setActiveIndex(index);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % announcements.length);
    }, 6000);
  };

  return (
    <section id="объявления" className="relative bg-charcoal overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[320px]">
          {/* Image side */}
          <div className="lg:col-span-2 relative overflow-hidden">
            {announcements.map((item, index) => (
              <img
                key={item.id}
                src={item.image}
                alt={item.title}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  activeIndex === index ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-charcoal hidden lg:block"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent lg:hidden"></div>
          </div>

          {/* Content side */}
          <div className="lg:col-span-3 flex flex-col justify-center p-8 md:p-12 lg:pl-16 relative">
            {/* Label */}
            <div className="flex items-center gap-3 mb-6">
              <span className={`px-3 py-1 text-base tracking-[0.2em] uppercase font-sans font-medium ${
                announcements[activeIndex].type === 'greeting'
                  ? 'bg-primary/20 text-primary-light border border-primary/30'
                  : 'bg-white/10 text-white/70 border border-white/20'
              }`}>
                {announcements[activeIndex].type === 'greeting' ? 'Поздравление' : 'Объявление'}
              </span>
              <span className="text-white/40 text-base font-sans tracking-wider">
                {announcements[activeIndex].date}
              </span>
            </div>

            {/* Title & text */}
            {announcements.map((item, index) => (
              <div
                key={item.id}
                className={`transition-all duration-700 ${
                  activeIndex === index
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4 absolute pointer-events-none'
                }`}
              >
                <h3 className="font-serif text-3xl md:text-4xl font-semibold text-white mb-4 leading-snug">
                  {item.title}
                </h3>
                <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-lg font-light">
                  {item.text}
                </p>
              </div>
            ))}

            {/* Navigation */}
            <div className="flex items-center gap-4 mt-8">
              {announcements.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goTo(index)}
                  className="group flex items-center gap-2"
                >
                  <span className={`h-[2px] transition-all duration-500 ${
                    activeIndex === index ? 'w-10 bg-primary' : 'w-5 bg-white/20 group-hover:bg-white/40'
                  }`}></span>
                </button>
              ))}
              <span className="text-white/30 text-base font-sans ml-2">
                {String(activeIndex + 1).padStart(2, '0')} / {String(announcements.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Advantages() {
  return (
    <section className="py-20 bg-ivory border-b border-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
          {advantages.map((item, index) => (
            <div key={index} className="text-center px-2">
              <div className="icon-elegant mx-auto mb-4">
                <LuxuryIcon name={item.icon} className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2 text-charcoal leading-snug">{item.title}</h3>
              <p className="text-charcoal/50 text-base leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="услуги" className="py-24 md:py-32 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <p className="text-primary text-base tracking-[0.4em] uppercase mb-4 font-sans">Что мы предлагаем</p>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-charcoal mb-5 tracking-wide">Наши услуги</h2>
          <div className="gold-divider w-20 mx-auto mb-6"></div>
          <p className="text-charcoal/60 max-w-xl mx-auto text-base leading-relaxed">
            Ателье PREMIUM FABRIC — лидирующее место с 1998 года по индивидуальному пошиву и ремонту одежды в Алматы
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="luxury-card bg-white rounded-sm overflow-hidden border border-sand/60 group"
            >
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-2/5 relative overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48 sm:h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=400&fit=crop';
                    }}
                  />
                </div>
                <div className="sm:w-3/5 p-6 lg:p-8 flex flex-col justify-center">
                  <div className="icon-elegant mb-4">
                    <LuxuryIcon name={service.icon} className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-2xl lg:text-3xl font-semibold text-charcoal mb-3 group-hover:text-primary-dark transition-colors leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-charcoal/55 text-base leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="о-нас" className="py-24 md:py-32 bg-warm-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=700&h=900&fit=crop"
              alt="Элегантный женский костюм"
              className="w-full h-[450px] lg:h-[550px] object-cover rounded-sm"
            />
            <div className="absolute -bottom-6 -right-4 md:-right-6 bg-charcoal text-white p-6 rounded-sm">
              <p className="font-serif text-3xl font-semibold text-primary-light">25+</p>
              <p className="text-base tracking-[0.2em] uppercase text-white/60 mt-1 font-sans">лет опыта</p>
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="text-primary text-base tracking-[0.4em] uppercase mb-4 font-sans">О нашем ателье</p>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-charcoal mb-6 leading-tight tracking-wide">
              Искусство создания совершенства
            </h2>
            <div className="gold-divider w-20 mb-8"></div>
            <p className="text-charcoal/80 leading-loose mb-8 text-xl font-serif italic">
              <strong className="text-charcoal font-semibold not-italic">АТЕЛЬЕ PREMIUM FABRIC</strong> — это ателье Премиум класса, 
              занимающее лидирующее место с 1998 года по индивидуальному пошиву и ремонту одежды в Алматы.
            </p>
            <p className="text-charcoal/70 leading-loose mb-6 text-lg">
              Наш салон тканей уже более 20 лет предлагает клиентам богатый ассортимент тканей и фурнитуры 
              от мировых брендовых фабрик Италии, Франции, Англии и Швейцарии.
            </p>
            <p className="text-charcoal/70 leading-loose mb-12 text-lg">
              Мы предлагаем два вида сроков — <strong className="text-charcoal font-medium">Экспресс</strong> и{' '}
              <strong className="text-charcoal font-medium">Стандарт</strong>. На все виды услуг предоставляется гарантия.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="text-center p-4 sm:p-5 bg-white/60 border border-sand rounded-sm">
                <p className="font-serif text-xl sm:text-2xl font-semibold text-primary-dark">1998</p>
                <p className="text-xs sm:text-sm text-charcoal/50 mt-1 tracking-wider uppercase font-sans">Год основания</p>
              </div>
              <div className="text-center p-4 sm:p-5 bg-white/60 border border-sand rounded-sm">
                <p className="font-serif text-xl sm:text-2xl font-semibold text-primary-dark">10 000+</p>
                <p className="text-xs sm:text-sm text-charcoal/50 mt-1 tracking-wider uppercase font-sans">Наименований</p>
              </div>
              <div className="text-center p-4 sm:p-5 bg-white/60 border border-sand rounded-sm">
                <p className="font-serif text-xl sm:text-2xl font-semibold text-primary-dark">4</p>
                <p className="text-xs sm:text-sm text-charcoal/50 mt-1 tracking-wider uppercase font-sans">Страны</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Fabrics() {
  return (
    <section id="ткани" className="py-24 md:py-32 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <p className="text-primary text-base tracking-[0.4em] uppercase mb-4 font-sans">Салон тканей</p>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-charcoal mb-5 tracking-wide">Ткани из Европы</h2>
          <div className="gold-divider w-20 mx-auto mb-6"></div>
          <p className="text-charcoal/60 max-w-xl mx-auto text-base leading-relaxed">
            Более 20 лет мы предлагаем богатый ассортимент тканей от мировых брендовых фабрик 
            Италии, Франции, Англии и Швейцарии
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {fabrics.map((fabric, index) => (
            <div
              key={index}
              className="luxury-card group relative overflow-hidden rounded-sm bg-charcoal"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={fabric.image}
                  alt={fabric.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6">
                <h3 className="font-serif text-2xl font-semibold text-white mb-2 leading-snug">
                  {fabric.title}
                </h3>
                <p className="text-white/80 text-base leading-relaxed">
                  {fabric.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section id="работы" className="py-24 md:py-32 bg-warm-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <p className="text-primary text-base tracking-[0.4em] uppercase mb-4 font-sans">Портфолио</p>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-charcoal mb-5 tracking-wide">Наши работы</h2>
          <div className="gold-divider w-20 mx-auto mb-6"></div>
          <p className="text-charcoal/60 max-w-xl mx-auto text-base leading-relaxed">
            Индивидуальный пошив и реставрация одежды — примеры наших работ
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {galleryImages.map((img, index) => (
            <div key={index} className="relative group overflow-hidden rounded-sm aspect-square bg-sand">
              <img
                src={img}
                alt={`Работа ${index + 1}`}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:opacity-90"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=400&fit=crop`;
                }}
              />
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contacts() {
  return (
    <section id="контакты" className="py-24 md:py-32 bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <p className="text-primary-light text-base tracking-[0.4em] uppercase mb-4 font-sans">Свяжитесь с нами</p>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-white mb-5 tracking-wide">Контакты</h2>
          <div className="gold-divider w-20 mx-auto mb-6"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact info */}
          <div>
            <h3 className="font-serif text-2xl font-semibold mb-6 text-white">Будем рады видеть вас</h3>
            <p className="text-white/50 leading-relaxed mb-10 text-base">
              Запишитесь на консультацию, и наши мастера помогут создать идеальный образ. 
              Мы работаем по предварительной записи, чтобы уделить каждому клиенту максимум внимания.
            </p>

            <div className="space-y-7">
              <div className="flex items-start gap-5">
                <div className="icon-elegant flex-shrink-0">
                  <LuxuryIcon name="location" className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-sans text-base tracking-wider uppercase text-white/80 mb-1">Адрес</p>
                  <p className="text-white/50 text-base">г. Алматы, Казахстан</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="icon-elegant flex-shrink-0">
                  <LuxuryIcon name="phone" className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-sans text-base tracking-wider uppercase text-white/80 mb-1">Телефон</p>
                  <p className="text-white/50 text-base">Свяжитесь с нами для записи</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="icon-elegant flex-shrink-0">
                  <LuxuryIcon name="clock" className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-sans text-base tracking-wider uppercase text-white/80 mb-1">Время работы</p>
                  <p className="text-white/50 text-base">Пн-Сб: по предварительной записи</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="icon-elegant flex-shrink-0">
                  <LuxuryIcon name="globe" className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-sans text-base tracking-wider uppercase text-white/80 mb-1">Сайт</p>
                  <a href="https://premium-fabric.kz" target="_blank" rel="noopener noreferrer" className="text-primary-light text-base hover:text-primary transition-colors">
                    premium-fabric.kz
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-sm overflow-hidden border border-white/10">
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=76.950701%2C43.228412&z=17&um=constructor%3A2cb65235e7fb138a466d8486c71237c146b7bb5ed61baa3bdec7caed109fcedb"
              width="100%"
              height="450"
              frameBorder="0"
              style={{ border: 0 }}
              title="Карта расположения ателье PREMIUM FABRIC в Алматы"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-anthracite py-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-sans text-lg font-semibold text-primary-light tracking-[0.15em]">PREMIUM FABRIC</span>
          </div>
          <p className="text-base text-white/30 text-center tracking-wider font-sans">
            © 1998–2026 Ателье Премиум класса · Алматы · Все права защищены
          </p>
          <div className="flex gap-6">
            <a href="https://premium-fabric.kz" target="_blank" rel="noopener noreferrer" className="text-base text-white/30 hover:text-primary-light transition-colors tracking-wider font-sans">
              premium-fabric.kz
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================
// ГЛАВНЫЙ КОМПОНЕНТ
// ============================================
export default function App() {
  return (
    <div className="min-h-screen bg-ivory">
      <Header />
      <Hero />
      <AnnouncementsBanner />
      <Advantages />
      <Services />
      <About />
      <Fabrics />
      <Gallery />
      <Contacts />
      <Footer />
    </div>
  );
}
