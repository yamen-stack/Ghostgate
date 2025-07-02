import React from 'react';
import { Check, Crown, Star, Zap } from 'lucide-react';
import { Translation } from '../types/translations';

interface PricingSectionProps {
  t: (key: keyof Translation) => string;
  isRTL: boolean;
  onJoinClick: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ t, isRTL, onJoinClick }) => {
  const courses = [
    {
      id: 'body',
      title: t('dreamBody'),
      description: t('dreamBodyDesc'),
      price: '15',
      currency: 'دينار',
      icon: Star,
      color: 'from-yellow-500 to-yellow-600',
      borderColor: 'border-yellow-500/30 hover:border-yellow-500/50',
      features: [
        t('eliteWorkouts'),
        t('nutritionMastery'),
        t('mindsetTransformation'),
        'Personal transformation coaching',
        'Progress tracking system',
        'Exclusive workout videos'
      ]
    },
    {
      id: 'social',
      title: t('socialMastery'),
      description: t('socialMasteryDesc'),
      price: '15',
      currency: 'دينار',
      icon: Crown,
      color: 'from-red-500 to-red-600',
      borderColor: 'border-red-500/30 hover:border-red-500/50',
      popular: true,
      features: [
        t('charismaDevelopment'),
        t('eliteNetworking'),
        t('influenceMastery'),
        'Communication mastery',
        'Leadership development',
        'Social confidence building'
      ]
    },
    {
      id: 'wealth',
      title: t('wealthCreation'),
      description: t('wealthCreationDesc'),
      price: '15',
      currency: 'دينار',
      icon: Zap,
      color: 'from-yellow-500 to-red-500',
      borderColor: 'border-yellow-500/30 hover:border-yellow-500/50',
      features: [
        t('businessStrategies'),
        t('investmentMastery'),
        t('financialFreedom'),
        'Passive income strategies',
        'Wealth mindset training',
        'Financial planning tools'
      ]
    }
  ];

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            {t('pricingTitle1')}
            <br />
            <span className="bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
              {t('pricingTitle2')}
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('pricingSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {courses.map((course) => {
            const IconComponent = course.icon;
            return (
              <div
                key={course.id}
                className={`relative bg-gray-900/50 border ${course.borderColor} rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-105 shadow-xl ${
                  course.popular ? 'ring-2 ring-yellow-500/50' : ''
                }`}
              >
                {course.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-gradient-to-r from-yellow-500 to-red-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="p-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${course.color}`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">{course.title}</h3>
                  </div>

                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="mb-6">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-4xl font-bold text-white">{course.price}</span>
                      <span className="text-xl text-yellow-400">{course.currency}</span>
                    </div>
                    <p className="text-gray-400 text-sm mt-1">One-time payment</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {course.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={onJoinClick}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg ${
                      course.popular
                        ? 'bg-gradient-to-r from-yellow-500 to-red-600 hover:from-yellow-600 hover:to-red-700 text-white shadow-yellow-500/25'
                        : 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-600'
                    }`}
                  >
                    {t('startTransformation')}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">
            {t('bundleOffer')}
          </p>
          <button
            onClick={onJoinClick}
            className="bg-gradient-to-r from-yellow-500 to-red-600 hover:from-yellow-600 hover:to-red-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg shadow-yellow-500/25"
          >
            {t('getAllThree')} - 40 {t('dinar')} ({t('save')} 5 {t('dinar')})
          </button>
        </div>
      </div>
    </section>
  );
};