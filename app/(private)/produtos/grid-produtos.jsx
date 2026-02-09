"use client";

import { useState, useEffect, useCallback } from "react";

export default function ProductGrid({ 
  filteredSupplements = [], 
  sortBy, 
  setSortBy 
}) {
  const safeSupplements = Array.isArray(filteredSupplements) ? filteredSupplements : [];
  const totalProducts = safeSupplements.length;

  // Estado do carrinho
  const [cart, setCart] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Carregar carrinho do localStorage quando o componente monta - CORRIGIDO
  useEffect(() => {
    if (isInitialized) return;

    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem('shopping-cart');
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          
          // Usar requestAnimationFrame para evitar setState síncrono
          requestAnimationFrame(() => {
            setCart(parsedCart);
            setIsInitialized(true);
          });
        } else {
          setIsInitialized(true);
        }
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
        setIsInitialized(true);
      }
    };

    loadCart();
  }, [isInitialized]);

  // Alternativa mais simples usando setTimeout
  useEffect(() => {
    const savedCart = localStorage.getItem('shopping-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        
        // Usar setTimeout para adiar a atualização do estado
        const timer = setTimeout(() => {
          setCart(parsedCart);
        }, 0);
        
        return () => clearTimeout(timer);
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
      }
    }
  }, []);

  // Salvar carrinho no localStorage sempre que mudar
  useEffect(() => {
    if (cart.length > 0 || isInitialized) {
      localStorage.setItem('shopping-cart', JSON.stringify(cart));
    }
  }, [cart, isInitialized]);

  // Verificar se um produto está no carrinho
  const isInCart = (productId) => {
    return cart.some(item => item.id === productId);
  };

  // Obter quantidade de um produto no carrinho
  const getCartQuantity = (productId) => {
    const item = cart.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  // Adicionar ao carrinho
  const addToCart = (product) => {
    if (!product?.inStock) return;

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        // Incrementa quantidade se já existe
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Adiciona novo item
        return [...prevCart, {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
          category: product.category
        }];
      }
    });
  };

  // Remover do carrinho
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // Atualizar quantidade
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Formatação para preço em Kz
  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-AO', {
      style: 'currency',
      currency: 'AOA',
      minimumFractionDigits: 0,
    }).format(price / 100);
  };

  // Calcular total do carrinho
  const calculateCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Contador de itens no carrinho
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="lg:w-3/4">
      {/* Header com contador do carrinho */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 p-4 bg-gray-900 rounded-xl">
        <div className="flex items-center mb-4 sm:mb-0 gap-4">
          <h1 className="text-2xl font-bold text-white">
            Produtos <span className="text-green-400">({totalProducts})</span>
          </h1>
          
          {/* Badge do carrinho */}
          <div className="relative">
            <button 
              onClick={() => console.log('Abrir carrinho:', cart)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-white text-sm">Carrinho</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-gray-300 text-sm hidden sm:block">Ordenar:</span>
          <select
            value={sortBy || "name"}
            onChange={(e) => setSortBy && setSortBy(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-green-500"
          >
            <option value="name">Nome A-Z</option>
            <option value="price-low">Menor Preço</option>
            <option value="price-high">Maior Preço</option>
            <option value="rating">Melhor Avaliado</option>
          </select>
        </div>
      </div>

      {/* Grid de produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {safeSupplements.map((supplement, index) => {
          const inCart = isInCart(supplement?.id);
          const cartQuantity = getCartQuantity(supplement?.id);

          return (
            <div 
              key={supplement?.id ?? `product-${index}`}
              className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden hover:border-green-500/50 transition-colors duration-300"
            >
              {/* Imagem do produto */}
              <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 relative">
                {/* Badges simples */}
                {supplement?.isBestSeller && (
                  <div className="absolute top-3 left-3">
                    <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded">
                      Mais Vendido
                    </span>
                  </div>
                )}
                {!supplement?.inStock && (
                  <div className="absolute top-3 right-3">
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      Esgotado
                    </span>
                  </div>
                )}
                {inCart && (
                  <div className="absolute bottom-3 right-3">
                    <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Item adicionado ao carrinho
                    </span>
                  </div>
                )}
              </div>
              
              {/* Conteúdo do card */}
              <div className="p-5">
                {/* Avaliação */}
                <div className="flex items-center mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(supplement?.rating || 0) ? 'text-yellow-400' : 'text-gray-700'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-400 text-sm ml-2">
                    ({supplement?.reviewCount || 0})
                  </span>
                </div>
                
                {/* Nome do produto */}
                <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2">
                  {supplement?.name || "Produto"}
                </h3>
                
                {/* Preço e Controles do Carrinho */}
                <div className="flex items-center justify-between">
                  {/* Preço */}
                  <div>
                    <div className="text-xl font-bold text-white">
                      {formatPrice(supplement?.price || 0)}
                    </div>
                    {supplement?.originalPrice && supplement?.originalPrice > supplement?.price && (
                      <div className="text-sm text-gray-500 line-through">
                        {formatPrice(supplement.originalPrice)}
                      </div>
                    )}
                  </div>
                  
                  {/* Controles do carrinho */}
                  <div className="flex items-center gap-2">
                    {inCart ? (
                      // Já está no carrinho - mostrar controles de quantidade
                      <div className="flex items-center bg-gray-800 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(supplement.id, cartQuantity - 1)}
                          className="px-3 py-1 hover:bg-gray-700 text-white"
                          disabled={!supplement?.inStock}
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-white min-w-8 text-center">
                          {cartQuantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(supplement.id, cartQuantity + 1)}
                          className="px-3 py-1 hover:bg-gray-700 text-white"
                          disabled={!supplement?.inStock}
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      // Não está no carrinho - mostrar botão de adicionar
                      <button 
                        onClick={() => addToCart(supplement)}
                        className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${
                          !supplement?.inStock 
                            ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                            : 'bg-green-600 hover:bg-green-700 text-white'
                        }`}
                        disabled={!supplement?.inStock}
                        title={!supplement?.inStock ? "Produto esgotado" : "Adicionar ao carrinho"}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </button>
                    )}
                    
                    {/* Botão para remover se já está no carrinho */}
                    {inCart && (
                      <button
                        onClick={() => removeFromCart(supplement.id)}
                        className="flex items-center justify-center w-8 h-8 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                        title="Remover do carrinho"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Estado vazio */}
      {totalProducts === 0 && (
        <div className="text-center py-16">
          <div className="bg-gray-900 rounded-xl p-8 max-w-md mx-auto">
            <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-bold text-white mb-2">
              Nenhum produto encontrado
            </h3>
            <p className="text-gray-400 mb-6">
              Tente ajustar os filtros de busca.
            </p>
          </div>
        </div>
      )}

      {/* Resumo do carrinho (opcional) */}
      {cart.length > 0 && (
        <div className="mt-8 p-6 bg-gray-900 rounded-xl border border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-lg font-bold text-white">
                Resumo do Carrinho
              </h3>
              <p className="text-gray-400 text-sm">
                {cartItemCount} ite{cartItemCount !== 1 ? 'ns' : 'm'} • Total: {formatPrice(calculateCartTotal())}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => console.log('Ver carrinho')}
                className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Ver Carrinho
              </button>
              <button
                onClick={() => console.log('Finalizar compra')}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                Finalizar Compra
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}