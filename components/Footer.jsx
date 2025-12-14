export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-12 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-xl mb-4 text-white">
            LOGO HOME
          </h3>
          <p className="text-gray-400 text-sm">
            Sua loja de confiança para produtos de suplementos de alta qualidade.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4">Links Rápidos</h4>
          <div className="space-y-2 text-sm text-gray-400">
            <a href="#" className="block hover:text-green-400 transition-colors">Sobre Nós</a>
            <a href="#" className="block hover:text-green-400 transition-colors">Contato</a>
            <a href="#" className="block hover:text-green-400 transition-colors">FAQ</a>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4">Categorias</h4>
          <div className="space-y-2 text-sm text-gray-400">
            <a href="#" className="block hover:text-green-400 transition-colors">Suplementos</a>
            <a href="#" className="block hover:text-green-400 transition-colors">Equipamentos</a>
            <a href="#" className="block hover:text-green-400 transition-colors">Vestuário</a>
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4">Newsletter</h4>
          <div className="space-y-3">
            <input
              type="email"
              placeholder="Seu email"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-green-500"
            />
            <button className="w-full bg-green-500 hover:bg-green-600 text-black py-2 rounded-lg font-semibold transition-colors">
              Inscrever
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
        <p>&copy; 2025 X. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}