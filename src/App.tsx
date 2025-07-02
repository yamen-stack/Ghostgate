import React, { useState } from 'react';
import { 
  ArrowRight, 
  Users, 
  TrendingUp, 
  Heart, 
  DollarSign, 
  Star,
  CheckCircle,
  Menu,
  X,
  Shield,
  Target,
  Zap,
  Crown,
  BookOpen,
  Settings,
  Mail,
  Phone,
  MapPin,
  User,
  LogOut
} from 'lucide-react';
import { BlogList } from './components/BlogList';
import { BlogPost } from './components/BlogPost';
import { AdminPanel } from './components/AdminPanel';
import { LanguageSelector } from './components/LanguageSelector';
import { LoginModal } from './components/LoginModal';
import { PricingSection } from './components/PricingSection';
import { BlogPost as BlogPostType } from './types/blog';
import { useTranslation } from './hooks/useTranslation';

type View = 'home' | 'blog' | 'post' | 'admin';

interface User {
  name: string;
  email: string;
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedPost, setSelectedPost] = useState<BlogPostType | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { t, currentLanguage, changeLanguage, isRTL } = useTranslation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handlePostSelect = (post: BlogPostType) => {
    setSelectedPost(post);
    setCurrentView('post');
  };

  const handleBackToBlog = () => {
    setSelectedPost(null);
    setCurrentView('blog');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedPost(null);
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleJoinClick = () => {
    if (!user) {
      setIsLoginModalOpen(true);
    } else {
      // Handle course enrollment
      alert('Course enrollment functionality would be implemented here');
    }
  };

  if (currentView === 'admin') {
    return <AdminPanel onClose={() => setCurrentView('home')} />;
  }

  if (currentView === 'post' && selectedPost) {
    return <BlogPost post={selectedPost} onBack={handleBackToBlog} t={t} isRTL={isRTL} />;
  }

  if (currentView === 'blog') {
    return (
      <div className={isRTL ? 'rtl' : 'ltr'} dir={isRTL ? 'rtl' : 'ltr'}>
        {/* Navigation for Blog */}
        <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-md border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2 cursor-pointer" onClick={handleBackToHome}>
                <Crown className="h-8 w-8 text-yellow-500" />
                <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
                  GhostGate
                </span>
              </div>
              
              <div className="hidden md:flex items-center space-x-8">
                <button onClick={handleBackToHome} className="text-gray-300 hover:text-yellow-400 transition-colors">{t('home')}</button>
                <button className="text-yellow-400">{t('blog')}</button>
                <LanguageSelector 
                  currentLanguage={currentLanguage}
                  onLanguageChange={changeLanguage}
                  isRTL={isRTL}
                />
                {user ? (
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-300">{t('welcome')}, {user.name}</span>
                    <button 
                      onClick={handleLogout}
                      className="text-gray-300 hover:text-yellow-400 transition-colors"
                    >
                      <LogOut className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => setIsLoginModalOpen(true)}
                    className="text-gray-300 hover:text-yellow-400 transition-colors"
                  >
                    {t('login')}
                  </button>
                )}
                <button 
                  onClick={() => setCurrentView('admin')}
                  className="text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  <Settings className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </nav>
        <BlogList onPostSelect={handlePostSelect} t={t} isRTL={isRTL} />
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-black text-white ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-black/90 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Crown className="h-8 w-8 text-yellow-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
                GhostGate
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#pillars" className="text-gray-300 hover:text-yellow-400 transition-colors">{t('pillars')}</a>
              <a href="#pricing" className="text-gray-300 hover:text-yellow-400 transition-colors">Pricing</a>
              <a href="#community" className="text-gray-300 hover:text-yellow-400 transition-colors">{t('community')}</a>
              <a href="#testimonials" className="text-gray-300 hover:text-yellow-400 transition-colors">{t('successStories')}</a>
              <button 
                onClick={() => setCurrentView('blog')}
                className="flex items-center space-x-1 text-gray-300 hover:text-yellow-400 transition-colors"
              >
                <BookOpen className="h-4 w-4" />
                <span>{t('blog')}</span>
              </button>
              <LanguageSelector 
                currentLanguage={currentLanguage}
                onLanguageChange={changeLanguage}
                isRTL={isRTL}
              />
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-300">{t('welcome')}, {user.name}</span>
                  <button 
                    onClick={handleLogout}
                    className="text-gray-300 hover:text-yellow-400 transition-colors"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setIsLoginModalOpen(true)}
                  className="text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  {t('login')}
                </button>
              )}
              <button 
                onClick={() => setCurrentView('admin')}
                className="text-gray-300 hover:text-yellow-400 transition-colors"
              >
                <Settings className="h-5 w-5" />
              </button>
              <button 
                onClick={handleJoinClick}
                className="bg-gradient-to-r from-yellow-500 to-red-600 hover:from-yellow-600 hover:to-red-700 px-6 py-2 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg shadow-yellow-500/25"
              >
                {t('joinElite')}
              </button>
            </div>

            <div className="md:hidden">
              <button onClick={toggleMenu} className="text-gray-300 hover:text-yellow-400">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900 border-t border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#pillars" className="block px-3 py-2 text-gray-300 hover:text-yellow-400">{t('pillars')}</a>
              <a href="#pricing" className="block px-3 py-2 text-gray-300 hover:text-yellow-400">Pricing</a>
              <a href="#community" className="block px-3 py-2 text-gray-300 hover:text-yellow-400">{t('community')}</a>
              <a href="#testimonials" className="block px-3 py-2 text-gray-300 hover:text-yellow-400">{t('successStories')}</a>
              <button 
                onClick={() => setCurrentView('blog')}
                className="block w-full text-left px-3 py-2 text-gray-300 hover:text-yellow-400"
              >
                {t('blog')}
              </button>
              <div className="px-3 py-2">
                <LanguageSelector 
                  currentLanguage={currentLanguage}
                  onLanguageChange={changeLanguage}
                  isRTL={isRTL}
                />
              </div>
              {user ? (
                <div className="px-3 py-2">
                  <span className="text-gray-300 block mb-2">{t('welcome')}, {user.name}</span>
                  <button 
                    onClick={handleLogout}
                    className="text-gray-300 hover:text-yellow-400"
                  >
                    {t('logout')}
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setIsLoginModalOpen(true)}
                  className="block w-full text-left px-3 py-2 text-gray-300 hover:text-yellow-400"
                >
                  {t('login')}
                </button>
              )}
              <button 
                onClick={() => setCurrentView('admin')}
                className="block w-full text-left px-3 py-2 text-gray-300 hover:text-yellow-400"
              >
                {t('admin')}
              </button>
              <button 
                onClick={handleJoinClick}
                className="w-full mt-2 bg-gradient-to-r from-yellow-500 to-red-600 px-4 py-2 rounded-lg font-semibold shadow-lg shadow-yellow-500/25"
              >
                {t('joinElite')}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/10 to-red-900/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-900/20 via-transparent to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {t('heroTitle1')}
                <br />
                <span className="bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
                  {t('heroTitle2')}
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
                {t('heroSubtitle')}
                <span className="text-yellow-400 font-semibold"> {t('dreamBody')}</span>, 
                <span className="text-red-400 font-semibold"> {t('socialMastery')}</span>, {t('wealthCreation')} 
                <span className="text-yellow-500 font-semibold"> {t('wealthCreation')}</span>.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-start mb-12">
                <button 
                  onClick={handleJoinClick}
                  className="group bg-gradient-to-r from-yellow-500 to-red-600 hover:from-yellow-600 hover:to-red-700 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 shadow-lg shadow-yellow-500/25"
                >
                  <span>{t('unlockPotential')}</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex items-center space-x-2 text-gray-400">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full border-2 border-black"></div>
                    <div className="w-8 h-8 bg-red-500 rounded-full border-2 border-black"></div>
                    <div className="w-8 h-8 bg-yellow-600 rounded-full border-2 border-black"></div>
                  </div>
                  <span className="text-sm">2,847 {t('eliteMembers')}</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-red-500/20 rounded-2xl blur-xl"></div>
              <img 
                src="https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Success mindset" 
                className="relative rounded-2xl shadow-2xl w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">2,847</div>
              <div className="text-gray-300">{t('statsMembers')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-500 mb-2">98%</div>
              <div className="text-gray-300">{t('statsSuccessRate')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Pillars Section */}
      <section id="pillars" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              {t('pillarsTitle1')}
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
                {t('pillarsTitle2')}
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t('pillarsSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Body Pillar */}
            <div className="group bg-gradient-to-br from-yellow-900/20 to-yellow-800/10 border border-yellow-800/30 rounded-2xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300 transform hover:scale-105 shadow-xl">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Fitness transformation" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <Heart className="h-8 w-8 text-yellow-400" />
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-yellow-400 mb-4">{t('dreamBody')}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {t('dreamBodyDesc')}
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                    <span>{t('eliteWorkouts')}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                    <span>{t('nutritionMastery')}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                    <span>{t('mindsetTransformation')}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Social Life Pillar */}
            <div className="group bg-gradient-to-br from-red-900/20 to-red-800/10 border border-red-800/30 rounded-2xl overflow-hidden hover:border-red-500/50 transition-all duration-300 transform hover:scale-105 shadow-xl">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Social networking" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <Users className="h-8 w-8 text-red-400" />
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-red-400 mb-4">{t('socialMastery')}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {t('socialMasteryDesc')}
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <span>{t('charismaDevelopment')}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <span>{t('eliteNetworking')}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <span>{t('influenceMastery')}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Money Pillar */}
            <div className="group bg-gradient-to-br from-yellow-900/20 to-red-900/10 border border-yellow-800/30 rounded-2xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300 transform hover:scale-105 shadow-xl">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Wealth building" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <DollarSign className="h-8 w-8 text-yellow-500" />
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-yellow-500 mb-4">{t('wealthCreation')}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {t('wealthCreationDesc')}
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                    <span>{t('businessStrategies')}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                    <span>{t('investmentMastery')}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                    <span>{t('financialFreedom')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection t={t} isRTL={isRTL} onJoinClick={handleJoinClick} />

      {/* Inspiring Figures Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              {t('mentorsTitle1')}
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
                {t('mentorsTitle2')}
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t('mentorsSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group relative overflow-hidden rounded-2xl">
              <img 
                src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400" 
                alt="Business mentor" 
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-bold text-lg mb-1">{t('businessMasteryTitle')}</h3>
                <p className="text-gray-300 text-sm">{t('businessMasteryDesc')}</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl">
              <img 
                src="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400" 
                alt="Fitness mentor" 
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-bold text-lg mb-1">{t('peakPerformanceTitle')}</h3>
                <p className="text-gray-300 text-sm">{t('peakPerformanceDesc')}</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl">
              <img 
                src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400" 
                alt="Social mentor" 
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-bold text-lg mb-1">{t('socialInfluenceTitle')}</h3>
                <p className="text-gray-300 text-sm">{t('socialInfluenceDesc')}</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl">
              <img 
                src="https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400" 
                alt="Investment mentor" 
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-bold text-lg mb-1">{t('wealthBuildingTitle')}</h3>
                <p className="text-gray-300 text-sm">{t('wealthBuildingDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                {t('communityTitle1')}
                <br />
                <span className="bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
                  {t('communityTitle2')}
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                {t('communitySubtitle')}
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Target className="h-6 w-6 text-yellow-400" />
                  <span className="text-gray-300">{t('dailyAccountability')}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Zap className="h-6 w-6 text-red-400" />
                  <span className="text-gray-300">{t('liveMasterclasses')}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Crown className="h-6 w-6 text-yellow-500" />
                  <span className="text-gray-300">{t('exclusiveNetworking')}</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-red-500/20 rounded-2xl blur-xl"></div>
              <img 
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Elite community" 
                className="relative rounded-2xl shadow-2xl w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              {t('testimonialsTitle1')}
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
                {t('testimonialsTitle2')}
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-900/50 border border-yellow-800/30 rounded-2xl p-6 hover:border-yellow-500/50 transition-colors">
              <div className="flex space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-4 italic">
                "{t('testimonial1')}"
              </p>
              <div className="flex items-center space-x-3">
                <img 
                  src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100" 
                  alt="Member" 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-white">Marcus R.</div>
                  <div className="text-gray-400 text-sm">{t('ceoEntrepreneur')}</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 border border-red-800/30 rounded-2xl p-6 hover:border-red-500/50 transition-colors">
              <div className="flex space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-4 italic">
                "{t('testimonial2')}"
              </p>
              <div className="flex items-center space-x-3">
                <img 
                  src="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100" 
                  alt="Member" 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-white">David L.</div>
                  <div className="text-gray-400 text-sm">{t('salesDirector')}</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 border border-yellow-800/30 rounded-2xl p-6 hover:border-yellow-500/50 transition-colors">
              <div className="flex space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-4 italic">
                "{t('testimonial3')}"
              </p>
              <div className="flex items-center space-x-3">
                <img 
                  src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100" 
                  alt="Member" 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-white">Alex K.</div>
                  <div className="text-gray-400 text-sm">{t('investorTrader')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-yellow-900/20 to-red-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            {t('ctaTitle1')}
            <br />
            <span className="bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
              {t('ctaTitle2')}
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            {t('ctaSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={handleJoinClick}
              className="group bg-gradient-to-r from-yellow-500 to-red-600 hover:from-yellow-600 hover:to-red-700 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 shadow-lg shadow-yellow-500/25"
            >
              <span>{t('joinGhostGate')}</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="text-gray-400 text-sm">
              {t('limitedSpots')}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Logo and Description */}
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <Crown className="h-8 w-8 text-yellow-500" />
                <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
                  GhostGate
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Transform your life through the three pillars of success: Body, Social Life, and Wealth.
              </p>
            </div>

            {/* Contacts */}
            <div className="md:col-span-1">
              <h3 className="text-white font-semibold mb-4">{t('contacts')}</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-400">
                  <Mail className="h-4 w-4 text-yellow-400" />
                  <a href="mailto:elite@ghostgate.com" className="hover:text-yellow-400 transition-colors">
                    {t('email')}
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                  <Phone className="h-4 w-4 text-yellow-400" />
                  <a href="tel:+15551234357" className="hover:text-yellow-400 transition-colors">
                    {t('phone')}
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                  <MapPin className="h-4 w-4 text-yellow-400" />
                  <span>{t('address')}</span>
                </div>
              </div>
            </div>

            {/* Owner Info */}
            <div className="md:col-span-1">
              <h3 className="text-white font-semibold mb-4">{t('ownerLabel')}</h3>
              <div className="text-gray-400 text-sm">
                <p className="font-medium text-yellow-400">M. Yamen</p>
                <p className="text-xs mt-1 opacity-75">Elite Performance Coach & Entrepreneur</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 text-sm mb-4 md:mb-0">
                {t('allRightsReserved')}
              </div>
              <div className="text-gray-500 text-xs">
                <span className="opacity-50">Private & Confidential</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
}

export default App;