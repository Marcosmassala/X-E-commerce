import React from 'react'
import Link from 'next/link'
import { Facebook, Instagram, Mail } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 w-full">
      <div className="container mx-auto px-4 py-6 md:py-8">
        
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-white">
          
          {/* Brand Section */}
          <div>
            <h3 className="font-bold text-lg mb-2">LOGO HOME</h3>
            <p className="text-gray-400 text-sm mb-4">
              Sua loja de confiança para suplementos de alta qualidade.
            </p>
            
            {/* Social Media */}
            <div className="flex items-center gap-3">
              <a href="#" className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-lg hover:bg-green-500 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-lg hover:bg-green-500 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-3">Links Úteis</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <Link href="/about" className="block hover:text-green-400 transition-colors">
                Sobre Nós
              </Link>
              <Link href="/contact" className="block hover:text-green-400 transition-colors">
                Contato
              </Link>
              <Link href="/faq" className="block hover:text-green-400 transition-colors">
                FAQ
              </Link>
              <Link href="/supplements" className="block hover:text-green-400 transition-colors">
                Suplementos
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Mail className="w-5 h-5 text-green-400" />
              <h4 className="font-semibold">Newsletter</h4>
            </div>
            
            <p className="text-gray-400 text-sm mb-3">
              Receba ofertas exclusivas
            </p>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Seu email"
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-green-500 transition-colors"
              />
              <button className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm whitespace-nowrap">
                Inscrever
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} LOGO HOME. Todos os direitos reservados.
            </p>
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <Link href="/privacy" className="hover:text-green-400 transition-colors">
                Privacidade
              </Link>
              <Link href="/terms" className="hover:text-green-400 transition-colors">
                Termos
              </Link>
              <Link href="/shipping" className="hover:text-green-400 transition-colors">
                Envio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer