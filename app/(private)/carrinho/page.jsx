"use client";

import { useState, useEffect } from 'react';
import { ArrowLeft, Package, ShoppingCart, Search, User, Menu } from 'lucide-react';
import Link from 'next/link';
import Footer from "@/components/Footer";
import CartItem from "./lista-itens";
import OrderSummary from "./pagamentos";

export default function CartPage() {
  
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

  const [carregando, setCarregando] = useState(false);

  const formatarPreco = (preco) => {
    return new Intl.NumberFormat('pt-AO', {
      style: 'currency',
      currency: 'AOA',
      minimumFractionDigits: 0
    }).format(preco);
  };

  
  const atualizarQuantidade = (id, novaQuantidade) => {
    if (novaQuantidade < 1) return;
    
    setItens(itens.map(item => 
      item.id === id 
        ? { ...item, quantidade: Math.min(novaQuantidade, item.estoque) }
        : item
    ));
  };

  
  const removerItem = (id) => {
    setItens(itens.filter(item => item.id !== id));
  };

  
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

 
  const finalizarCompra = () => {
    setCarregando(true);
    
    setTimeout(() => {
      alert('Compra finalizada com sucesso! Redirecionando para pagamento...');
      setCarregando(false);
    }, 1500);
  };

  
  const voltarParaLoja = () => {
    window.history.back();
  };

  
  useEffect(() => {
    localStorage.setItem('carrinho', JSON.stringify(itens));
  }, [itens]);

  return (
    <div className="bg-black text-white min-h-screen">
      
      <Navbar itensCount={itens.length} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <CartHeader 
          itensCount={itens.length}
          voltarParaLoja={voltarParaLoja}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          
          <div className="lg:col-span-2">
            <CartItemsList 
              itens={itens}
              formatarPreco={formatarPreco}
              atualizarQuantidade={atualizarQuantidade}
              removerItem={removerItem}
              voltarParaLoja={voltarParaLoja}
            />
          </div>

        
          <div className="lg:col-span-1">
            <OrderSummary 
              itens={itens}
              formatarPreco={formatarPreco}
              calcularSubtotal={calcularSubtotal}
              calcularDescontoProdutos={calcularDescontoProdutos}
              calcularFrete={calcularFrete}
              calcularTotal={calcularTotal}
              finalizarCompra={finalizarCompra}
              carregando={carregando}
            />
          </div>
        </div>
      </main>

      
      <Footer />
    </div>
  );
}


function Navbar({ itensCount }) {
  return (
    <>
      <nav className="flex justify-between items-center px-6 lg:px-26 py-4 border-b border-gray-800 sticky top-0 bg-black/95 backdrop-blur-sm z-50">
        
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
            <Link href="/carrinho" className="relative p-2 hover:bg-gray-800 rounded-full transition-colors duration-200 group">
              <ShoppingCart size={20} className="group-hover:text-green-400" />
              <span className="absolute -top-1 -right-1 bg-green-500 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {itensCount}
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
    </>
  );
}


function CartHeader({ itensCount, voltarParaLoja }) {
  return (
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
          {itensCount} {itensCount === 1 ? 'item' : 'itens'}
        </div>
      </div>
    </div>
  );
}

// Componente Lista de Itens do Carrinho
function CartItemsList({ itens, formatarPreco, atualizarQuantidade, removerItem, voltarParaLoja }) {
  return (
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
          <EmptyCart voltarParaLoja={voltarParaLoja} />
        ) : (
          itens.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              formatarPreco={formatarPreco}
              atualizarQuantidade={atualizarQuantidade}
              removerItem={removerItem}
            />
          ))
        )}
      </div>
    </div>
  );
}

// Componente Carrinho Vazio
function EmptyCart({ voltarParaLoja }) {
  return (
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
  );
}