"use client";

import { useState, useEffect } from 'react';
import { X, Plus, Minus, Lock, ArrowLeft, Package, CheckCircle, AlertCircle, Trash2, ShoppingCart, Search, User, Menu, Heart } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function Carrinho() {
  // Estado para os itens do carrinho
  const [itens, setItens] = useState([
    {
      id: 1,
      nome: "Whey Protein 100% Pure - 2kg",
      marca: "ProteMax",
      sabor: "Chocolate",
      preco: 25000,
      quantidade: 1,
      imagem: "/images/whey-protein.jpg",
      estoque: 10,
      emPromocao: true,
      precoOriginal: 28000
    },
    {
      id: 2,
      nome: "Creatina Monohidratada - 300g",
      marca: "CreatineKing",
      sabor: "Neutro",
      preco: 15000,
      quantidade: 2,
      imagem: "/images/creatina.jpg",
      estoque: 15,
      emPromocao: false
    },
    {
      id: 3,
      nome: "BCAA 2:1:1 - 300g",
      marca: "AminoForce",
      sabor: "Limão",
      preco: 12000,
      quantidade: 1,
      imagem: "/images/bcaa.jpg",
      estoque: 5,
      emPromocao: true,
      precoOriginal: 14000
    }
  ]);

  // Estado para carregamento
  const [carregando, setCarregando] = useState(false);

  // Formatar preço
  const formatarPreco = (preco) => {
    return new Intl.NumberFormat('pt-AO', {
      style: 'currency',
      currency: 'AOA',
      minimumFractionDigits: 0
    }).format(preco);
  };

  // Atualizar quantidade
  const atualizarQuantidade = (id, novaQuantidade) => {
    if (novaQuantidade < 1) return;
    
    setItens(itens.map(item => 
      item.id === id 
        ? { ...item, quantidade: Math.min(novaQuantidade, item.estoque) }
        : item
    ));
  };

  // Remover item
  const removerItem = (id) => {
    setItens(itens.filter(item => item.id !== id));
  };

  // Calcular valores
  const calcularSubtotal = () => {
    return itens.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  };

  const calcularDescontoProdutos = () => {
    return itens.reduce((total, item) => {
      if (item.emPromocao && item.precoOriginal) {
        return total + ((item.precoOriginal - item.preco) * item.quantidade);
      }
      return total;
    }, 0);
  };

  const calcularFrete = () => {
    const subtotal = calcularSubtotal();
    return subtotal > 50000 ? 0 : 1500;
  };

  const calcularTotal = () => {
    return calcularSubtotal() - calcularDescontoProdutos() + calcularFrete();
  };

  // Finalizar compra
  const finalizarCompra = () => {
    setCarregando(true);
    // Simular processamento
    setTimeout(() => {
      alert('Compra finalizada com sucesso! Redirecionando para pagamento...');
      setCarregando(false);
    }, 1500);
  };

  // Voltar para loja
  const voltarParaLoja = () => {
    window.history.back();
  };

  // Efeito para salvar carrinho no localStorage
  useEffect(() => {
    localStorage.setItem('carrinho', JSON.stringify(itens));
  }, [itens]);

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 lg:px-26 py-4 border-b border-gray-800 sticky top-0 bg-black/95 backdrop-blur-sm z-50">
        {/* Logo e Menu Mobile */}
        <div className="flex gap-6 items-center">
          <button className="lg:hidden">
            <Menu size={24} />
          </button>
          <div className="flex gap-2 items-center">
            <span className="font-bold">LOGO</span>
            <Link href="#" className="hover:text-green-400 transition-colors duration-200 font-medium">
              HOME
            </Link>
          </div>
        </div>

        {/* Menu Desktop */}
        <div className="hidden lg:flex gap-8 items-center">
          <Link href="#" className="hover:text-green-400 transition-colors duration-200 font-medium">
            HOME
          </Link>
          <Link href="#" className="hover:text-green-400 transition-colors duration-200 font-medium">
            STORE
          </Link>
          <Link href="#" className="hover:text-green-400 transition-colors duration-200 font-medium">
            NEWS
          </Link>
          <Link href="#" className="hover:text-green-400 transition-colors duration-200 font-medium">
            DELIVERY
          </Link>
        </div>

        {/* Search e Ícones */}
        <div className="flex gap-4 items-center">
          {/* Search Desktop */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search Product..."
              className="bg-gray-900 border border-gray-700 rounded-full pl-10 pr-4 py-2 text-sm w-64 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all duration-200"
            />
          </div>

          {/* Ícones */}
          <div className="flex gap-3 items-center">
            <Link href="/carrinho" className="relative p-2 hover:bg-gray-800 rounded-full transition-colors duration-200 group">
              <ShoppingCart size={20} className="group-hover:text-green-400" />
              <span className="absolute -top-1 -right-1 bg-green-500 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {itens.length}
              </span>
            </Link>
            
            <button className="p-2 hover:bg-gray-800 rounded-full transition-colors duration-200 group">
              <User size={20} className="group-hover:text-green-400" />
            </button>
          </div>
        </div>
      </nav>

      {/* Search Mobile */}
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cabeçalho do Carrinho */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <button 
              onClick={voltarParaLoja}
              className="flex items-center text-gray-400 hover:text-green-400 mr-4 transition-colors duration-200"
            >
              <ArrowLeft size={20} className="mr-2" />
              Continuar Comprando
            </button>
            <h1 className="text-2xl lg:text-3xl font-bold">Carrinho de Compras</h1>
          </div>
          <div className="flex items-center">
            <div className="bg-green-500 text-black px-3 py-1 rounded-full text-sm font-medium">
              {itens.length} {itens.length === 1 ? 'item' : 'itens'}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Coluna Principal - Itens do Carrinho */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
              
              {/* Cabeçalho */}
              <div className="px-6 py-5 border-b border-gray-800 bg-gray-900">
                <div>
                  <h2 className="text-xl font-bold mb-1">Seus Produtos</h2>
                  <p className="text-gray-400 text-sm">
                    Gerencie os itens do seu carrinho
                  </p>
                </div>
              </div>

              {/* Lista de Itens */}
              <div className="divide-y divide-gray-800">
                {itens.length === 0 ? (
                  // Carrinho Vazio
                  <div className="p-12 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-800 rounded-full mb-6">
                      <Package size={32} className="text-gray-400" />
                    </div>
                    <h3 className="text-xl font-medium mb-3">Seu carrinho está vazio</h3>
                    <p className="text-gray-400 mb-8 max-w-md mx-auto">
                      Adicione produtos incríveis ao seu carrinho e aproveite ofertas exclusivas!
                    </p>
                    <button 
                      onClick={voltarParaLoja}
                      className="bg-green-500 hover:bg-green-600 text-black px-8 py-3 rounded-full font-medium transition-all duration-200"
                    >
                      Explorar Produtos
                    </button>
                  </div>
                ) : (
                  // Itens do Carrinho
                  itens.map((item) => (
                    <div key={item.id} className="p-6 hover:bg-gray-800/50 transition-colors duration-200">
                      <div className="flex gap-5">
                        
                        {/* Imagem do Produto */}
                        <div className="flex-shrink-0 relative">
                          <div className="w-28 h-28 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
                            <div className="text-center">
                              <Package size={32} className="text-gray-500 mx-auto" />
                              <span className="text-gray-500 text-xs mt-1 block">Produto</span>
                            </div>
                          </div>
                        </div>

                        {/* Informações do Produto */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <div className="pr-4">
                              <h3 className="text-lg font-semibold mb-1">{item.nome}</h3>
                              <div className="flex items-center gap-3 mb-2">
                                <span className="text-gray-400 text-sm">{item.marca}</span>
                                <span className="text-gray-600">•</span>
                                <span className="text-gray-400 text-sm">{item.sabor}</span>
                              </div>
                              
                              {/* Preço */}
                              <div className="flex items-center gap-3 mt-3">
                                <span className="text-xl font-bold">
                                  {formatarPreco(item.preco * item.quantidade)}
                                </span>
                                {item.emPromocao && item.precoOriginal && (
                                  <>
                                    <span className="text-gray-500 text-sm line-through">
                                      {formatarPreco(item.precoOriginal * item.quantidade)}
                                    </span>
                                    <span className="text-sm font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded">
                                      Economizou {formatarPreco((item.precoOriginal - item.preco) * item.quantidade)}
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>

                            {/* Botão Remover */}
                            <button
                              onClick={() => removerItem(item.id)}
                              className="text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors p-2 rounded-lg"
                              title="Eliminar produto"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>

                          <div className="flex items-center justify-between mt-6">
                            
                            {/* Seletor de Quantidade */}
                            <div className="flex items-center gap-4">
                              <div className="flex items-center border border-gray-700 rounded-lg overflow-hidden bg-gray-800">
                                <button
                                  onClick={() => atualizarQuantidade(item.id, item.quantidade - 1)}
                                  className="p-2 hover:bg-gray-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                                  disabled={item.quantidade <= 1}
                                >
                                  <Minus size={18} />
                                </button>
                                <span className="px-6 py-2 font-medium bg-gray-800 min-w-[60px] text-center">
                                  {item.quantidade}
                                </span>
                                <button
                                  onClick={() => atualizarQuantidade(item.id, item.quantidade + 1)}
                                  className="p-2 hover:bg-gray-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                                  disabled={item.quantidade >= item.estoque}
                                >
                                  <Plus size={18} />
                                </button>
                              </div>
                            </div>

                            {/* Preço Unitário e Estoque */}
                            <div className="text-right">
                              <p className="text-gray-400 text-sm">
                                {formatarPreco(item.preco)} cada
                              </p>
                              {/* Estoque */}
                              <div className="mt-2">
                                {item.estoque <= 5 ? (
                                  <div className="flex items-center text-amber-400 text-sm">
                                    <AlertCircle size={14} className="mr-1" />
                                    Apenas {item.estoque} em estoque
                                  </div>
                                ) : (
                                  <div className="flex items-center text-green-400 text-sm">
                                    <CheckCircle size={14} className="mr-1" />
                                    Em estoque
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Resumo do Pedido */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              
              {/* Resumo do Pedido */}
              <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-800">
                  <h2 className="text-xl font-bold">Resumo do Pedido</h2>
                  <p className="text-gray-400 text-sm mt-1">Confirme os valores antes de finalizar</p>
                </div>

                <div className="p-6">
                  {/* Detalhes do Preço */}
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Subtotal ({itens.length} {itens.length === 1 ? 'item' : 'itens'})</span>
                      <span className="font-medium">{formatarPreco(calcularSubtotal())}</span>
                    </div>
                    
                    {calcularDescontoProdutos() > 0 && (
                      <div className="flex justify-between text-green-400">
                        <span>Desconto em produtos</span>
                        <span className="font-medium">-{formatarPreco(calcularDescontoProdutos())}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <span className="text-gray-400">Entrega</span>
                      <span className="font-medium">
                        {calcularFrete() === 0 ? (
                          <span className="text-green-400">Grátis</span>
                        ) : (
                          formatarPreco(calcularFrete())
                        )}
                      </span>
                    </div>

                    {/* Total */}
                    <div className="border-t border-gray-800 pt-4 mt-2">
                      <div className="flex justify-between text-xl font-bold">
                        <span>Total</span>
                        <span>{formatarPreco(calcularTotal())}</span>
                      </div>
                    </div>
                  </div>

                  {/* Botão Finalizar Compra */}
                  <button
                    onClick={finalizarCompra}
                    disabled={itens.length === 0 || carregando}
                    className="w-full bg-green-500 hover:bg-green-600 text-black py-4 rounded-full font-semibold text-lg mt-6 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {carregando ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-3"></div>
                        Processando...
                      </>
                    ) : (
                      <>
                        <Lock size={20} className="mr-3" />
                        Finalizar Compra
                      </>
                    )}
                  </button>

                  {/* Métodos de Pagamento */}
                  <div className="text-center pt-6 border-t border-gray-800 mt-6">
                    <p className="text-gray-400 text-sm mb-3">Pagamentos aceitos:</p>
                    <div className="flex justify-center gap-2 flex-wrap">
                      <div className="bg-gray-800 border border-gray-700 px-3 py-1.5 rounded text-sm">VISA</div>
                      <div className="bg-gray-800 border border-gray-700 px-3 py-1.5 rounded text-sm">MASTERCARD</div>
                      <div className="bg-gray-800 border border-gray-700 px-3 py-1.5 rounded text-sm">TRANSFERÊNCIA</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Informações Rápidas */}
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mt-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-400/10 p-2 rounded-lg">
                      <CheckCircle size={18} className="text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Entrega Rápida</h4>
                      <p className="text-gray-400 text-sm">Envio em 24h para Luanda</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-green-400/10 p-2 rounded-lg">
                      <CheckCircle size={18} className="text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Compra Segura</h4>
                      <p className="text-gray-400 text-sm">Pagamento 100% protegido</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-green-400/10 p-2 rounded-lg">
                      <CheckCircle size={18} className="text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Suporte</h4>
                      <p className="text-gray-400 text-sm">Ajuda disponível 24/7</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}