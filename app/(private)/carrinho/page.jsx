"use client";

import { useState, useEffect } from "react";
import { Package } from "lucide-react";

import Navbar from "@/components/Navbar";
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
      precoOriginal: 28000,
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
      emPromocao: false,
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
      precoOriginal: 14000,
    },
  ]);

  const [carregando, setCarregando] = useState(false);

  const formatarPreco = (preco) =>
    new Intl.NumberFormat("pt-AO", {
      style: "currency",
      currency: "AOA",
      minimumFractionDigits: 0,
    }).format(preco);

  const atualizarQuantidade = (id, novaQuantidade) => {
    if (novaQuantidade < 1) return;

    setItens((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantidade: Math.min(novaQuantidade, item.estoque) }
          : item
      )
    );
  };

  const removerItem = (id) => {
    setItens((prev) => prev.filter((item) => item.id !== id));
  };

  const calcularSubtotal = () =>
    itens.reduce((total, item) => total + item.preco * item.quantidade, 0);

  const calcularDescontoProdutos = () =>
    itens.reduce((total, item) => {
      if (item.emPromocao && item.precoOriginal) {
        return total + (item.precoOriginal - item.preco) * item.quantidade;
      }
      return total;
    }, 0);

  const calcularFrete = () =>
    calcularSubtotal() > 50000 ? 0 : 1500;

  const calcularTotal = () =>
    calcularSubtotal() - calcularDescontoProdutos() + calcularFrete();

  const finalizarCompra = () => {
    setCarregando(true);

    setTimeout(() => {
      alert("Compra finalizada com sucesso!");
      setCarregando(false);
    }, 1500);
  };

  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(itens));
  }, [itens]);

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Navbar global */}
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-6 lg:py-8">
        <CartHeader itensCount={itens.length} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2">
            <CartItemsList
              itens={itens}
              formatarPreco={formatarPreco}
              atualizarQuantidade={atualizarQuantidade}
              removerItem={removerItem}
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

function CartHeader({ itensCount }) {
  return (
    <div className="flex justify-between items-center mb-6">
      

      
    </div>
  );
}


function CartItemsList({
  itens,
  formatarPreco,
  atualizarQuantidade,
  removerItem,
}) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-800">
        <h2 className="text-xl font-bold">Seus Produtos</h2>
        <p className="text-gray-400 text-sm">
          Gerencie os itens do seu carrinho
        </p>
      </div>

      <div className="divide-y divide-gray-800">
        {itens.length === 0 ? (
          <EmptyCart />
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

/* =========================
   Carrinho Vazio
========================= */
function EmptyCart() {
  return (
    <div className="p-10 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-800">
        <Package className="text-gray-400" size={28} />
      </div>

      <h3 className="text-lg font-semibold mb-2">
        Seu carrinho está vazio
      </h3>

      <p className="text-gray-400 text-sm">
        Adicione produtos para continuar.
      </p>
    </div>
  );
}
