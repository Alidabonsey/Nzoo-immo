import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sun, Moon, Calendar, CreditCard, Shield } from 'lucide-react';

// Texte FR/EN simple ici
const texts = {
  fr: {
    hero: {
      title: 'Réservez votre espace de travail idéal',
      subtitle:
        'Des bureaux modernes, du coworking flexible et des salles de réunion professionnelles à Kinshasa',
      ctaPrimary: 'Réserver maintenant',
    },
    spacesTitle: 'Nos Espaces',
    featuresTitle: 'Pourquoi choisir Nzoo Immo ?',
    testimonialsTitle: 'Témoignages',
    features: [
      {
        icon: <Calendar className="w-8 h-8 text-blue-600" />,
        title: 'Réservation Simple',
        desc: 'Système de réservation intuitif avec calendrier interactif',
      },
      {
        icon: <CreditCard className="w-8 h-8 text-green-600" />,
        title: 'Paiement Sécurisé',
        desc: 'Cartes VISA et Mobile Money acceptés',
      },
      {
        icon: <Shield className="w-8 h-8 text-purple-600" />,
        title: 'Support 24/7',
        desc: 'Une équipe dédiée toujours disponible',
      },
    ],
    testimonials: [
      {
        name: 'Marie Dupont',
        text: 'Excellent service, espaces très confortables et bien équipés',
      },
      {
        name: 'Jean Martin',
        text: 'Réservation simple et rapide, je recommande vivement !',
      },
      {
        name: 'Sophie Bernard',
        text: 'Le support client est toujours disponible et efficace',
      },
    ],
    toggleLangLabel: 'Passer en anglais',
  },
  en: {
    hero: {
      title: 'Réservez votre espace de travail idéal',
      subtitle:
        'Des bureaux modernes, du coworking flexible et des salles de réunion professionnelles à Kinshasa',
      ctaPrimary: 'Réserver maintenant',
    },
    spacesTitle: 'Nos Espaces',
    featuresTitle: 'Pourquoi choisir Nzoo Immo ?',
    testimonialsTitle: 'Témoignages',
    features: [
      {
        icon: <Calendar className="w-8 h-8 text-blue-600" />,
        title: 'Réservation Simple',
        desc: 'Système de réservation intuitif avec calendrier interactif',
      },
      {
        icon: <CreditCard className="w-8 h-8 text-green-600" />,
        title: 'Paiement Sécurisé',
        desc: 'Cartes VISA et Mobile Money acceptés',
      },
      {
        icon: <Shield className="w-8 h-8 text-purple-600" />,
        title: 'Support 24/7',
        desc: 'Une équipe dédiée toujours disponible',
      },
    ],
    testimonials: [
      {
        name: 'Marie Dupont',
        text: 'Excellent service, espaces très confortables et bien équipés',
      },
      {
        name: 'Jean Martin',
        text: 'Réservation simple et rapide, je recommande vivement !',
      },
      {
        name: 'Sophie Bernard',
        text: 'Le support client est toujours disponible et efficace',
      },
    ],
    toggleLangLabel: 'Switch to English',
  },
};

// Images de bannière pour le carrousel
const bannerImages = [
  '/Bannière_Pack 1.png',
  '/Bannière_Pack 2.png',
  '/Bannière_Pack 3.png',
  '/Bannière_Pack 5.png',
  '/Bannière_Pack 6.png'
];

