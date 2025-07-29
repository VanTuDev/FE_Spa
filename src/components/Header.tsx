import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Menu } from 'lucide-react'
import { Button } from './ui/button'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { getAssetPath } from '../utils/assets'

const Header = () => {
  const { t, i18n } = useTranslation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigationItems = [
    { key: 'about', href: '#about' },
    { key: 'services', href: '#services' },
    { key: 'space', href: '#space' },
    { key: 'news', href: '#news' },
    { key: 'certificates', href: '#certificates' },
    { key: 'qa', href: '#qa' },
  ]

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  const languageFlags = [
    { lng: 'vi', icon: 'vn' },
    { lng: 'en', icon: 'us' },
    { lng: 'zh', icon: 'cn' },
    { lng: 'ko', icon: 'kr' },
  ]

  // Hàm xử lý lướt xuống mượt mà
  const handleSmoothScroll = useCallback((e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Trừ đi chiều cao của header
        behavior: 'smooth'
      })
    }
  }, [])

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <a href="#" className="flex items-center">
            <img
              src={getAssetPath('/logo/logoYumiSpa.png')}
              alt={t('brand')}
              className="h-16 w-auto"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {navigationItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-gray-700 hover:text-pink-600 px-3 py-2 text-sm font-medium relative group transition-colors"
                onClick={(e) => handleSmoothScroll(e, item.key)}
              >
                {t(`nav.${item.key}`)}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-600 group-hover:w-full transition-all duration-200"></span>
              </a>
            ))}
          </nav>

          {/* Language Switch + Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Desktop Language Switch */}
            <div className="hidden lg:flex items-center gap-2">
              {languageFlags.map(({ lng, icon }) => (
                <img
                  key={lng}
                  src={`/flags/${icon}.svg`}
                  alt={lng}
                  title={t(`language.${lng}`)}
                  className={`w-5 h-5 cursor-pointer rounded-full ${i18n.language === lng ? 'ring-2 ring-pink-500' : ''
                    }`}
                  onClick={() => changeLanguage(lng)}
                />
              ))}
            </div>

            {/* Mobile Menu */}
            <div className="lg:hidden">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-80">
                  <div className="mt-8 flex flex-col space-y-4">
                    {navigationItems.map((item) => (
                      <a
                        key={item.key}
                        href={item.href}
                        className="text-gray-700 hover:text-pink-600 px-4 py-3 text-base border-b"
                        onClick={(e) => {
                          handleSmoothScroll(e, item.key)
                          setMobileMenuOpen(false)
                        }}
                      >
                        {t(`nav.${item.key}`)}
                      </a>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-6 justify-center">
                    {languageFlags.map(({ lng, icon }) => (
                      <img
                        key={lng}
                        src={`/flags/${icon}.svg`}
                        alt={lng}
                        title={t(`language.${lng}`)}
                        className="w-6 h-6 cursor-pointer rounded-full"
                        onClick={() => {
                          changeLanguage(lng)
                          setMobileMenuOpen(false)
                        }}
                      />
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
