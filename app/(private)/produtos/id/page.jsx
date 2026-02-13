'use client';
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  ShoppingCart, 
  Star,
  Heart,
  Check
} from "lucide-react";
import Image from "next/image";

export default function ProdutoPage() {
  const params = useParams();
  const router = useRouter();
  
  const [quantidade, setQuantidade] = useState(1);
  const [activeTab, setActiveTab] = useState("descricao");
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Dados das imagens do produto
  const productImages = [
    "/imagem2.png",
    "/imagem1.png",
    "/imagem3.png",
    "/imagem4.png",
  ];

  const aumentar = () => setQuantidade(quantidade + 1);
  const diminuir = () => setQuantidade(quantidade > 1 ? quantidade - 1 : 1);

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    
    // Simular requisição
    setTimeout(() => {
      setIsAddingToCart(false);
      setShowSuccess(true);
      
      // Simular adição ao carrinho
      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantidade,
        image: productImages[activeImage],
        total: product.price * quantidade
      };
      
      // Salvar no localStorage (simulando carrinho)
      const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
      currentCart.push(cartItem);
      localStorage.setItem('cart', JSON.stringify(currentCart));
      
      // Esconder mensagem de sucesso após 3 segundos
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  // Dados dos produtos
  const productsData = {
    1: {
      id: 1,
      name: "CREATINE XPLODE POWER",
      category: "CREATINA",
      size: "300g",
      price: 299.90,
      rating: 4.8,
      reviews: 1234,
      description: `A creatina é um composto orgânico produzido naturalmente pelo organismo a partir dos aminoácidos arginina, glicina e metionina. Sua síntese ocorre predominantemente no fígado, rins e pâncreas, e sua principal função está ligada ao fornecimento rápido de energia para as células.`,
      usage: `Recomenda-se a ingestão de 3-5g de creatina monohidratada por dia, preferencialmente após o treino. Misture uma colher de medida (5g) em 200-300ml de água ou suco. Mantenha-se hidratado durante o uso.`,
      benefits: [
        "Aumento de força muscular",
        "Melhora no desempenho atlético",
        "Recuperação mais rápida",
        "Aumento da massa magra"
      ],
      ingredients: "Creatina Monohidratada 100% pura",
      brand: "Supplement Brand",
    },
    2: {
      id: 2,
      name: "WHEY PROTEIN ISOLATE",
      category: "PROTEÍNA",
      size: "2kg",
      price: 449.90,
      rating: 4.9,
      reviews: 203,
      description: "Proteína isolada com 90% de pureza para definição muscular.",
      usage: "Misturar 1 dose (30g) com 300ml de água ou leite após o treino.",
      benefits: [
        "Alto teor proteico",
        "Baixo teor de lactose",
        "Absorção rápida",
        "Sabor delicioso"
      ],
      ingredients: "Proteína do Soro do Leite Isolada, Lecitina de Soja",
      brand: "Protein Brand",
    },
  };

  const productId = params.id;
  const product = productsData[productId] || productsData[1];
  
  // Calcular preço total
  const precoTotal = product.price * quantidade;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white p-4 md:p-8">
      
      {/* Mensagem de sucesso */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
          <div className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-xl flex items-center gap-3">
            <Check className="w-5 h-5" />
            <span>Produto adicionado ao carrinho!</span>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* Botão Voltar */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-all duration-300 group"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar aos produtos</span>
        </button>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Seção de Imagens */}
          <div className="flex-1">
            {/* Imagem Principal */}
            <div className="relative bg-gray-900 rounded-2xl p-6 shadow-xl overflow-hidden">
              
              {/* Botão Favorito */}
              <button
                onClick={toggleFavorite}
                className="absolute top-4 right-4 z-10 p-3 bg-gray-800 rounded-full hover:bg-red-500/20 transition-all duration-300"
              >
                <Heart className={`w-5 h-5 ${
                  isFavorite 
                    ? 'fill-red-500 text-red-500' 
                    : 'text-gray-400'
                }`} />
              </button>
              
              {/* Imagem Principal */}
              <div className="relative h-80 md:h-96">
                <Image
                  src={productImages[activeImage]}
                  alt={`${product.name} - Imagem ${activeImage + 1}`}
                  fill
                  className="object-contain transition-all duration-300"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
            
            {/* Miniaturas das Imagens */}
            <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`relative flex-shrink-0 rounded-lg p-2 transition-all duration-200 ${
                    activeImage === index
                      ? 'bg-gray-800 border-2 border-green-500'
                      : 'bg-gray-900 hover:bg-gray-800'
                  }`}
                >
                  <div className="relative w-16 h-16 md:w-20 md:h-20">
                    <Image
                      src={img}
                      alt={`Miniatura ${index + 1}`}
                      fill
                      className="object-contain"
                      sizes="80px"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Informações do Produto */}
          <div className="flex-1 space-y-6">
            {/* Categoria e Nome */}
            <div>
              <div className="text-sm text-green-400 font-medium uppercase tracking-wider mb-2">
                {product.category}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                {product.name}
              </h1>
            </div>

            {/* Preço */}
            <div>
              <div className="bg-gray-900 rounded-xl p-6">
                <div className="mb-4">
                  <div className="text-4xl font-bold text-green-500">
                    KZ {precoTotal.toFixed(2)}
                  </div>
                </div>
                
                <div className="text-gray-400">
                  <p>Tamanho: {product.size}</p>
                  <p className="mt-1">Em stock • Entrega grátis</p>
                </div>
              </div>
            </div>

            {/* Seletor de Quantidade */}
            <div>
              <div className="bg-gray-900 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold">Quantidade:</span>
                  <div className="flex items-center space-x-4 bg-gray-800 rounded-full px-4 py-2">
                    <button
                      onClick={diminuir}
                      className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full hover:bg-gray-600 transition-colors duration-200"
                      aria-label="Diminuir quantidade"
                    >
                      <span className="text-xl font-bold">-</span>
                    </button>
                    
                    <span className="text-2xl font-bold min-w-12 text-center">
                      {quantidade}
                    </span>
                    
                    <button
                      onClick={aumentar}
                      className="w-10 h-10 flex items-center justify-center bg-gray-700 rounded-full hover:bg-gray-600 transition-colors duration-200"
                      aria-label="Aumentar quantidade"
                    >
                      <span className="text-xl font-bold">+</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Botão Adicionar ao Carrinho */}
            <div>
              <button 
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-colors duration-300 ${
                  isAddingToCart 
                    ? 'bg-green-700 cursor-not-allowed' 
                    : 'bg-green-600 hover:bg-green-500'
                } flex items-center justify-center space-x-3`}
              >
                {isAddingToCart ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Adicionando...</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    <span>Adicionar ao Carrinho</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Tabs de Detalhes */}
        <div className="mt-12 lg:mt-16">
          <div className="flex space-x-8 border-b border-gray-800 pb-2 overflow-x-auto">
            {[
              { id: "descricao", label: "Descrição" },
              { id: "beneficios", label: "Benefícios" },
              { id: "ingredientes", label: "Ingredientes" },
              { id: "avaliacoes", label: "Avaliações" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 px-1 font-medium transition-colors duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-green-400 border-b-2 border-green-400"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Conteúdo das Tabs */}
          <div className="mt-8 text-gray-300">
            {activeTab === "descricao" && (
              <div className="space-y-6">
                <div className="bg-gray-900 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-white mb-4">
                    Descrição do Produto
                  </h2>
                  <p className="leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="bg-gray-900 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-white mb-4">
                    Modo de Uso
                  </h2>
                  <p className="leading-relaxed">
                    {product.usage}
                  </p>
                </div>
              </div>
            )}

            {activeTab === "beneficios" && (
              <div>
                <div className="bg-gray-900 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-white mb-4">Benefícios</h2>
                  <div className="space-y-3">
                    {product.benefits.map((benefit, index) => (
                      <div 
                        key={index} 
                        className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg"
                      >
                        <span className="text-green-500 mt-1">✓</span>
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "ingredientes" && (
              <div>
                <div className="bg-gray-900 rounded-xl p-6">
                  <h2 className="text-xl font-bold text-white mb-4">Ingredientes</h2>
                  <div className="p-4 bg-gray-800 rounded-lg">
                    <p className="leading-relaxed">{product.ingredients}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "avaliacoes" && (
              <div>
                <div className="bg-gray-900 rounded-xl p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div>
                      <p className="text-3xl font-bold">{product.rating}</p>
                      <div className="flex text-yellow-400 text-lg mt-1">
                        {"★".repeat(Math.floor(product.rating))}
                        {"☆".repeat(5 - Math.floor(product.rating))}
                      </div>
                      <p className="text-gray-400 text-sm mt-1">Baseado em {product.reviews} avaliações</p>
                    </div>
                  </div>
                  
                  {/* Exemplo de avaliações */}
                  <div className="space-y-4">
                    <div className="border-t border-gray-800 pt-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex text-yellow-400">★★★★★</div>
                        <span className="font-semibold">João Silva</span>
                      </div>
                      <p className="text-gray-300">
                        &quot;Produto excelente! Resultados visíveis em poucas semanas.&quot;
                      </p>
                    </div>
                    
                    {/* Outra avaliação de exemplo */}
                    <div className="border-t border-gray-800 pt-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex text-yellow-400">★★★★☆</div>
                        <span className="font-semibold">Maria Santos</span>
                      </div>
                      <p className="text-gray-300">
                        &quot;Ótimo custo-benefício, recomendo para quem busca qualidade.&quot;
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Estilos de animação simplificados */}
      <style jsx global>{`
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}