const HomePage: React.FC = () => {
  const [lang, setLang] = useState<'fr' | 'en'>('fr');
  const [darkMode, setDarkMode] = useState(false);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const navigate = useNavigate();

  // Persist dark mode in localStorage
  useEffect(() => {
    const stored = localStorage.getItem('dark');
    setDarkMode(stored === 'true');
  }, []);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('dark', darkMode.toString());
  }, [darkMode]);

  // Carrousel automatique des bannières
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => 
        (prevIndex + 1) % bannerImages.length
      );
    }, 4000); // Change d'image toutes les 4 secondes

    return () => clearInterval(interval);
  }, []);

  const toggleDark = () => setDarkMode((d) => !d);
  const toggleLang = () => setLang((l) => (l === 'fr' ? 'en' : 'fr'));

  const t = texts[lang];

  // Fonction pour naviguer vers la page des espaces
  const goToSpaces = () => {
    navigate('/spaces');
  };


  return (
    <HelmetProvider>
      <div className="min-h-screen bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 transition-colors duration-700 font-poppins">
        <Helmet>
          <title>Nzoo Immo - {t.hero.title}</title>
        </Helmet>

        {/* Language & Dark mode toggles */}
        <div className="fixed top-4 right-4 z-50 flex space-x-4">
          <button
            onClick={toggleLang}
            className="px-3 py-1 rounded bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 transition text-primary dark:text-white font-medium"
          >
            {t.toggleLangLabel}
          </button>
          <button
            onClick={toggleDark}
            className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-700 hover:scale-105 transition"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-5 h-5 text-warning" /> : <Moon className="w-5 h-5 text-neutral-700" />}
          </button>
        </div>

        {/* Carrousel de bannières */}
        <section className="relative h-96 md:h-[500px] lg:h-[600px] xl:h-[700px] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
          <div className="relative w-full h-full">
            {bannerImages.map((image, index) => (
              <motion.div
                key={index}
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0, x: 100 }}
                animate={{ 
                  opacity: index === currentBannerIndex ? 1 : 0,
                  x: index === currentBannerIndex ? 0 : (index < currentBannerIndex ? -100 : 100)
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <img
                  src={image}
                  alt={`Bannière ${index + 1}`}
                  className="w-full h-full object-cover scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </motion.div>
            ))}
          </div>
          
          {/* Indicateurs de pagination */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {bannerImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBannerIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentBannerIndex 
                    ? 'bg-primary shadow-lg' 
                    : 'bg-neutral-300 hover:bg-neutral-400'
                }`}
              />
            ))}
          </div>
        </section>

        {/* Hero Section */}
        <section className="relative flex items-center justify-center min-h-[60vh] bg-gradient-to-br from-secondary/10 via-white to-accent/10 dark:from-neutral-900 dark:via-neutral-800 dark:to-primary/20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center text-neutral-900 dark:text-neutral-100 px-4 max-w-5xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-8 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent font-montserrat">
              {t.hero.title}
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-neutral-600 dark:text-neutral-300 max-w-4xl mx-auto leading-relaxed">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={goToSpaces}
                className="bg-gradient-to-r from-secondary to-accent hover:from-accent hover:to-secondary text-white py-4 px-8 rounded-xl shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold text-lg"
              >
                {t.hero.ctaPrimary}
              </button>
              <button
                onClick={() => window.scrollTo({ top: document.querySelector('#services')?.offsetTop, behavior: 'smooth' })}
                className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-white py-4 px-8 rounded-xl transition-all duration-300 font-semibold text-lg"
              >
                Découvrir nos services
              </button>
            </div>
          </motion.div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 bg-white dark:bg-gray-800">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Nos Services
              </h2>
              <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Découvrez nos packs adaptés à tous vos besoins professionnels
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Pack Startup & Freelance */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col"
              >
                <div className="relative overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop"
                    alt="Pack Startup & Freelance"
                    className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold mb-3 text-blue-600 dark:text-blue-400">
                    PACK STARTUP & FREE-LANCE
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                    Destiné aux startups, freelances, télétravailleurs et professionnels à la recherche d'un espace flexible, accessible et stimulant.
                  </p>
                  
                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      Équipements inclus :
                    </h4>
                    <ul className="space-y-1">
                      <li className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        Accès à un poste de travail en open space
                      </li>
                      <li className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        Connexion Internet haut débit
                      </li>
                      <li className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        Accès à l'espace détente (café/thé en option)
                      </li>
                      <li className="text-sm text-gray-500 italic">
                        +2 autres...
                      </li>
                    </ul>
                  </div>
                  
                  {/* Price and Capacity */}
                  <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-6 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span className="font-semibold">À partir de $300/mois</span>
                    <span>ou $15/jour</span>
                  </div>
                  
                  {/* Book Button */}
                </div>
              </motion.div>

              {/* Pack Welcome to Kin */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col"
              >
                <div className="relative overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop"
                    alt="Pack Welcome to Kin"
                    className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold mb-3 text-green-600 dark:text-green-400">
                    PACK WELCOME TO KIN
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                    Destiné aux entrepreneurs étrangers, membres de la diaspora et professionnels internationaux souhaitant s'implanter à Kinshasa.
                  </p>
                  
                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      Équipements inclus :
                    </h4>
                    <ul className="space-y-1">
                      <li className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        Accès à un poste de travail en open space
                      </li>
                      <li className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        Hébergement studio meublé à proximité
                      </li>
                      <li className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        Accompagnement personnalisé à l'installation
                      </li>
                      <li className="text-sm text-gray-500 italic">
                        +2 autres...
                      </li>
                    </ul>
                  </div>
                  
                  {/* Price and Capacity */}
                  <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-6 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span className="font-semibold">À partir de $1000/mois</span>
                    <span>Pack complet</span>
                  </div>
                  
                  {/* Book Button */}
                </div>
              </motion.div>

              {/* Pack Invest Lounge */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col"
              >
                <div className="relative overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop"
                    alt="Pack Invest Lounge"
                    className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold mb-3 text-purple-600 dark:text-purple-400">
                    PACK INVEST LOUNGE
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                    Destiné aux investisseurs et Business Angels souhaitant s'implanter ou développer une activité à Kinshasa.
                  </p>
                  
                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      Équipements inclus :
                    </h4>
                    <ul className="space-y-1">
                      <li className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                        Recherche de partenariats fiables
                      </li>
                      <li className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                        Facilitation des échanges locaux
                      </li>
                      <li className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                        Visibilité aux projets
                      </li>
                      <li className="text-sm text-gray-500 italic">
                        +2 autres...
                      </li>
                    </ul>
                  </div>
                  
                  {/* Price and Capacity */}
                  <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-6 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span className="font-semibold">Sur mesure</span>
                    <span>Personnalisé</span>
                  </div>
                  
                  {/* Book Button */}
                </div>
              </motion.div>

              {/* Domiciliation Commerciale */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col"
              >
                <div className="relative overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop"
                    alt="Domiciliation Commerciale"
                    className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold mb-3 text-orange-600 dark:text-orange-400">
                    DOMICILIATION COMMERCIALE
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                    Services de domiciliation commerciale destinée aux Startups, PME, Freelances et porteurs de projets.
                  </p>
                  
                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      Équipements inclus :
                    </h4>
                    <ul className="space-y-1">
                      <li className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                        <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                        Adresse légale à Kinshasa
                      </li>
                      <li className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                        <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                        Gestion du courrier administratif
                      </li>
                      <li className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                        <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                        Attestation de domiciliation
                      </li>
                      <li className="text-sm text-gray-500 italic">
                        +2 autres...
                      </li>
                    </ul>
                  </div>
                  
                  {/* Price and Capacity */}
                  <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-6 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span className="font-semibold">À partir de $800/an</span>
                    <span>ou $100/mois</span>
                  </div>
                  
                  {/* Book Button */}
                </div>
              </motion.div>
            </div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-center mt-16"
            >
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Besoin d'un pack personnalisé ? Contactez-nous pour une solution sur mesure.
              </p>
              <button
                onClick={() => navigate('/spaces')}
                className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-10 rounded-xl shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold text-lg"
              >
                Découvrir nos espaces
              </button>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-gradient-to-br from-secondary/5 to-accent/5 dark:from-neutral-900 dark:to-primary/10 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-secondary/20 to-accent/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-accent/10 to-secondary/20 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20 relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-6 font-montserrat">
              {t.featuresTitle}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-secondary to-accent mx-auto rounded-full"></div>
            </div>
            <div className="grid md:grid-cols-3 gap-12 relative z-10">
              {t.features.map(({ icon, title, desc }) => (
                <motion.article 
                  key={title} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-center bg-white/70 dark:bg-neutral-800/50 backdrop-blur-sm rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:scale-105 border border-secondary/20"
                >
                  <div className="bg-gradient-to-br from-secondary/10 to-accent/10 dark:from-secondary/20 dark:to-accent/20 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    {icon}
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4 font-montserrat">{title}</h3>
                  <p className="text-neutral-600 dark:text-neutral-300 text-lg leading-relaxed">{desc}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-white dark:bg-neutral-800 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-accent/5 dark:from-secondary/5 dark:to-accent/5"></div>
          
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20 relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-6 font-montserrat">
              {t.testimonialsTitle}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-secondary to-accent mx-auto rounded-full"></div>
            </div>
            <div className="space-y-12 relative z-10">
              {t.testimonials.map(({ name, text }) => (
                <motion.blockquote
                  key={name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-gradient-to-br from-secondary/5 to-accent/5 dark:from-neutral-900 dark:to-primary/10 p-10 rounded-2xl shadow-xl text-neutral-600 dark:text-neutral-300 text-center relative backdrop-blur-sm border border-secondary/20 dark:border-neutral-700/50"
                >
                  <div className="absolute top-4 left-6 text-6xl text-secondary/30 dark:text-accent/40 font-serif">"</div>
                  <p className="text-xl italic leading-relaxed mb-6 relative z-10">{text}</p>
                  <footer className="font-semibold text-neutral-900 dark:text-neutral-100 text-lg">— {name}</footer>
                </motion.blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Access to Spaces */}
        <section className="py-20 bg-gradient-to-br from-secondary to-accent relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/90 to-accent/90"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-montserrat">
              Découvrez nos espaces
              </h2>
              <p className="text-xl text-secondary-100 mb-10 max-w-3xl mx-auto leading-relaxed">
              Explorez notre gamme complète d'espaces de travail modernes et équipés.
              </p>
              <Link
                to="/spaces"
                className="inline-flex items-center px-10 py-4 bg-white text-secondary rounded-xl hover:bg-neutral-100 transition-all duration-300 font-semibold text-lg shadow-xl transform hover:scale-105"
              >
              Voir tous nos espaces
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </HelmetProvider>
  );
};

export default HomePage;