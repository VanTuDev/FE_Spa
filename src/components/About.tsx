"use client"

import { useTranslation } from 'react-i18next'
import { Phone, MessageCircle, Award, Sparkles, Heart, Shield } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"

const About = () => {
   const { t } = useTranslation()

   const features = [
      {
         icon: <Award className="h-8 w-8 text-pink-600" />,
         title: t('about.features.feature1.title'),
         description: t('about.features.feature1.description'),
      },
      {
         icon: <Shield className="h-8 w-8 text-pink-600" />,
         title: t('about.features.feature2.title'),
         description: t('about.features.feature2.description'),
      },
      {
         icon: <Sparkles className="h-8 w-8 text-pink-600" />,
         title: t('about.features.feature3.title'),
         description: t('about.features.feature3.description'),
      },
      {
         icon: <Heart className="h-8 w-8 text-pink-600" />,
         title: t('about.features.feature4.title'),
         description: t('about.features.feature4.description'),
      },
   ]

   const contactInfo = [
      {
         platform: "ZALO",
         numbers: ["0917078719", "0971500522"],
         icon: <MessageCircle className="h-5 w-5" />,
      },
   ]

   return (
      <section id="about" className="py-16 bg-gradient-to-br from-pink-50 to-purple-50 scroll-mt-20">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
               {/* Left side - Image */}
               <div className="relative">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                     <img
                        src="/imgs/Hero/hero5.png"
                        alt={t('about.description')}
                        className="w-full h-full object-cover object-center"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>

                  {/* Floating contact card */}
                  <Card className="absolute -bottom-6 -right-6 bg-white shadow-xl border-0 max-w-xs">
                     <CardContent className="p-6">
                        <div className="text-center">
                           <h4 className="font-bold text-gray-900 mb-2">{t('about.contact.title')}</h4>
                           {contactInfo.map((contact, index) => (
                              <div key={index} className="space-y-2">
                                 <div className="flex items-center justify-center gap-2 text-pink-600 font-medium">
                                    {contact.icon}
                                    <span>{contact.platform}</span>
                                 </div>
                                 {contact.numbers.map((number, idx) => (
                                    <a
                                       key={idx}
                                       href={`tel:${number}`}
                                       className="block text-gray-700 hover:text-pink-600 transition-colors font-medium"
                                    >
                                       {number}
                                    </a>
                                 ))}
                              </div>
                           ))}
                        </div>
                     </CardContent>
                  </Card>
               </div>

               {/* Right side - Content */}
               <div className="space-y-8">
                  <div className="space-y-4">
                     <div className="inline-block">
                        <span className="bg-pink-100 text-pink-800 text-sm font-medium px-4 py-2 rounded-full">
                           {t('about.title')}
                        </span>
                     </div>

                     <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">{t('about.main_title')}</h2>

                     <div className="space-y-2">
                        <p className="text-xl text-pink-600 font-semibold">{t('about.sub_title')}</p>
                        <p className="text-lg text-gray-600">{t('about.description')}</p>
                     </div>
                  </div>

                  <p className="text-gray-700 text-lg leading-relaxed">
                     {t('about.content')}
                  </p>

                  {/* Features grid */}
                  <div className="grid sm:grid-cols-2 gap-6">
                     {features.map((feature, index) => (
                        <div key={index} className="flex gap-4">
                           <div className="flex-shrink-0">{feature.icon}</div>
                           <div>
                              <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                              <p className="text-gray-600 text-sm">{feature.description}</p>
                           </div>
                        </div>
                     ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                     <Button
                        className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
                     >
                        <Phone className="h-5 w-5 mr-2" />
                        {t('about.contact.book_appointment')}
                     </Button>

                     <Button
                        variant="outline"
                        className="border-pink-600 text-pink-600 hover:bg-pink-50 px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 bg-transparent"
                     >
                        <MessageCircle className="h-5 w-5 mr-2" />
                        {t('about.contact.chat')}
                     </Button>
                  </div>

                  {/* Trust indicators */}
                  <div className="flex items-center gap-6 pt-6 border-t border-gray-200">
                     <div className="text-center">
                        <div className="text-2xl font-bold text-pink-600">5+</div>
                        <div className="text-sm text-gray-600">{t('about.stats.years')}</div>
                     </div>
                     <div className="text-center">
                        <div className="text-2xl font-bold text-pink-600">1000+</div>
                        <div className="text-sm text-gray-600">{t('about.stats.clients')}</div>
                     </div>
                     <div className="text-center">
                        <div className="text-2xl font-bold text-pink-600">100%</div>
                        <div className="text-sm text-gray-600">{t('about.stats.products')}</div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default About
