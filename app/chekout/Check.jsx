// app/checkout/CheckoutPage.jsx
'use client'
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CreditCard, Truck, Shield, CheckCircle, ShoppingCart, X, Plus, Minus, Lock, Gift, MapPin } from "lucide-react";

export default function CheckoutPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  
  // Dados do carrinho (simulado)
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Creatine XPLODE Power",
      description: "500g - Sabor Morango",
      price: 29990,
      quantity: 1,
      image: "/imagem2.png"
    },
    {
      id: 2,
      name: "Whey Protein Isolate",
      description: "2kg - Sabor Baunilha",
      price: 59990,
      quantity: 2,
      image: "/imagem2.png"
    },
    {
      id: 3,
      name: "Pré-Treino Explosive",
      description: "300g - Sabor Frutas Tropicais",
      price: 24990,
      quantity: 1,
      image: "/imagem2.png"
    }
  ]);

  // Dados do formulário
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
    saveInfo: false
  });

  // Métodos de entrega
  const deliveryMethods = [
    { id: "standard", name: "Entrega Padrão", price: 1500, time: "3-5 dias úteis", icon: "🚚" },
    { id: "express", name: "Entrega Expressa", price: 3500, time: "1-2 dias úteis", icon: "🚀" },
    { id: "pickup", name: "Retirar na Loja", price: 0, time: "Pronto para retirada", icon: "📍" }
  ];

  // Métodos de pagamento
  const paymentMethods = [
    { id: "credit-card", name: "Cartão de Crédito", icon: "💳" },
    { id: "mbway", name: "MBWay", icon: "📱" },
    { id: "multibanco", name: "Multibanco", icon: "🏦" },
    { id: "paypal", name: "PayPal", icon: "💰" }
  ];

  // Formatador de moeda
  const formatKz = (value) => {
    return value.toLocaleString('pt-AO', {
      style: 'currency',
      currency: 'AOA',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).replace('AOA', 'Kz');
  };

  // Calcular totais
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryCost = deliveryMethods.find(d => d.id === deliveryMethod)?.price || 0;
  const discount = 0;
  const total = subtotal + deliveryCost - discount;

  // Manipular mudanças no formulário
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Atualizar quantidade
  const updateQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  // Remover item
  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Finalizar compra
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simular processamento
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setOrderPlaced(true);
    
    // Scroll para o topo
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Limpar carrinho após compra
  useEffect(() => {
    if (orderPlaced) {
      console.log("Pedido realizado com sucesso!");
    }
  }, [orderPlaced]);

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-black text-white py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Header */}
          <header className="mb-8">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors mb-8"
            >
              <ArrowLeft size={20} />
              <span>Voltar à loja</span>
            </Link>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Checkout</h1>
          </header>

          {/* Confirmação de pedido */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-900 border border-green-500/30 rounded-2xl p-6 sm:p-8 text-center animate-fadeIn">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-green-400" />
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">Pedido Confirmado!</h2>
              <p className="text-gray-300 mb-6">
                Obrigado por sua compra. Seu pedido foi processado com sucesso e você receberá um e-mail de confirmação em breve.
              </p>
              
              <div className="bg-gray-800 rounded-xl p-4 sm:p-6 mb-6">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="font-semibold">Código de Rastreio: #ORD{Date.now().toString().slice(-6)}</p>
                    <p className="text-sm text-gray-400">Entrega estimada: 3-5 dias úteis</p>
                  </div>
                </div>
                
                <div className="border-t border-gray-700 pt-4 mt-4">
                  <p className="text-gray-300">
                    Enviamos os detalhes do pedido para: <span className="font-semibold text-white">{formData.email || "seu@email.com"}</span>
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link 
                  href="/produtos"
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-black font-semibold rounded-full transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Continuar Comprando
                </Link>
                
                <Link 
                  href="/perfil/pedidos"
                  className="px-6 py-3 border border-gray-600 hover:border-green-400 hover:bg-green-400 hover:text-black font-semibold rounded-full transition-all duration-300"
                >
                  Ver Meus Pedidos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-6 sm:py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link 
              href="/carrinho" 
              className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="hidden sm:inline">Voltar ao carrinho</span>
              <span className="sm:hidden">Voltar</span>
            </Link>
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-800 flex items-center justify-center">
                <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
              </div>
              <span className="text-sm sm:text-base font-semibold">Checkout Seguro</span>
            </div>
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Finalizar Compra</h1>
          <p className="text-gray-400">Complete seu pedido em poucos passos</p>
        </header>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Coluna esquerda - Formulário */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              {/* Informações de contato */}
              <section className="bg-gray-900 border border-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-800 flex items-center justify-center">
                    <span className="text-lg">📧</span>
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold">Informações de Contato</h2>
                    <p className="text-sm text-gray-400">Como podemos entrar em contato?</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">E-mail *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-sm sm:text-base focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
                      placeholder="seu@email.com"
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="saveInfo"
                      name="saveInfo"
                      checked={formData.saveInfo}
                      onChange={handleInputChange}
                      className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-green-500 focus:ring-green-500"
                    />
                    <label htmlFor="saveInfo" className="ml-2 text-sm text-gray-300">
                      Salvar informações para próximas compras
                    </label>
                  </div>
                </div>
              </section>

              {/* Endereço de entrega */}
              <section className="bg-gray-900 border border-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-800 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold">Endereço de Entrega</h2>
                    <p className="text-sm text-gray-400">Para onde devemos enviar seu pedido?</p>
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Primeiro Nome *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-sm sm:text-base focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
                      placeholder="João"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Último Nome *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-sm sm:text-base focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
                      placeholder="Silva"
                    />
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium mb-2">Endereço *</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-sm sm:text-base focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
                      placeholder="Rua Exemplo, 123"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Cidade *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-sm sm:text-base focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
                      placeholder="Luanda"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Código Postal *</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-sm sm:text-base focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
                      placeholder="1234-567"
                    />
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium mb-2">Telefone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-sm sm:text-base focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
                      placeholder="+244 900 000 000"
                    />
                  </div>
                </div>
              </section>

              {/* Método de entrega */}
              <section className="bg-gray-900 border border-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-800 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold">Método de Entrega</h2>
                    <p className="text-sm text-gray-400">Escolha como receber seu pedido</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {deliveryMethods.map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                        deliveryMethod === method.id
                          ? 'border-green-500 bg-green-500/10'
                          : 'border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="deliveryMethod"
                          value={method.id}
                          checked={deliveryMethod === method.id}
                          onChange={() => setDeliveryMethod(method.id)}
                          className="w-4 h-4 text-green-500"
                        />
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{method.icon}</span>
                          <div>
                            <div className="font-medium">{method.name}</div>
                            <div className="text-sm text-gray-400">{method.time}</div>
                          </div>
                        </div>
                      </div>
                      <div className="font-semibold">
                        {method.price > 0 ? formatKz(method.price) : 'Grátis'}
                      </div>
                    </label>
                  ))}
                </div>
              </section>

              {/* Método de pagamento */}
              <section className="bg-gray-900 border border-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-800 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold">Método de Pagamento</h2>
                    <p className="text-sm text-gray-400">Escolha como deseja pagar</p>
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                  {paymentMethods.map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                        paymentMethod === method.id
                          ? 'border-green-500 bg-green-500/10'
                          : 'border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={() => setPaymentMethod(method.id)}
                        className="w-4 h-4 text-green-500"
                      />
                      <span className="text-xl">{method.icon}</span>
                      <span className="font-medium">{method.name}</span>
                    </label>
                  ))}
                </div>
                
                {/* Formulário do cartão (se selecionado) */}
                {paymentMethod === "credit-card" && (
                  <div className="border-t border-gray-800 pt-6 space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Número do Cartão *</label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-sm sm:text-base focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Nome no Cartão *</label>
                        <input
                          type="text"
                          placeholder="JOÃO SILVA"
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-sm sm:text-base focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Validade *</label>
                        <input
                          type="text"
                          placeholder="MM/AA"
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-sm sm:text-base focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">CVV *</label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-sm sm:text-base focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Garantias de segurança */}
                <div className="border-t border-gray-800 pt-6 mt-6">
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-400" />
                      <span>Pagamento 100% seguro</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-green-400" />
                      <span>Dados criptografados</span>
                    </div>
                  </div>
                </div>
              </section>
            </form>
          </div>

          {/* Coluna direita - Resumo do pedido */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <div className="bg-gray-900 border border-gray-800 rounded-xl sm:rounded-2xl overflow-hidden">
                {/* Cabeçalho do resumo */}
                <div className="p-4 sm:p-6 border-b border-gray-800">
                  <h2 className="text-lg sm:text-xl font-bold mb-4">Resumo do Pedido</h2>
                  
                  {/* Lista de produtos */}
                  <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-800">
                          <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                            <span className="text-gray-400">IMG</span>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs"
                            aria-label="Remover item"
                          >
                            <X size={12} />
                          </button>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm truncate">{item.name}</h3>
                          <p className="text-xs text-gray-400 truncate">{item.description}</p>
                          <div className="flex items-center justify-between mt-1">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
                                aria-label="Diminuir quantidade"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
                                aria-label="Aumentar quantidade"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                            <span className="font-semibold text-sm sm:text-base">
                              {formatKz(item.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Cupom de desconto */}
                <div className="p-4 sm:p-6 border-b border-gray-800">
                  <div className="flex items-center gap-2 mb-3">
                    <Gift className="w-5 h-5 text-green-400" />
                    <span className="font-medium">Cupom de Desconto</span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Código do cupom"
                      className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
                    />
                    <button className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors">
                      Aplicar
                    </button>
                  </div>
                </div>
                
                {/* Totais */}
                <div className="p-4 sm:p-6">
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Subtotal</span>
                      <span>{formatKz(subtotal)}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Entrega</span>
                      <span>
                        {deliveryCost > 0 ? formatKz(deliveryCost) : 'Grátis'}
                      </span>
                    </div>
                    
                    {discount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Desconto</span>
                        <span className="text-green-400">-{formatKz(discount)}</span>
                      </div>
                    )}
                    
                    <div className="border-t border-gray-800 pt-3 mt-3">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-green-400">{formatKz(total)}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Inclui impostos aplicáveis</p>
                    </div>
                  </div>
                  
                  {/* Botão de finalizar */}
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading || cartItems.length === 0}
                    className="w-full py-3 sm:py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-700 disabled:to-gray-800 disabled:cursor-not-allowed text-black font-bold rounded-lg sm:rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                        <span>Processando...</span>
                      </>
                    ) : (
                      <>
                        <Lock size={20} />
                        <span>Finalizar Compra - {formatKz(total)}</span>
                      </>
                    )}
                  </button>
                  
                  {/* Garantias */}
                  <div className="mt-4 space-y-2 text-xs text-gray-400">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-400" />
                      <span>Compra 100% segura com criptografia SSL</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>Garantia de 30 dias para devolução</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Links de ajuda */}
              <div className="mt-4 text-center text-sm text-gray-400">
                <p>Precisa de ajuda? <Link href="/contato" className="text-green-400 hover:text-green-300">Fale conosco</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animações CSS */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        /* Custom scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #1f2937;
          border-radius: 2px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #10b981;
          border-radius: 2px;
        }
        
        /* Ajustes para mobile */
        @media (max-width: 640px) {
          input, select, textarea {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
}