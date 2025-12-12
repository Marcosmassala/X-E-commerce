import Image from "next/image";
import { Search, ShoppingCart, User, Menu } from "lucide-react";

export default function FitnessPage() {
  return (
    <div className="bg-black text-white min-h-screen w-full">
     
      <nav className="flex justify-between items-center px-6 lg:px-26 py-4 border-b border-gray-800 sticky top-0 bg-black/95 backdrop-blur-sm z-50">
       
        <div className="flex gap-6 items-center">
          <button className="lg:hidden">
            <Menu size={24} />
          </button>
          <div className="flex gap-2 items-center">
          <span className="font-bold">LOGO</span>
          <a href="#">HOME</a>
        </div>
        </div>

       
        <div className="hidden lg:flex gap-8 items-center">
          <a href="#" className="hover:text-green-400 transition-colors duration-200 font-medium">
            HOME
          </a>
          <a href="#" className="hover:text-green-400 transition-colors duration-200 font-medium">
            STORE
          </a>
          <a href="#" className="hover:text-green-400 transition-colors duration-200 font-medium">
            NEWS
          </a>
          <a href="#" className="hover:text-green-400 transition-colors duration-200 font-medium">
            DELIVERY
          </a>
        </div>

    
        <div className="flex gap-4 items-center">
       
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search Product..."
              className="bg-gray-900 border border-gray-700 rounded-full pl-10 pr-4 py-2 text-sm w-64 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all duration-200"
            />
          </div>

         
          <div className="flex gap-3 items-center">
            <button className="relative p-2 hover:bg-gray-800 rounded-full transition-colors duration-200 group">
              <ShoppingCart size={20} className="group-hover:text-green-400" />
              <span className="absolute -top-1 -right-1 bg-green-500 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                3
              </span>
            </button>
            
            <button className="p-2 hover:bg-gray-800 rounded-full transition-colors duration-200 group">
              <User size={20} className="group-hover:text-green-400" />
            </button>
          </div>
        </div>
      </nav>

    
      <div className="md:hidden px-6 py-3 border-b border-gray-800">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search Product..."
            className="bg-gray-900 border border-gray-700 rounded-full pl-10 pr-4 py-2 text-sm w-full focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all duration-200"
          />
        </div>
      </div>

     
      <section className="relative w-full h-[500px] flex items-center justify-start px-6 lg:px-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-0" />
        <Image
          src="/imagen1.png"
          alt="Headphones"
          width={800}
          height={500}
          className="absolute right-0 top-0 h-full w-auto object-cover z-0"
        />
        <div className="relative z-10 max-w-lg">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Grab Up To <span className="text-green-400">50% Off</span> On Selected Headphones
          </h1>
          <p className="text-gray-300 mb-8 text-lg">
            High-quality audio with premium comfort and style
          </p>
          <button className="bg-white text-black px-6 py-2 rounded-full font-semibold">
            Buy Now
          </button>
        </div>
      </section>

     
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-6 lg:px-10 py-20 items-center">
        <div className="space-y-6">
          <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
            MAKE YOUR <span className="text-green-400">BODY SHAPE</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-lg leading-relaxed">
            O melhor produto encontras aqui, não percas as novidades que a nossa
            comunidade apresenta... então sem mais demoras faça a compra do teu
            produto favorito aqui.
          </p>
          <div className="flex gap-4">
            <button className="bg-green-500 hover:bg-green-600 text-black px-6 py-3 rounded-full font-semibold transition-all duration-200">
              Explore Products
            </button>
            <button className="border border-gray-600 hover:border-green-400 text-white px-6 py-3 rounded-full font-semibold transition-all duration-200">
              Learn More
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="relative">
            <Image 
              src="/imagem2.png" 
              alt="Creatine" 
              width={600} 
              height={400}
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-4 -right-4 bg-green-500 text-black px-4 py-2 rounded-full font-bold">
              -30% OFF
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section className="px-6 lg:px-10 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Featured Products</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Descubra nossa seleção premium de produtos para fitness e bem-estar
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:border-green-500/50 group"
            >
              <div className="relative">
                <Image
                  src="/imagem2.png"
                  alt="Creatine"
                  width={200}
                  height={200}
                  className="mx-auto transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  NEW
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <h3 className="font-semibold text-lg mb-2">Creatine XPLODE Power</h3>
                <p className="text-gray-400 text-sm mb-3">Rápida absorção</p>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="text-green-400 font-bold text-xl">$29.99</span>
                  <span className="text-gray-500 line-through text-sm">$39.99</span>
                </div>
                
                <button className="w-full bg-green-500 hover:bg-green-600 text-black py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center gap-2">
                  <ShoppingCart size={18} />
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <button className="px-8 py-3 border border-gray-600 hover:border-green-400 rounded-full font-semibold transition-all duration-200 hover:bg-green-400 hover:text-black">
            VER MAIS PRODUTOS
          </button>
        </div>
      </section>

      
      <footer className="bg-gray-900 border-t border-gray-800 py-12 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-xl mb-4 text-white fbg-clip-text text-transparent">
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
          <p>&copy; 2024 X. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}