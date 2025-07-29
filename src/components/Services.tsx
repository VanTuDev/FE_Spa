"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Star, Gift, Phone, MessageCircle, Sparkles, Heart, Zap, Shield, X } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { getAssetPath } from '../utils/assets'

// Import services data
import viServices from "../i18n/services/vi.services.json"
import enServices from "../i18n/services/en.services.json"

// Define service type
interface ServiceItem {
   id: string
   category: string
   name: string
   description?: string
   price?: string
   price_single?: string
   price_10_sessions?: string
   price_2_years?: string
   note?: string
   featured?: boolean
   image: string
}

const Services = () => {
   const { t, i18n } = useTranslation()
   const [selectedCategory, setSelectedCategory] = useState("all")
   const [servicesData, setServicesData] = useState<ServiceItem[]>([])
   const [previewImg, setPreviewImg] = useState<string | null>(null)

   // Load services data based on current language
   useEffect(() => {
      const currentLanguage = i18n.language;
      if (currentLanguage === 'en') {
         setServicesData(enServices as ServiceItem[]);
      } else {
         // Default to Vietnamese for other languages until we add more translations
         setServicesData(viServices as ServiceItem[]);
      }
   }, [i18n.language]);

   // Get unique categories from services data
   const uniqueCategories = Array.from(new Set(servicesData.map(service => service.category)));

   const categories = [
      { id: "all", name: t('services.categories.all'), icon: <Sparkles className="h-4 w-4" /> },
      ...uniqueCategories.map(category => {
         let icon = <Heart className="h-4 w-4" />;
         if (category.includes("Triệt lông") || category.includes("Hair Removal")) {
            icon = <Star className="h-4 w-4" />;
         } else if (category.includes("Meso") || category.includes("Complete Meso")) {
            icon = <Zap className="h-4 w-4" />;
         } else if (category.includes("Chăm sóc da") || category.includes("Acne Skin")) {
            icon = <Shield className="h-4 w-4" />;
         }
         return {
            id: category,
            name: category,
            icon
         };
      })
   ]

   const formatPrice = (price: string | undefined) => {
      if (!price) return t('services.price_contact')
      return price
   }

   const filteredServices =
      selectedCategory === "all" ? servicesData : servicesData.filter((service) => service.category === selectedCategory)

   const featuredServices = servicesData.filter((service) => service.featured)

   const menuImages = [
      getAssetPath('/imgs/Services/menu1.png'),
      getAssetPath('/imgs/Services/menu2.png'),
      getAssetPath('/imgs/Services/menu3.png'),
      getAssetPath('/imgs/Services/menu4.png'),
      getAssetPath('/imgs/Services/menu5.png'),
      getAssetPath('/imgs/Services/menu6.png'),
      getAssetPath('/imgs/Services/menu7.png'),
      getAssetPath('/imgs/Services/menu8.png'),
      getAssetPath('/imgs/Services/menu9.png'),
   ]

   return (
      <section id="services" className="py-16 bg-white scroll-mt-20">
         <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
            {/* Menu các gói dịch vụ - 3 hàng, mỗi hàng 3 ảnh, đều, căn giữa */}
            <div className="mb-12 flex flex-col items-center">
               <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">{t('services.menu_title')}</h3>
               <div className="w-full max-w-7xl bg-transparent">
                  {/* Hàng 1: 3 ảnh */}
                  <div className="flex gap-8 justify-center mb-8 flex-wrap w-full">
                     {menuImages.slice(0, 3).map((img, idx) => (
                        <div
                           key={img}
                           className="cursor-pointer group relative flex justify-center items-center w-full max-w-xs"
                           onClick={() => setPreviewImg(img)}
                        >
                           <img
                              src={img.replace('../../public', '')}
                              alt={`Menu ${idx + 1}`}
                              className="w-full max-w-[350px] h-auto"
                           />
                        </div>
                     ))}
                  </div>
                  {/* Hàng 2: 3 ảnh */}
                  <div className="flex gap-8 justify-center mb-8 flex-wrap w-full">
                     {menuImages.slice(3, 6).map((img, idx) => (
                        <div
                           key={img}
                           className="cursor-pointer group relative flex justify-center items-center w-full max-w-xs"
                           onClick={() => setPreviewImg(img)}
                        >
                           <img
                              src={img.replace('../../public', '')}
                              alt={`Menu ${idx + 4}`}
                              className="w-full max-w-[350px] h-auto"
                           />
                        </div>
                     ))}
                  </div>
                  {/* Hàng 3: 3 ảnh */}
                  <div className="flex gap-8 justify-center flex-wrap w-full">
                     {menuImages.slice(6, 9).map((img, idx) => (
                        <div
                           key={img}
                           className="cursor-pointer group relative flex justify-center items-center w-full max-w-xs"
                           onClick={() => setPreviewImg(img)}
                        >
                           <img
                              src={img.replace('../../public', '')}
                              alt={`Menu ${idx + 7}`}
                              className="w-full max-w-[350px] h-auto"
                           />
                        </div>
                     ))}
                  </div>
               </div>
            </div>
            {/* Modal preview ảnh menu */}
            {previewImg && (
               <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                  <div className="relative bg-white rounded-2xl shadow-2xl p-4 max-w-3xl w-full flex flex-col items-center">
                     <button onClick={() => setPreviewImg(null)} className="absolute top-2 right-2 bg-pink-600 text-white rounded-full p-2 hover:bg-pink-700"><X className="w-5 h-5" /></button>
                     <img src={previewImg.replace('../../public', '')} alt="Preview menu" className="rounded-xl max-h-[70vh] w-auto object-contain" />
                  </div>
               </div>
            )}
            {/* Header */}
            <div className="text-center mb-12">
               <div className="inline-block">
                  <span className="bg-pink-100 text-pink-800 text-sm font-medium px-4 py-2 rounded-full">
                     {t('services.title')}
                  </span>
               </div>
               <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-6">
                  {t('services.main_title')}
                  <span className="text-pink-600"> {t('services.highlight')}</span>
               </h2>
               <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {t('services.description')}
               </p>
            </div>

            {/* Promotional Banner */}
            <div className="mb-12 flex justify-center">
               <div className="relative max-w-2xl">
                  <img
                     src={getAssetPath('/imgs/Services/Service1.png')}
                     alt={t('services.title')}
                     className="w-full h-auto rounded-2xl shadow-2xl"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-pink-600 text-white px-6 py-3 rounded-full shadow-lg">
                     <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span className="font-semibold">0971.500.522</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* Featured Services */}
            <div className="mb-12">
               <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t('services.featured')}</h3>
               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {featuredServices.map((service) => (
                     <div key={service.id} className="relative group">
                        {/* Hot Border Effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-red-500 via-pink-500 to-red-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>

                        <Card className="relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
                           {/* Hot Badge */}
                           <div className="absolute top-4 right-4 z-10">
                              <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-bounce">
                                 {t('services.hot_badge')}
                              </div>
                           </div>

                           {/* Service Image */}
                           <div className="relative h-48 overflow-hidden">
                              <img
                                 src={service.image}
                                 alt={service.name}
                                 className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                           </div>

                           <CardHeader className="pb-3">
                              <CardTitle className="text-lg font-bold text-gray-900 line-clamp-2 h-14 flex items-center">
                                 {service.name}
                              </CardTitle>
                              <div className="flex items-center gap-2 bg-pink-50 p-2 rounded-lg h-12">
                                 <Gift className="h-4 w-4 text-pink-600 flex-shrink-0" />
                                 <span className="text-sm text-pink-600 font-medium line-clamp-1">
                                    {service.price_2_years || service.price || (service.price_10_sessions ? `10 buổi: ${service.price_10_sessions}` : '')}
                                 </span>
                              </div>
                           </CardHeader>

                           <CardContent className="pt-0 flex-grow flex flex-col justify-between">
                              <p className="text-gray-600 text-sm mb-4 line-clamp-2 h-10">{service.description || service.category}</p>
                              <div className="flex items-center justify-between mt-auto">
                                 <div className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-red-500 bg-clip-text text-transparent">
                                    {service.price_single || formatPrice(service.price)}
                                 </div>
                                 <Button
                                    className="bg-gradient-to-r from-pink-600 to-red-500 hover:from-pink-700 hover:to-red-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                                 >
                                    {t('services.book_button')}
                                 </Button>
                              </div>
                           </CardContent>
                        </Card>
                     </div>
                  ))}
               </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
               {categories.map((category) => (
                  <Button
                     key={category.id}
                     variant={selectedCategory === category.id ? "default" : "outline"}
                     onClick={() => setSelectedCategory(category.id)}
                     className={`flex items-center gap-2 ${selectedCategory === category.id
                        ? "bg-pink-600 hover:bg-pink-700"
                        : "border-pink-200 text-pink-600 hover:bg-pink-50"
                        }`}
                  >
                     {category.icon}
                     {category.name}
                  </Button>
               ))}
            </div>

            {/* All Services Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
               {filteredServices.map((service) => (
                  <Card
                     key={service.id}
                     className="hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-pink-300 overflow-hidden h-full flex flex-col"
                  >
                     {/* Service Image */}
                     <div className="relative h-48 overflow-hidden">
                        <img
                           src={service.image}
                           alt={service.name}
                           className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                        {service.featured && (
                           <div className="absolute top-3 right-3">
                              <Badge className="bg-red-500 text-white hover:bg-red-500 shadow-lg">
                                 <Star className="h-3 w-3 mr-1" />
                                 {t('services.hot_badge')}
                              </Badge>
                           </div>
                        )}
                     </div>

                     <CardHeader>
                        <CardTitle className="text-lg font-semibold text-gray-900 h-14 flex items-center">{service.name}</CardTitle>
                        <div className="flex items-center gap-2 text-pink-600 bg-pink-50 p-2 rounded-lg h-12">
                           <Gift className="h-4 w-4 flex-shrink-0" />
                           <span className="text-sm font-medium line-clamp-1">
                              {service.price_2_years ? `2 năm: ${service.price_2_years}` : (service.price || '')}
                           </span>
                        </div>
                     </CardHeader>

                     <CardContent className="flex-grow flex flex-col justify-between">
                        <p className="text-gray-600 text-sm mb-4 h-10 line-clamp-2">{service.description || service.category}</p>
                        <div className="flex items-center justify-between mt-auto">
                           <div className="text-xl font-bold text-pink-600">{service.price_single || formatPrice(service.price)}</div>
                           <div className="flex gap-2">
                              <Button
                                 variant="outline"
                                 className="border-pink-200 text-pink-600 hover:bg-pink-50 bg-transparent"
                              >
                                 <MessageCircle className="h-4 w-4" />
                              </Button>
                              <Button className="bg-pink-600 hover:bg-pink-700">
                                 {t('services.book_button')}
                              </Button>
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               ))}
            </div>

            {/* Contact CTA */}
            <div className="mt-12 text-center bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8">
               <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {t('services.cta.title')}
               </h3>
               <p className="text-gray-600 mb-6">{t('services.cta.description')}</p>
               <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3">
                     <Phone className="h-5 w-5 mr-2" />
                     {t('services.cta.call')}
                  </Button>
                  <Button
                     variant="outline"
                     className="border-pink-600 text-pink-600 hover:bg-pink-50 px-8 py-3 bg-transparent"
                  >
                     <MessageCircle className="h-5 w-5 mr-2" />
                     {t('services.cta.chat')}
                  </Button>
               </div>
            </div>
         </div>
      </section>
   )
}

export default Services
