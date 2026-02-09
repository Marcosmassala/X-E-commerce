import React from 'react'
import Link from 'next/link'
function Foter() {
    const footerLinks = {
        quickLinks: [
          { href: "/about", label: "Sobre Nós" },
          { href: "/contact", label: "Contato" },
          { href: "/faq", label: "FAQ" },
        ],
        categories: [
          { href: "/supplements", label: "Suplementos" },
          { href: "/equipment", label: "Equipamentos" },
          { href: "/clothing", label: "Vestuário" },
        ],
      };
  return (
    <div>
      
      <footer className="bg-gray-900 border-t border-gray-800 py-12 text-eh">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-white">
            <div className=''>
              <h3 className="font-bold text-xl mb-4">LOGO HOME</h3>
              <p className="text-gray-400 text-sm">
                Sua loja de confiança para produtos de suplementos de alta qualidade.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Links Rápidos</h4>
              <div className="space-y-2 text-sm text-gray-400">
                {footerLinks.quickLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="block hover:text-green-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Categorias</h4>
              <div className="space-y-2 text-sm text-gray-400">
                {footerLinks.categories.map((category, index) => (
                  <Link
                    key={index}
                    href={category.href}
                    className="block hover:text-green-400 transition-colors"
                  >
                    {category.label}
                  </Link>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Newsletter</h4>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Seu email"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-green-500 transition-colors"
                />
                <button className="w-full bg-green-500 hover:bg-green-600 text-black py-2 rounded-lg font-semibold transition-colors">
                  Inscrever
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} X-development. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Foter
