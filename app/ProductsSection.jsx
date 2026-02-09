'use client'
import Image from "next/image";
import { ShoppingCart, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const ProductsSection = ({ onCloseProducts, slides }) => { 
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [showCartNotification, setShowCartNotification] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Carregar carrinho do localStorage ao iniciar - TOTALMENTE CORRIGIDO
  useEffect(() => {
    // Função auxiliar para lidar com a inicialização
    const initializeCart = () => {
      try {
        const savedCart = localStorage.getItem('shopping-cart');
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          return { success: true, cart: parsedCart };
        }
        return { success: true, cart: [] };
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
        return { success: false, error };
      }
    };

    // Apenas executar se não estiver inicializado
    if (!isInitialized) {
      const result = initializeCart();
      
      // Usar setTimeout para evitar setState síncrono
      const timer = setTimeout(() => {
        if (result.success && result.cart) {
          setCart(result.cart);
        }
        setIsInitialized(true);
      }, 0);
      
      return () => clearTimeout(timer);
    }
  }, [isInitialized]);

  // Opção 2: Mais simples e eficiente
  useEffect(() => {
    let mounted = true;
    
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem('shopping-cart');
        if (savedCart && mounted) {
          const parsedCart = JSON.parse(savedCart);
          
          // Usar requestAnimationFrame para batch de atualizações
          requestAnimationFrame(() => {
            if (mounted) {
              setCart(parsedCart);
            }
          });
        }
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
      }
    };

    loadCart();
    
    return () => {
      mounted = false;
    };
  }, []);

  // Opção 3: A melhor - separando a lógica
  useEffect(() => {
    const initializeApp = () => {
      // 1. Carregar carrinho
      const savedCart = localStorage.getItem('shopping-cart');
      let loadedCart = [];
      
      if (savedCart) {
        try {
          loadedCart = JSON.parse(savedCart);
        } catch (error) {
          console.error('Erro ao carregar carrinho:', error);
        }
      }
      
      // 2. Atualizar estados em batch
      requestAnimationFrame(() => {
        setCart(loadedCart);
        setIsInitialized(true);
      });
    };

    if (!isInitialized) {
      initializeApp();
    }
  }, [isInitialized]);

  const products = [
    { 
      id: 1, 
      name: "Creatine Monohydrate", 
      category: "CREATINA", 
      size: "300g", 
      price: 29990,
      rating: 4.8,
      reviews: 127,
      image: ""
    },
    { 
      id: 2, 
      name: "Whey Protein Isolate", 
      category: "PROTEÍNA", 
      size: "2kg", 
      price: 44990,
      rating: 4.9,
      reviews: 203,
      image: ""
    },
    { 
      id: 3, 
      name: "Pre-Workout Complex", 
      category: "ENERGIA", 
      size: "400g", 
      price: 34990,
      rating: 4.7,
      reviews: 89,
      image: ""
    },
    { 
      id: 4, 
      name: "BCAA 2:1:1", 
      category: "RECUPERAÇÃO", 
      size: "500g", 
      price: 27990,
      rating: 4.6,
      reviews: 156,
      image: ""
    },
    { 
      id: 5, 
      name: "Glutamine Pure", 
      category: "SAÚDE", 
      size: "300g", 
      price: 22990,
      rating: 4.5,
      reviews: 74,
      image: ""
    },
    { 
      id: 6, 
      name: "Mass Gainer Pro", 
      category: "MASSA", 
      size: "3kg", 
      price: 51990,
      rating: 4.4,
      reviews: 98,
      image: ""
    },
  ];

  const formatPrice = (value) => {
    return (value / 1000).toFixed(0) + '.000';
  };

  const handleCardClick = (product) => {
    router.push(`/compra`);
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    
    // Verificar se o produto já está no carrinho
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    
    let newCart;
    
    if (existingItemIndex >= 0) {
      // Se já existe, aumenta a quantidade
      newCart = [...cart];
      newCart[existingItemIndex] = {
        ...newCart[existingItemIndex],
        quantidade: newCart[existingItemIndex].quantidade + 1,
        total: (newCart[existingItemIndex].quantidade + 1) * newCart[existingItemIndex].price
      };
    } else {
      // Se não existe, adiciona novo item
      const cartItem = {
        id: product.id,
        name: product.name,
        category: product.category,
        size: product.size,
        price: product.price,
        image: product.image || slides.find(s => s.id === product.id)?.image || "/imagem2.png",
        quantidade: 1,
        total: product.price,
        addedAt: new Date().toISOString()
      };
      newCart = [...cart, cartItem];
    }
    
    // Atualizar estado
    setCart(newCart);
    
    // Salvar no localStorage
    localStorage.setItem('shopping-cart', JSON.stringify(newCart));
    
    // Mostrar notificação
    setShowCartNotification(true);
    
    // Esconder notificação após 3 segundos
    setTimeout(() => {
      setShowCartNotification(false);
    }, 3000);
    
    console.log(`Adicionado ao carrinho: ${product.name}`);
    console.log('Carrinho atual:', newCart);
  };

  // Calcular total do carrinho
  const calculateCartTotal = () => {
    return cart.reduce((total, item) => total + item.total, 0);
  };

  // Calcular quantidade total de itens
  const calculateTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantidade, 0);
  };

  // Remover item do carrinho
  const removeFromCart = (productId, e) => {
    e.stopPropagation();
    const newCart = cart.filter(item => item.id !== productId);
    setCart(newCart);
    localStorage.setItem('shopping-cart', JSON.stringify(newCart));
  };

  // Atualizar quantidade
  const updateQuantity = (productId, newQuantity, e) => {
    e.stopPropagation();
    if (newQuantity < 1) {
      removeFromCart(productId, e);
      return;
    }
    
    const newCart = cart.map(item => {
      if (item.id === productId) {
        return {
          ...item,
          quantidade: newQuantity,
          total: newQuantity * item.price
        };
      }
      return item;
    });
    
    setCart(newCart);
    localStorage.setItem('shopping-cart', JSON.stringify(newCart));
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Notificação de Carrinho */}
      {showCartNotification && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
          <div className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-xl flex items-center gap-3">
            <ShoppingCart className="w-5 h-5" />
            <span>Produto adicionado ao carrinho!</span>
          </div>
        </div>
      )}

      {/* Indicador do Carrinho */}
      {cart.length > 0 && (
        <div className="fixed top-4 left-4 z-40">
          <div className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            <span className="font-medium">{calculateTotalItems()} itens</span>
            <span className="text-green-400 font-bold">{formatPrice(calculateCartTotal())}</span>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Produtos</h1>
            <p className="text-gray-400 text-sm">Clique para ver detalhes</p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Botão do Carrinho */}
            <button
              onClick={() => router.push('/carrinho')}
              className="relative flex items-center gap-2 text-gray-400 hover:text-white text-sm bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-lg transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Carrinho</span>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {calculateTotalItems()}
                </span>
              )}
            </button>
            
            <button
              onClick={onCloseProducts}
              className="text-gray-400 hover:text-white text-sm"
            >
              Fechar
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product, index) => {
            const slide = slides[index % slides.length];
            const cartItem = cart.find(item => item.id === product.id);
            const itemQuantity = cartItem ? cartItem.quantidade : 0;
            
            return (
              <div 
                key={product.id} 
                className="group cursor-pointer relative"
                onClick={() => handleCardClick(product)} 
              >
                {/* Indicador no card se já está no carrinho */}
                {itemQuantity > 0 && (
                  <div className="absolute top-2 right-2 z-10">
                    <div className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                      <ShoppingCart className="w-3 h-3" />
                      <span>{itemQuantity}</span>
                    </div>
                  </div>
                )}

                <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-green-500/40 transition-all duration-200 hover:scale-[1.02]">
                  
                  <div className="px-5 pt-5">
                    <div className="text-xs text-green-400 font-medium uppercase tracking-wide">
                      {product.category}
                    </div>
                  </div>

                  <div className="relative h-44 px-5">
                    <div className="relative h-full">
                      <Image
                        src={slide.image}
                        alt={product.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                    </div>
                  </div>

                  <div className="p-5 pt-3">
                    <h3 className="text-base font-bold text-white mb-2">
                      {product.name}
                    </h3>

                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(product.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-400">({product.reviews})</span>
                    </div>

                    <div className="text-gray-400 text-sm mb-4">
                      {product.size}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-white">
                        {formatPrice(product.price)}
                      </div>
                      
                      {/* Se já está no carrinho, mostra controles de quantidade */}
                      {cartItem ? (
                        <div 
                          className="flex items-center gap-2 bg-gray-800 rounded-lg px-2 py-1"
                          onClick={e => e.stopPropagation()}
                        >
                          <button
                            onClick={(e) => updateQuantity(product.id, cartItem.quantidade - 1, e)}
                            className="w-6 h-6 flex items-center justify-center bg-gray-700 rounded hover:bg-gray-600 transition-colors text-sm"
                            aria-label="Diminuir quantidade"
                          >
                            -
                          </button>
                          <span className="text-white font-medium min-w-6 text-center">
                            {cartItem.quantidade}
                          </span>
                          <button
                            onClick={(e) => updateQuantity(product.id, cartItem.quantidade + 1, e)}
                            className="w-6 h-6 flex items-center justify-center bg-gray-700 rounded hover:bg-gray-600 transition-colors text-sm"
                            aria-label="Aumentar quantidade"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={(e) => handleAddToCart(e, product)} 
                          className="flex items-center justify-center w-10 h-10 bg-green-500 rounded-lg hover:bg-green-400 transition-colors"
                          aria-label="Adicionar ao carrinho"
                        >
                          <ShoppingCart className="w-5 h-5 text-white" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Botão para ver carrinho completo */}
        {cart.length > 0 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => router.push('/carrinho')}
              className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 mx-auto"
            >
              <ShoppingCart className="w-5 h-5" />
              Ver Carrinho ({calculateTotalItems()} itens • {formatPrice(calculateCartTotal())})
            </button>
          </div>
        )}

        <div className="mt-10 text-center">
          <button
            onClick={onCloseProducts}
            className="text-gray-400 hover:text-white text-sm"
          >
            Voltar ao início
          </button>
        </div>
      </div>

      {/* Estilos de animação */}
      <style jsx global>{`
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProductsSection;